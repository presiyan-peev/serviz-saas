<template>
  <div>
    <v-form @submit.prevent="emitSubmit">
      <BaseInput v-model="email" label="Email" />
      <BaseInput v-model="password" label="Password" />
      <BaseButton type="submit" text="Login" :loading="loading" />
      <BaseButton
        text="Forgotten Password"
        size="x-small"
        :loading="loading"
        @click="emitForgottenPassword"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
const email = defineModel<string>("email");
const password = defineModel<string>("password");

defineProps({
  loading: Boolean,
});

const emit = defineEmits(["submit", "click:forgotten-password"]);

const emitSubmit = () => {
  emit("submit");
};

const emitForgottenPassword = () => {
  emit("click:forgotten-password");
};
</script>
