<template>
  <div>
    <div v-if="!resetToken">Invalid token</div>
    <ResetPasswordForm
      v-else
      v-model:password="password"
      @submit="tryResetingPassword"
    />
  </div>
</template>

<script setup lang="ts">
import { useRoute, type LocationQueryValue } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const route = useRoute();
const { resetPassword } = useAuth();

const resetToken = computed(() => route.query.token as LocationQueryValue);

const password = ref("");

const tryingToResetpassword = ref(false);
const tryResetingPassword = () => {
  tryingToResetpassword.value = true;
  resetPassword(password.value, resetToken.value);
};
</script>
