<script>
import { getCurrentPart2addScore, getCurrentPart2Score, getScoreOfChandungthulinh, setCurrentPart2addScore, setCurrentPart2Score } from '@/utils/examinee';
import { updateIndexQuestion } from '@/utils/exam';

export default {
  name: 'ViewTongKet',
  data() {
    return {
        contestants:[
            {name: 'HOÀI KHANH', score: 0, color: '#3872BF', apiName: 'hoaikhanh', addScore: 10},
            {name: 'HẢI YẾN', score: 0, color: '#FF3131', apiName: 'haiyen', addScore: 0},
            {name: 'ĐÌNH PHONG', score: 0, color: '#5E17EB', apiName: 'dinhphong', addScore: 0},
            {name: 'HOÀI NAM', score: 0, color: '#FF914D', apiName: 'hoainam', addScore: 0},
            {name: 'THẢO VI', score: 0, color: '#00BF63', apiName: 'thaovi', addScore: 0},
            {name: 'NGỌC QUÝ', score: 0, color: '#FF66C4', apiName: 'ngocquy', addScore: 0},
        ],
        timer: null,
        questionId: 0,
        isShowScore: false,
    }
  },

  mounted() {
    this.timer = setInterval(() => {
        this.getScored();
    }, 2000);
    this.getAddScore();
    window.addEventListener('keydown', this.handleKeydown); // Thêm lắng nghe sự kiện phím
  },

  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown); // Xóa lắng nghe sự kiện phím
  },

  created() {
    if (this.$route.query.id) {
        this.questionId = parseInt(this.$route.query.id, 10);
        this.$emit('questionId', this.questionId);
    } else {
        this.questionId = 0;
        this.$emit('questionId', this.questionId);
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
      } else if (event.key === 'u' && this.isQuestion) {
        this.isShowScore = true;
        setTimeout(() => {
            for (let i = 0; i < this.contestants.length; i++) {
                this.contestants[i].score += this.contestants[i].addScore;
                this.contestants[i].addScore = 0;
                setCurrentPart2Score(this.contestants[i].apiName, this.contestants[i].score, this.questionId - 1);
                setCurrentPart2addScore(this.contestants[i].apiName, this.contestants[i].addScore, this.questionId - 1);
            }
        }, 2000);
      }
    },
    movePrevious() {
        if (this.questionId > 0) {
            this.$router.push({ path: '/cau-hoi', query: { id: this.questionId }}); // Đường dẫn trang trước
        } else {
            this.$router.push('/ban-giam-khao'); // Đường dẫn trang trước
        }
    },
    moveNext() {
        updateIndexQuestion(this.questionId);
        this.$router.push({ path: '/cau-hoi', query: { id: this.questionId + 1 }}); // Đường dẫn trang tiếp theo
    },
    async getScored() {
        try {
            if (this.isQuestion){
                for (let i = 0; i < this.contestants.length; i++) {
                    const response = await getCurrentPart2Score(this.contestants[i].apiName);
                    this.contestants[i].score = response;
                }
            } else {
                for (let i = 0; i < this.contestants.length; i++) {
                    const response = await getScoreOfChandungthulinh(this.contestants[i].apiName);
                    this.contestants[i].score = response;
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getAddScore() {
        try {
            for (let i = 0; i < this.contestants.length; i++) {
                const response = await getCurrentPart2addScore(this.contestants[i].apiName);
                this.contestants[i].addScore = response;
            }
        } catch (error) {
            console.log(error);
        }
    }
  },

  computed: {
    isQuestion() {
        return this.questionId > 0 && this.questionId <= 20;
    }
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
                    <span v-show="contestant.addScore && this.isShowScore" class="points">+ {{ contestant.addScore }}</span>
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