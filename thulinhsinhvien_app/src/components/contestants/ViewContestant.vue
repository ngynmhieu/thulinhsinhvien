<script>
import { useConstantStore } from "@/store";
import { getRemainingTime, updateIsProcessing, updateRemainingTime, updateIndexProcess } from "@/utils/process";
import { getScoreOfSinhVien } from "@/utils/examinee";

export default {
  name: "ViewContestant",
  props: {
    contestant: Object,
  },
  data() {
    return {
      numberOfVoters: 0,
      icons: Array.from({ length: 60 }, (_, i) => i),
      countdownActive: false,
      timer: null,
      remainingTime: 0,
      contestantScore: 0,
      currentContestant: useConstantStore().currentContestant,
      contestantsOrder: useConstantStore().contestantsOrder,
    }
  },
  mounted() {
    this.getScored();
    this.getRmTime();
    this.timer = setInterval(() => {
      this.getScored();
    }, 2000);
    window.addEventListener("keydown", this.handleKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
    clearInterval(this.timer);
  },
  methods: {
    apiName (index = 0) {
      return useConstantStore().contestantsOrder[this.currentContestant + index].name;
    },
    apiPath (index = 0) {
      return useConstantStore().contestantsOrder[this.currentContestant + index].path;
    },
    handleKeyPress(event) {
      if (event.key === "ArrowRight") {
        this.moveNext();
      } else if (event.key === "ArrowLeft") {
        this.movePrevious();
      } else if (event.key === "Enter") {
        this.toggleCountdown();
      }
    },
    async movePrevious() {
      if (this.currentContestant > 0) {
        await updateIndexProcess(this.apiName(-1));
        useConstantStore().setCurrentContestant(this.currentContestant - 1);
        this.$router.push(this.apiPath(-1));
      }
    },
    async moveNext() {
      if (this.currentContestant === this.contestantsOrder.length - 1) {
        await updateIndexProcess('hoidong')
        this.$router.push('/hoi-dong');
      } else {
        await updateIndexProcess(this.apiName(1));
        useConstantStore().setCurrentContestant(this.currentContestant + 1);
        this.$router.push(this.apiPath(1));
      }
    },
    toggleCountdown() {
      if (!this.countdownActive) {
        this.countdownActive = true;
        updateIsProcessing(true);
        this.startCountdown();
      } else {
        this.countdownActive = false;
        updateIsProcessing(false);
        clearInterval(this.timer);
      }
    },
    async getScored() {
      try {
        const response = await getScoreOfSinhVien(this.apiName());
        this.numberOfVoters = response.vote;
        this.contestantScore = this.numberOfVoters * 0.5;
      } catch (error) {
        console.log(error);
      }
    },
    async getRmTime() {
      try {
        const response = await getRemainingTime(this.apiName());
        if (response) {
            this.remainingTime = response;
        }
      } catch (error) {
        console.log(error);
      }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            updateRemainingTime(this.apiName(), this.remainingTime);
        } else {
            updateIsProcessing(false);
            clearInterval(this.timer);
        }
      }, 1000);
    },
  },
};
</script>

<template>
    <div class="thi-sinh">
      <div class="counter">{{ remainingTime }}</div>
      <div class="body">
        <div class="voters">
          <div class="title">
            <img
              src="../../assets/hoidonggiamkhao.png"
              alt="Hoi Dong Giam Khao"
            />
          </div>
          <div class="voters-status">
            <div
              v-for="icon in icons"
              :key="icon"
              :id="'icon-' + (icon + 1)"
              class="voter-icon"
            >
              <img
                v-if="icon < numberOfVoters"
                src="../../assets/voted_icon.png"
                alt="Icon"
              />
              <img v-else src="../../assets/notvoted_icon.png" alt="Icon" />
            </div>
          </div>
        </div>
        <div class="contestant">
          <div class="name">
            {{ contestant.name }}
          </div>
          <div class="score">
            {{ this.contestantScore }}
          </div>
        </div>
      </div>
    </div>
  </template>