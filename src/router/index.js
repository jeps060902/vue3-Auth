import {createRouter, createWebHistory} from 'vue-router' 
const routes=[ 
    {
        path:'/',
        name:'home',
        component : () => import('../views/tampilan/card.vue')
    },
    {
        path:'/Alumni',
        name:'Alumni.index',
        component : () => import('../views/Alumni/index.vue')
    },
    {
        path:'/Prestasi',
        name:'Alumni.prestasi',
        component : () => import('../views/Prestasi/index.vue')
    },
    {
        path:'/Login',
        name:'login',
        component : () => import('../views/Auth/login.vue')
    },
    {
        path:'/Prestasi/:id',
        name:'Alumni.prestasiDetail',
        component : () => import('../views/Prestasi/index.vue')
    },
    // {
    //     path:'/edit/:id',
    //     name:'Alumni.edit',
    //     component : () => import('../views/Alumni/edit.vue')
    // }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// Lalu ekspor
export default router