<script>
import { getScoreOfSinhVien } from '@/utils/examinee';
import { getRemainingTime, updateIsProcessing, updateRemainingTime, updateIndexProcess } from "@/utils/process";

export default {
  name: 'ViewHoaiNam',
  data() {
    return {
      numberOfVoters: 0,
      icons: Array.from({ length: 60 }, (_, i) => i),
      contestant: {
        name: 'HOÀI NAM',
        score: 0,
      },
      timer: null,
      remainingTime: 0,
      countdownActive: false,
    };
  },

  mounted() {
    this.getScored();
    this.getRmTime();
    this.timer = setInterval(() => {
      this.getScored();
    }, 2000);

    // Add event listeners for left, right arrow keys and enter
    window.addEventListener("keydown", this.handleKeyPress);
  },

  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener("keydown", this.handleKeyPress);
  },

  methods: {
    async moveNext() {
      await updateIndexProcess('thaovi')
      this.$router.push('/thao-vi');
    },

    async movePrevious() {
      await updateIndexProcess('dinhphong')
      this.$router.push('/dinh-phong');
    },

    async getScored() {
      try {
        const response = await getScoreOfSinhVien("hoainam");
        this.numberOfVoters = response.vote;
        this.contestant.score = this.numberOfVoters * 0.5;
      } catch (error) {
        console.log(error);
      }
    },
    async getRmTime() {
      try {
        const response = await getRemainingTime("hoainam");
        if (response) {
            this.remainingTime = response;
        }
      } catch (error) {
        console.log(error);
      }
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
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
            updateRemainingTime("hoainam", this.remainingTime);
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
    <div class="counter">
      {{ remainingTime }}
    </div>
    <div class="body">
      <div class="voters">
        <div class="title">
          <img src="../../assets/hoidonggiamkhao.png" alt="Hoi Dong Giam Khao" />
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
            <img
              v-else
              src="../../assets/notvoted_icon.png"
              alt="Icon"
            />
          </div>
        </div>
      </div>
      <div class="contestant">
        <div class="name">{{ contestant.name }}</div>
        <div class="score">{{ contestant.score }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.thi-sinh {
  display: flex;
  flex-direction: column;
  align-items: center;

  .counter {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 150%;
    color: white;
    font-weight: bold;
    background-color: #dd241d;
    padding: 0.5%;
    width: 12%;
    margin: 2%;
    border-radius: 15px;
  }

  .body {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin: 2%;

    .voters {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 65%;
      height: 100%;
      margin-left: 2%;

      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }

      .voters-status {
        margin-top: 5%;
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(6, 1fr);
        row-gap: 5%;

        .voter-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 80%;
          }
        }
      }
    }

    .contestant {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 40%;
      height: 100%;
      margin-top: 10%;

      .name {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 80%;
        color: #2e9ed3;
        border: 2px solid #2e9ed3;
        background-color: white;
        font-weight: bold;
        padding: 0.5%;
        width: 50%;
        padding: 2%;
        border-radius: 10px;
      }

      .score {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 300%;
        color: white;
        font-weight: bold;
        background-color: #004aad;
        width: 20vw;
        height: 20vw;
        margin-top: 5%;
        border-radius: 50%;
      }
    }
  }
}
</style>
