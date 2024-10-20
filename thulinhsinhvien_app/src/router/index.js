import { createRouter, createWebHistory } from 'vue-router'
import ViewBanGiamKhao from '@/components/ViewBanGiamKhao.vue'
import ViewHoiDong from '@/components/ViewHoiDong.vue'
import ViewThiSinh from '@/components/ViewThiSinh.vue'
import ViewTongKet from '@/components/ViewTongKet.vue'

const routes = [
    {
        path: '/',
        redirect: '/thi-sinh',
    },
    {
        path: '/thi-sinh',
        name: 'ViewThiSinh',
        component: ViewThiSinh,
    },
    {
        path: '/hoi-dong',
        name: 'ViewHoiDong',
        component: ViewHoiDong,
    },
    {
        path: '/ban-giam-khao',
        name: 'ViewBanGiamKhao',
        component: ViewBanGiamKhao,
    },
    {
        path: '/tong-ket',
        name: 'ViewTongKet',
        component: ViewTongKet,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router