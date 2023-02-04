import MainPage from './pages/MainPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    
    {
        path: '/',
        name: 'home',
        component: MainPage,
    },
    {
        path: '/episode/:id',
        name: 'episode',
        component: () => import('./pages/EpisodePage.vue'),
    },

]

/*export default new VueRouter({
    mode: 'history', //чтобы роутеры работали через слеши
    routes
})*/

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router