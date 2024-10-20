import { createRouter, createWebHistory } from 'vue-router'
import ViewBanGiamKhao from '@/components/ViewBanGiamKhao.vue'
import ViewHoiDong from '@/components/ViewHoiDong.vue'
import ViewHoaiKhanh from '@/components/contestants/ViewHoaiKhanh.vue'
import ViewTongKet from '@/components/ViewTongKet.vue'
import ViewHaiYen from '@/components/contestants/ViewHaiYen.vue'
import ViewDinhPhong from '@/components/contestants/ViewDinhPhong.vue'
import ViewHoaiNam from '@/components/contestants/ViewHoaiNam.vue'
import ViewThaoVi from '@/components/contestants/ViewThaoVi.vue'
import ViewNgocQuy from '@/components/contestants/ViewNgocQuy.vue'

const routes = [
    {
        path: '/',
        redirect: '/hoai-khanh',
    },
    {
        path: '/hoai-khanh',
        name: 'ViewHoaiKhanh',
        component: ViewHoaiKhanh,
    },
    {
        path: '/hai-yen',
        name: 'ViewHaiYen',
        component: ViewHaiYen,
    },
    {
        path: '/dinh-phong',
        name: 'ViewDinhPhong',
        component: ViewDinhPhong,
    },
    {
        path: '/hoai-nam',
        name: 'ViewHoaiNam',
        component: ViewHoaiNam,
    },
    {
        path: '/thao-vi',
        name: 'ViewThaoVi',
        component: ViewThaoVi,
    },
    {
        path: '/ngoc-quy',
        name: 'ViewNgocQuy',
        component: ViewNgocQuy,
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