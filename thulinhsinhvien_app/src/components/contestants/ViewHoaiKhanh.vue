<script>
export default {
  name: 'ViewHaiYen',
  data() {
    return {
        numberOfVoters: 40,
        icons: Array.from({length: 60}, (_, i) => i),
        contestant: {
            name: 'HOÀI KHANH',
            score: 20
        }
    }
  },
  methods: {
    moveNext() {
        this.$router.push('/hai-yen');
    },
    movePrevious() {
        this.$router.push('/tong-ket');
    }
  }
}
</script>

<template>
    <div class="thi-sinh">
        <div class="counter">
            60
        </div>
        <div class="body">
            <div class="chevron-left" @click="movePrevious">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/>
                </svg>
            </div>
            <div class="voters">
                <div class="title">
                    <img src="../../assets/hoidonggiamkhao.png" alt="Hoi Dong Giam Khao">
                </div>
                <div class="voters-status">
                    <div v-for="icon in icons" :key="icon" 
                    :id="'icon-' + (icon + 1)" class="voter-icon">
                        <img v-if="icon < numberOfVoters" src="../../assets/voted_icon.png" alt="Icon">
                        <img v-else src="../../assets/notvoted_icon.png" alt="Icon">
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
            <div class="chevron-right" @click="moveNext">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style>
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
                font-size: 70%;
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
                font-size: 250%;
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
