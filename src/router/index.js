import {createRouter, createWebHistory} from 'vue-router' 
import DefaultLayout from '../views/Layout/DefaultLayout.vue'
import Home from'../views/tampilan/card.vue'
import Alumni from'../views/Alumni/index.vue'
import Prestasi from '../views/Prestasi/index.vue'
import Karir from'../views/Karir/index.vue'
const routes=[ 
     {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/Alumni', name: 'Alumni.index', component: Alumni },
      { path: '/Prestasi', name: 'Prestasi.index', component: Prestasi },
      { path: '/Prestasi/:id', name: 'Prestasi.detail', component: Prestasi },
      { path: '/Karir', name: 'karir.index', component: Karir },
      { path: '/Karir/:id', name: 'karir.detail', component: Karir },
      // Tambahkan rute lain di sini yang ingin pakai navbar
    ]
  },
    {
        path:'/Login',
        name:'login',
        component : () => import('../views/Auth/login.vue')
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