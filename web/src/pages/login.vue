<template>
  <div>
    <div>
      <LoginForm
        v-model:email="email"
        v-model:password="password"
        :loading="tryingToLogin"
        @click:forgotten-password="switchToForgottenPasswordForm"
        @submit="tryLogin"
      />
    </div>
    <div>
      <ForgottenPasswordForm
        v-model:email="email"
        v-model:password="password"
        :loading="tryingToLogin"
        @remembered-password="switchToLoginForm"
        @submit="tryToResetPassword"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/login/LoginForm.vue";
import { useAuth } from "@/composables/useAuth";

const { login } = useAuth();
const email = ref<string>("");
const password = ref<string>("");

const tryingToLogin = ref(false);
const tryLogin: () => Promise<void> = async () => {
  try {
    tryingToLogin.value = true;
    await login(email.value, password.value);
  } catch (error) {
    console.log(error);
  } finally {
    tryingToLogin.value = false;
  }
};

const tryToResetPassword = () => {
  //
};

const switchToForgottenPasswordForm = () => {
  //
};

const switchToLoginForm = () => {
  //
};
</script>
