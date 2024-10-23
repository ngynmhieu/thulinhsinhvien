<script>
import { getScoreOfBgk } from '@/utils/examinee';

export default {
  name: 'ViewBanGiamKhao',
  data() {
    return {
        contestants: [
            { name: 'HOÀI KHANH', score: 0, color: '#3872BF', apiName: 'hoaikhanh' },
            { name: 'HẢI YẾN', score: 0, color: '#FF3131', apiName: 'haiyen' },
            { name: 'ĐÌNH PHONG', score: 0, color: '#5E17EB', apiName: 'dinhphong' },
            { name: 'HOÀI NAM', score: 0, color: '#FF914D', apiName: 'hoainam' },
            { name: 'THẢO VI', score: 0, color: '#00BF63', apiName: 'thaovi' },
            { name: 'NGỌC QUÝ', score: 0, color: '#FF66C4', apiName: 'ngocquy' },
        ],
        timer: null,
    }
  },

  mounted() {
    this.getScored();
    this.timer = setInterval(() => {
        this.getScored();
    }, 2000);
    window.addEventListener('keydown', this.handleKeydown); // Thêm lắng nghe sự kiện phím
  },

  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown); // Xóa lắng nghe sự kiện phím
  },

  methods: {
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.moveNext(); // Chuyển đến trang tiếp theo
      } else if (event.key === 'ArrowLeft') {
        this.movePrevious(); // Quay về trang trước
      }
    },
    moveNext() {
        this.$router.push('/tong-phan-thi-gmtl'); // Đường dẫn trang tiếp theo
    },
    movePrevious() {
        this.$router.push('/bgk-score'); // Đường dẫn trang trước
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
            <div class="title">
                <span>BAN GIÁM KHẢO</span>
            </div>
            <div class="score-board">
                <div v-for="contestant in contestants" :key="contestant.name" class="contestant">
                    <span>{{ contestant.name }}</span>
                    <span :style="{ color: contestant.color }">{{ contestant.score }}</span>
                </div>
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
            font-size: 150%;
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
                    font-size: 90%;
                    font-weight: bold;
                    margin: 2%;
                    color: #2E9ED3;
                }
            }
        }
    }
}
</style>
