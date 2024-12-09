import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import { useAuthStore } from '../store/auth';
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";

const routes = [
    { path: "/", name: "login", component: LogIn },
    { path: "/signup", name: "signup", component: SignUp },
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
