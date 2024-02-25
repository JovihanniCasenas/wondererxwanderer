import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            meta: { layout: 'home' },
            components: {
                default: () => import('@/pages/MainView.vue'),
            }
        },
        {
            path: '/content',
            name: 'content-list',
            meta: { layout: 'content-list' },
            components: {
                default: () => import('@/pages/MainView.vue'),
            }
        },
        {
            path: '/content/:id',
            name: 'content',
            meta: { layout: 'content' },
            components: {
                default: () => import('@/pages/ContentView.vue'),
            }
        }
    ]
})

export default router