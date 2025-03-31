<template>
  <div>
    <v-form @submit.prevent="emitSubmit">
      <BaseInput v-model="oldPassword" label="Old Password" />
      <BaseInput v-model="newPassword" label="New Password" />
      <BaseButton type="submit" text="Submit" :loading="loading" />
    </v-form>
  </div>
</template>

<script setup lang="ts">
defineProps({
  loading: Boolean,
});
const emit = defineEmits(["submit"]);

const oldPassword = defineModel("oldPassword");
const newPassword = defineModel("newPassword");

const emitSubmit = () => {
  emit("submit");
};
</script>
