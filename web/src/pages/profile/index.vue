<template>
  <div>
    <ChangePasswordForm
      v-model:oldPassword="oldPassword"
      v-model:newPassword="newPassword"
      @submit="tryChangingPassword"
    />
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";

const { changePassword } = useAuth();

/**
 * Change Passowrd
 */

const oldPassword = ref("");
const newPassword = ref("");

const tryChangingPassword = () => {
  changePassword(oldPassword.value, newPassword.value);
};
</script>
