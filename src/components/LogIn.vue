<template>
  <form @submit.prevent="handleLogin">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>
    <button class="login-button" type="submit">Login</button>
    <span v-if="errorMessage" class="error-message">{{ errorMessage }}</span>
  </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const authStore = useAuthStore();
    const router = useRouter();

    const validate = () => {
      if (!username.value || !password.value) {
        errorMessage.value = "Username and password are required.";
        return false;
      }
      errorMessage.value = "";
      return true;
    };

    const handleLogin = async () => {
      if (!validate()) return;

      try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
          username: username.value,
          password: password.value,
        });
        authStore.login(response.data.token);
        router.push("/home");
      } catch (error) {
        errorMessage.value = "Login failed: " + (error.response?.data?.message || "This user doesn\'t exist!");
      }
    };

    return {
      username,
      password,
      errorMessage,
      handleLogin,
    };
  },
};

</script>

<style>
.error-message {
  display: block;
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
