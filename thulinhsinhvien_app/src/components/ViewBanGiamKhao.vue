<script>
export default {
  name: 'ViewBanGiamKhao',
  data() {
    return {
        contestants:[
            {name: 'HOÀI KHANH', score: 20, color: '#3872BF'},
            {name: 'HẢI YẾN', score: 100, color: '#FF3131'},
            {name: 'ĐÌNH PHONG', score: 30, color: '#5E17EB'},
            {name: 'HOÀI NAM', score: 10, color: '#FF914D'},
            {name: 'THẢO VI', score: 50, color: '#00BF63'},
            {name: 'NGỌC QUÝ', score: 40, color: '#FF66C4'},
        ] 
    }
  },
  methods: {
    moveNext() {
        this.$router.push('/tong-ket');
    },
    movePrevious() {
        this.$router.push('/hoi-dong');
    }
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
            font-size: 180%;
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
                border-radius: 15px;
                padding: 2%;
                padding-left: 5%;
                span {
                    font-size: 100%;
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