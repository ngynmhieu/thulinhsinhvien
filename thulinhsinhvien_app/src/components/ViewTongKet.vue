<script>
import { getScoreOfChandungthulinh } from '@/utils/examinee';

export default {
  name: 'ViewTongKet',
  data() {
    return {
        contestants:[
            {name: 'HOÀI KHANH', score: 0, color: '#3872BF', apiName: 'hoaikhanh', scored: false},
            {name: 'HẢI YẾN', score: 0, color: '#FF3131', apiName: 'haiyen', scored: false},
            {name: 'ĐÌNH PHONG', score: 0, color: '#5E17EB', apiName: 'dinhphong', scored: false},
            {name: 'HOÀI NAM', score: 0, color: '#FF914D', apiName: 'hoainam', scored: false},
            {name: 'THẢO VI', score: 0, color: '#00BF63', apiName: 'thaovi', scored: false},
            {name: 'NGỌC QUÝ', score: 0, color: '#FF66C4', apiName: 'ngocquy', scored: false},
        ],
        timer: null,
        questionId: 0,
    }
  },

  mounted() {
    this.timer = setInterval(() => {
        this.getScored();
    }, 2000);
    window.addEventListener('keydown', this.handleKeydown); // Thêm lắng nghe sự kiện phím
  },

  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown); // Xóa lắng nghe sự kiện phím
  },

  created() {
    if (this.$route.query.id) {
        this.questionId = parseInt(this.$route.query.id, 10);
    } else {
        this.questionId = 0;
    }
  },

  methods: {
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        if (this.questionId < 20) {
            this.moveNext(); // Chuyển đến trang tiếp theo
        }
      } else if (event.key === 'ArrowLeft') {
        this.movePrevious(); // Quay về trang trước
      }
    },
    moveNext() {
        this.$router.push({ path: '/cau-hoi', query: { id: this.questionId + 1 }}); // Đường dẫn trang tiếp theo
    },
    movePrevious() {
        if (this.questionId > 0) {
            this.$router.push({ path: '/cau-hoi', query: { id: this.questionId }}); // Đường dẫn trang trước
        } else {
            this.$router.push('/ban-giam-khao'); // Đường dẫn trang trước
        }
    },
    async getScored() {
        try {
            for (let i = 0; i < this.contestants.length; i++) {
                const response = await getScoreOfChandungthulinh(this.contestants[i].apiName);
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
                <img v-show="this.questionId == 0" src="../assets/tongket.png" alt="Tong ket">
                <img v-show="(this.questionId > 0) && (this.questionId <= 21)" src="../assets/tong_ket_chinh_phuc.png" alt="Tong ket">
            </div>
            <div class="score-board">
                <div v-for="contestant in contestants" :key="contestant.name" class="contestant">
                    <span>{{ contestant.name }}</span>
                    <span :style="{ color: contestant.color }">{{ contestant.score }}</span>
                    <span v-show="contestant.scored" class="points">+10</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 100%;
    height: auto;
}

.chevron-right {
    width: 6%;
    display: block;
}

@keyframes fadeOut {
    0% {
        opacity: 1;
        transform: translateY(0);
    }
    100% {
        opacity: 0;
        transform: translateY(-30px);
    }
}

.points {
    animation: fadeOut 3s forwards; 
    position: absolute;
    right: 0;
    color: red !important;
    font-size: 100% !important;
    font-weight: bold;
}

</style>