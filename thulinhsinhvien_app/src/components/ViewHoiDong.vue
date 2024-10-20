<script>
import { getScoreOfSinhVien } from '@/utils/examinee';

export default {
  name: 'ViewHoiDong',
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
        this.$router.push('/ban-giam-khao');
    },
    movePrevious() {
        this.$router.push('/ngoc-quy');
    },
    async getScored() {
        try {
            for (let i = 0; i < this.contestants.length; i++) {
                const response = await getScoreOfSinhVien(this.contestants[i].apiName);
                this.contestants[i].score = response.vote*0.5;
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
                <span>HỘI ĐỒNG</span>
                <span>GIÁM KHẢO SINH VIÊN</span>
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

<style>
.hoi-dong {
    display: flex;
    flex-direction: column;
    align-items: center;

    .body {
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        margin: 2%;
        margin-top: 11.5%;

        .title {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            font-size: 300%;
            color: #004AAD;
            font-weight: bold;
            width: 65%;
        }
        .score-board {
            display: flex;
            flex-direction: column;
            width: 40%;
            align-items: center;
            .contestant {
                margin-top: 2%;
                background-color: white;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: 80%;
                border: 2px solid #2E9ED3;
                border-radius: 40px;
                padding: 2%;
                padding-left: 5%;
                span {
                    font-size: 180%;
                    font-weight: bold;
                    margin: 2%;
                    color: #2E9ED3;
                }
            }
        }


        .chevron-right {
            width: 6%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5%;
            opacity: 0.5;
            svg {
                width: 100%;
                height: auto;
                fill: #0CE2F8;
            }
        }

        .chevron-right:hover {
            opacity: 1;
        }

        .chevron-left {
            width: 6%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 5%;
            opacity: 0.5;
            transform: scaleX(-1);
            svg {
                width: 100%;
                height: auto;
                fill: #0CE2F8;
            }
        }

        .chevron-left:hover {
            opacity: 1;
        }
    }
}

</style>