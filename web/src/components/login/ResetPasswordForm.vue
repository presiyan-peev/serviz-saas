<template>
  <div>
    <v-form @submit.prevent="emitSubmit">
      <BaseInput v-model="password" label="Password" />
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
const password = defineModel<string>("password");

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
