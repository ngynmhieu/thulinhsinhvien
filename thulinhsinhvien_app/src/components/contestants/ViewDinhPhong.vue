<script>
import { getScoreOfSinhVien, getTimeByName, setTimeByName } from "@/utils/examinee";
export default {
  name: "ViewDinhPhong",
  data() {
    return {
      numberOfVoters: 0,
      icons: Array.from({ length: 60 }, (_, i) => i),
      contestant: {
        name: "ĐÌNH PHONG",
        score: 0,
      },
      timer: null,
      remainingTime: 60, // Thay đổi này để lưu thời gian còn lại
    };
  },

  mounted() {
    this.getScored();
    this.getTime(); // Lấy thời gian còn lại khi component mounted
    this.timer = setInterval(() => {
      this.getScored();
    }, 2000);

    window.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    clearInterval(this.timer);
    window.removeEventListener('keydown', this.handleKeydown);
  },

  methods: {
    moveNext() {
      this.$router.push("/hoai-nam");
    },
    movePrevious() {
      this.$router.push("/hai-yen");
    },
    handleKeydown(event) {
      if (event.key === 'ArrowRight') {
        this.moveNext();
      } else if (event.key === 'ArrowLeft') {
        this.movePrevious();
      } else if (event.key === 'Enter') {
        this.startCountdown(); // Bắt đầu đếm ngược khi nhấn Enter
      }
    },

    async getTime() {
      try {
        const time = await getTimeByName("dinhphong");
        this.remainingTime = time; // Giả sử API trả về thời gian còn lại
        // Cập nhật thời gian vào cơ sở dữ liệu nếu cần thiết
        await this.setTime(this.remainingTime);
      } catch (error) {
        console.log(error);
      }
    },

    // Dùng hàm này để cập nhật thời gian còn lại lên db
    async setTime(time) {
      try {
        await setTimeByName("dinhphong", time);
      } catch (error) {
        console.log(error);
      }
    },

    // Hàm bắt đầu đếm ngược
    startCountdown() {
      if (this.timer) {
        clearInterval(this.timer); // Gỡ bỏ timer nếu đang chạy
      }
      this.timer = setInterval(() => {
        this.updateTimer();
      }, 1000); // Cập nhật mỗi giây
    },

    // Hàm để cập nhật thời gian còn lại mỗi giây
    updateTimer() {
      if (this.remainingTime > 0) {
        this.remainingTime -= 1;
        this.setTime(this.remainingTime); // Cập nhật thời gian mới lên DB
      } else {
        clearInterval(this.timer); // Dừng timer khi thời gian đã hết
      }
    },

    async getScored() {
      try {
        const response = await getScoreOfSinhVien("dinhphong");
        this.numberOfVoters = response.vote;
        this.contestant.score = this.numberOfVoters * 0.5;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<template>
  <div class="thi-sinh">
    <div class="counter">{{ remainingTime }}</div> <!-- Cập nhật thời gian còn lại -->
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
          {{ contestant.score }}
        </div>
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
        background-color: #DD241D;
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
                color: #2E9ED3;
                border: 2px solid #2E9ED3;
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
                background-color: #004AAD;
                width: 20vw;
                height: 20vw;
                margin-top: 5%;
                border-radius: 50%;
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
