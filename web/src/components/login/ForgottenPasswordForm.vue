<template>
  <div>
    <v-form @submit.prevent="emitSubmit">
      <BaseInput v-model="email" label="Email" />
      <BaseButton type="submit" text="Submit" :loading="loading" />
      <BaseButton
        text="I remembered the password!"
        size="x-small"
        :loading="loading"
        @click="emitRememberedPassword"
      />
    </v-form>
  </div>
</template>

<script setup lang="ts">
const email = defineModel<string>("email");

defineProps({
  loading: Boolean,
});

const emit = defineEmits(["submit", "click:remembered-password"]);

const emitSubmit = () => {
  emit("submit");
};

const emitRememberedPassword = () => {
  emit("click:remembered-password");
};
</script>
