<script>
import { getScoreOfBgk } from '@/utils/examinee';

export default {
  name: 'ViewBanGiamKhao',
  data() {
    return {
        contestants:[
        {name: 'HOÀI KHANH', score: 0, color: '#3872BF', apiName: 'hoaikhanh'},
            {name: 'HẢI YẾN', score: 0, color: '#FF3131', apiName: 'haiyen'},
            {name: 'ĐÌNH PHONG', score: 0, color: '#5E17EB', apiName: 'dinhphong'},
            {name: 'HOÀI NAM', score: 0, color: '#FF914D', apiName: 'hoainam'},
            {name: 'THẢO VI', score: 0, color: '#00BF63', apiName: 'thaovi'},
            {name: 'NGỌC QUÝ', score: 0, color: '#FF66C4', apiName: 'ngocquy'},
        ],
        timer: null,
    }
  },

  mounted() {
    this.getScored();
    this.timer = setInterval(() => {
        this.getScored();
    }, 2000);
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },

  methods: {
    moveNext() {
        this.$router.push('/tong-ket');
    },
    movePrevious() {
        this.$router.push('/hoi-dong');
    },
    async getScored() {
        try {
            for (let i = 0; i < this.contestants.length; i++) {
                const response = await getScoreOfBgk(this.contestants[i].apiName);
                this.contestants[i].score = response;
            }
        } catch (error) {
            console.log(error);
        }
    }, 
  }
}
</script>

<template>
    <div class="hoi-dong">
        <div class="body">
            <div class="chevron-left" @click="movePrevious">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/>
                </svg>
            </div>
            <div class="title">
                <span>BAN GIÁM KHẢO</span>
            </div>
            <div class="score-board">
                <div v-for="contestant in contestants" :key="contestant.name" class="contestant">
                    <span>{{ contestant.name }}</span>
                    <span :style="{ color: contestant.color }">{{ contestant.score }}</span>
                </div>
            </div>
            <div class="chevron-right" @click="moveNext">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/>
                </svg>
            </div>
        </div>
    </div>
</template>