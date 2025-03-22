<template>
  <div>
    <v-form @submit.prevent="tryLogin">
      <BaseInput v-model="username" label="Username" />
      <BaseInput v-model="password" label="Password" />
      <BaseButton type="submit" text="Login" :loading="tryingToLogin" />
      <BaseButton
        text="Forgotten Password"
        size="x-small"
        :loading="tryingToLogin"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
const { login } = useAuth();
const username = ref<string>("");
const password = ref<string>("");

const tryingToLogin = ref(false);
const tryLogin: () => Promise<void> = async () => {
  try {
    tryingToLogin.value = true;
    await login(username.value, password.value);
  } catch (error) {
    console.log(error);
  } finally {
    tryingToLogin.value = false;
  }
};
</script>
