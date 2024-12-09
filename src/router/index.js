import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import Home from '../components/Home.vue';
import { useAuthStore } from '../store/auth';

const routes = [
    { path: "/", name: "login", component: Login },
    { path: "/signup", name: "signup", component: Signup },
    {
        path: "/home",
        name: "home",
        component: Home,
        beforeEnter: (to, from, next) => {
            const authStore = useAuthStore();
            if (!authStore.isAuthenticated) {
                next("/");
            } else {
                next();
            }
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
