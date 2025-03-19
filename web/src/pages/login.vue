<template>
  <div>
    <v-form v-model="valid" @submit.prevent="tryLogin">
      <BaseInput v-model="username" label="Username" />
      <BaseInput v-model="password" label="Password" />
      <BaseButton type="submit" text="Login" />
      <BaseButton text="Forgotten Password" size="x-small" />
    </v-form>
  </div>
</template>

<script setup lang="ts">
const username = ref<string>("");
const password = ref<string>("");

function tryLogin(): void {
  console.log("xyu");
}
</script>
