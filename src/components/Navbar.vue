<!-- components/Navbar.vue -->
<template>
  <nav>
    <div v-if="!isHomePage" class="nav-left">
      <h4>Лабораторная работа №4</h4>
      <h4>Александров Александр Александрович</h4>
      <h4>Группа: P3206 Вариант: 115242</h4>
    </div>
    <div class="nav-right">
      <button v-if="!authStore.isAuthenticated" @click="goToLogin">Login</button>
      <button v-if="!authStore.isAuthenticated" @click="goToSignup">Signup</button>
      <button v-if="authStore.isAuthenticated" @click="logout">Logout</button>
    </div>
  </nav>

</template>

<script>
import { useAuthStore } from '../store/auth';
import {useRoute, useRouter} from 'vue-router';
import {computed} from "vue";

export default {
  setup() {
    const authStore = useAuthStore();
    const route = useRoute();
    const router = useRouter();

    const isHomePage = computed(() => {
      console.log("Current route name:", route.name);
      return route.name === "home";
    });

    const goToLogin = () => router.push("/");
    const goToSignup = () => router.push("/signup");
    const logout = () => {
      authStore.logout();
      router.push("/");
    };

    return { authStore, isHomePage, goToLogin, goToSignup, logout };
  },
};
</script>
