<script>
import ViewTable from './ViewTable.vue';

export default {
    name: 'ViewTongPhanThiGMTL',
    data() {
        return {
            tongDiem: [
                { name: 'Tổng điểm của HĐ Giám khảo sinh viên (tối đa 30 điểm)', scores: [0, 0, 0, 0, 0, 0] },
                { name: 'Điểm trung bình của HĐ Ban Giám Khảo (tối đa 70 điểm)', scores: [0, 0, 0, 0, 0, 0]  },
                { name: 'Tổng điểm phần thi', scores: [0, 0, 0, 0, 0, 0] },
            ]
        }
    },
    components: {
        ViewTable,
    },
    mounted() {
        this.getScore();
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    },
    methods: {
        async getScore() {
            // Call API to get scores of judges
        },
        handleKeydown(event) {
            if (event.key === 'ArrowRight') {
                this.moveNext(); // Chuyển đến trang tiếp theo
            } else if (event.key === 'ArrowLeft') {
                this.movePrevious(); // Quay về trang trước
            }
        },
        movePrevious() {
            console.log ('movePrevious');
            this.$router.push('/ban-giam-khao'); // Đường dẫn trang trước
        },
        moveNext() {
            this.$router.push('/tong-ket'); // Đường dẫn trang tiếp theo
        },
    }
}
</script>

<template>
<div>
    <ViewTable :insertedColumns="tongDiem" />
</div>
</template>