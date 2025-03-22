<template>
  <div class="flex">
    <v-slide-x-transition v-show="showLogin">
      <LoginForm
        v-model:email="email"
        v-model:password="password"
        :loading="tryingToLogin"
        @click:forgotten-password="switchToForgottenPasswordForm"
        @submit="tryLogin"
      />
    </v-slide-x-transition>
    <v-slide-x-reverse-transition v-show="!showLogin">
      <ForgottenPasswordForm
        v-model:email="email"
        v-model:password="password"
        :loading="tryingToLogin"
        @click:remembered-password="switchToLoginForm"
        @submit="tryToResetPassword"
      />
    </v-slide-x-reverse-transition>
  </div>
</template>

<script setup lang="ts">
import LoginForm from "@/components/login/LoginForm.vue";
import { useAuth } from "@/composables/useAuth";

const { login } = useAuth();
const email = ref<string>("");
const password = ref<string>("");

const showLogin = ref(true);

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
  showLogin.value = false;
  console.log("sw");
};

const switchToLoginForm = () => {
  showLogin.value = true;
};
</script>
