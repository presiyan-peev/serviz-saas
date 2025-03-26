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
/**
 * Change Passowrd
 */

const oldPassword = ref("");
const newPassword = ref("");

const tryChangingPassword = () => {
  //
};
</script>
