<script>
import { getQuestionByIndex } from '@/utils/questionBank';

export default {
  name: 'ViewCauHoi',
  data() {
    return {
        cauHoi: "",
        options: [
            { index: "A", content: "", correct: false },
            { index: "B", content: "", correct: false },
            { index: "C", content: "", correct: false },
            { index: "D", content: "", correct: false },
        ],
        remainingTime: 30,
        questionId: 0,
        timer: null,
        isTimeOut: false,
    }
  },

  mounted() {
    window.addEventListener('keydown', this.handleKeydown); // Thêm lắng nghe sự kiện phím
  },

  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown); // Xóa lắng nghe sự kiện phím
  },

  created() {
    this.questionId = parseInt(this.$route.query.id, 10);
  },

  methods: {
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.moveNext(); // Chuyển đến trang tiếp theo
      } else if (event.key === 'ArrowLeft') {
        this.movePrevious(); // Quay về trang trước
      } else if (event.key === 's') {
        this.getQuestion();
        this.startCountdown();
      }
    },
    moveNext() {
        this.$router.push({ path: 'tong-ket', query: { id: parseInt(this.questionId) }}); // Đường dẫn trang tiếp theo
    },
    movePrevious() {
        this.$router.push({ path: 'tong-ket', query: { id: this.questionId - 1 }}); // Đường dẫn trang trước
    },
    async getQuestion() {
        try {
            const response = await getQuestionByIndex(this.questionId - 1);
            if (response) {
                this.cauHoi = response.question;
                let randomArray = response.otherAnswer;
                let randomIndex = Math.floor(Math.random() * 4);
                randomArray.splice(randomIndex, 0, response.correctAnswer);
                this.options.forEach ((option, index) => {
                    option.content = randomArray[index];
                    if (option.content === response.correctAnswer) {
                        option.correct = true;
                    } else {
                        option.correct = false;
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    startCountdown() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
            this.remainingTime--;
        } else {
            this.isTimeOut = true;
            clearInterval(this.timer);
        }
      }, 1000);
    },
  },
}
</script>

<template>
    <div class="cau-hoi">
        <div class="counter">{{ remainingTime }}</div>
        <div class="question-text">
            <span>CÂU HỎI {{ this.questionId }}</span>
            <div class="content">
                <span>{{ this.cauHoi }}</span>
            </div>
            <div class="options">
                <div class="option" v-for="option in options" :key="option.index">
                    <div class="option-title" :class="{ 'correct-answer': (isTimeOut && option.correct) }">{{ option.index }}</div>
                    <div class="option-content" :class="{ 'correct-answer': (isTimeOut && option.correct) }">
                        {{ option.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cau-hoi {
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

    .question-text {
        width: 90%;
        margin-top: 5%;
        display: flex;
        justify-content: left;
        align-items: left;
        flex-direction: column;
        span {
            margin-left: 3%;
            font-size: 100%;
            color: red;
            text-shadow: 
                -1px -1px 0 #fff,  
                1px -1px 0 #fff,
                -1px 1px 0 #fff,
                1px 1px 0 #fff; 
            font-weight: bold;
        }
        .content {
            min-height: 10vw;
            margin-top: 1%;
            padding: 2% 0%;
            width: 100%;
            background-color: #004aad;
            font-weight: bold;
            border-radius: 10px;
            display: flex;
            justify-content: left;
            align-items: left;
            flex-direction: column;
            span {
                color: white;
                text-shadow: none;
                font-size: 90%;
                font-weight: bold;
            }
        }

        .options {
            margin-top: 3%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(2, 1fr);
            row-gap: 13%;
            column-gap: 5%;
            justify-items: stretch;
            .option {
                font-size: 100%;
                color: black;
                font-weight: bold;
                width: 100%;
                display: flex;
                align-items: center;
                .option-title {
                    position: absolute;
                    background-color: #004aad;
                    border-radius: 15px;
                    padding: 1%;
                    height: 7vw;
                    width: 5%;
                    font-size: 120%;
                    color: white;
                    font-weight: bold;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &.correct-answer {
                        background-color: #00bf63;
                    }
                }
                .option-content {
                    background-color: white;
                    border-radius: 10px;
                    padding: 1%;
                    padding-left: 20%;
                    padding-right: 5%;
                    height: 7vw;
                    width: 70%;
                    font-size: 60%;
                    color:#004aad;
                    font-weight: bold;
                    &.correct-answer {
                        background-color: #eaffcf;
                    }
                }
            }
        }
    }
}
</style>