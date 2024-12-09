<template>
  <form @submit.prevent="handleSignup">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="username" />
    </div>
    <div>
      <label for="password">Password</label>
      <input id="password" type="password" v-model="password" />
    </div>
    <button class="signup-button" type="submit">Signup</button>
    <span v-if="errors.password">{{ errors.password }}</span>
    <span v-if="serverError" class="server-error">{{ serverError }}</span>
  </form>
</template>


<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { reactive, ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");
    const errors = reactive({ username: "", password: "" });
    const serverError = ref("");
    const router = useRouter();

    const validate = () => {
      errors.username = username.value ? "" : "Username is required";
      errors.password =
          password.value.length >= 6
              ? ""
              : "Password must be at least 6 characters long";
      return !errors.username && !errors.password;
    };

    const handleSignup = async () => {
      if (!validate()) return;

      try {
        await axios.post("http://readme.weebat.ru:25100/api/auth/register", {
          username: username.value,
          password: password.value,
        });
        serverError.value = "";
        router.push("/");
      } catch (error) {
        serverError.value =
            error.response?.data?.message || "Signup failed: Username is already using.";
      }
    };

    return { username, password, errors, serverError, handleSignup };
  },
};
</script>

<style>
.server-error, span {
  display: block;
  color: red;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
