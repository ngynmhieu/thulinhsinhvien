<script>
export default {
    name: 'ViewTable',
    props: {
        insertedColumns: Array,
    },
    data () {
        return {
            contestants:[
                {name: 'HOÀI KHANH'},
                {name: 'HẢI YẾN'},
                {name: 'ĐÌNH PHONG'},
                {name: 'HOÀI NAM'},
                {name: 'THẢO VI'},
                {name: 'NGỌC QUÝ'},
            ],
        }
    },
}
</script>

<template>
    <div class="table">
        <table>
            <thead>
                <tr>
                    <th class="column"></th>
                    <th class="column" v-for="(banGiamKhao, index) in insertedColumns" :key="index">
                        {{ banGiamKhao.name }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="content" v-for="(contestant, conIndex) in contestants" :key="conIndex">
                    <td class="contestant">{{ contestant.name }}</td>
                    <td class="scores" v-for="(judgeScore, scoreID) in insertedColumns" :key="scoreID">
                        {{ judgeScore.scores[conIndex] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table {
    margin-top: 20%;
    font-family: 'utm_avo_bold';
}

table {
    border-collapse: collapse; /* Kết hợp các viền lại với nhau */
    width: 100%; /* Đảm bảo bảng chiếm toàn bộ chiều rộng */
}

.column, .contestant, .scores {
    border: 1px solid #000; /* Viền màu đen cho cột và hàng */
    padding: 0.5%; /* Thêm khoảng cách cho nội dung */
}

.column {
    font-size: 75%;
}

.scores {
    text-align: center;
    vertical-align: middle;
    font-family: 'utm_avo' !important;
    font-size: 90%;
}

.contestant {
    font-size: 70%;
    width: 15%; /* Chiều rộng cột tên thí sinh */
}
</style>