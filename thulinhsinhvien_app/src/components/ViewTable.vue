<script>
export default {
    name: 'ViewTable',
    props: {
        insertedColumns: Array,
    },
    data () {
        return {
            contestants: [
                { name: 'HOÀI KHANH', score: 0, color: '#3872BF', apiName: 'hoaikhanh' },
                { name: 'HẢI YẾN', score: 0, color: '#FF3131', apiName: 'haiyen' },
                { name: 'ĐÌNH PHONG', score: 0, color: '#5E17EB', apiName: 'dinhphong' },
                { name: 'HOÀI NAM', score: 0, color: '#FF914D', apiName: 'hoainam' },
                { name: 'THẢO VI', score: 0, color: '#00BF63', apiName: 'thaovi' },
                { name: 'NGỌC QUÝ', score: 0, color: '#FF66C4', apiName: 'ngocquy' },
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
                    <td class="contestant" :style="{color: contestant.color}">{{ contestant.name }}</td>
                    <td class="scores" v-for="(judgeScore, scoreID) in insertedColumns" :key="scoreID"
                    :style="{color: contestant.color}">
                        {{ judgeScore.scores[conIndex] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
.table {
    margin-top: 15%;
    font-family: 'utm_avo_bold';
}

table {
    width: 100%; /* Đảm bảo bảng chiếm toàn bộ chiều rộng */
}

.column, .contestant, .scores {
    padding: 0.5%; /* Thêm khoảng cách cho nội dung */
}

.column {
    font-size: 70%;
}

.scores {
    text-align: center;
    vertical-align: middle;
    font-family: 'utm_avo_bold' !important;
    font-size: 90%;
}

.contestant {
    font-size: 70%;
    width: 15%;
    text-align: center;
}
</style>