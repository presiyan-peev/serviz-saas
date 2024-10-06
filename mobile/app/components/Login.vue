<template>
  <Page>
    <ActionBar title="Login" />
    <StackLayout class="p-4">
      <TextField
        v-model="email"
        hint="Email"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        class="p-2 border-b border-gray-300 mb-4"
      />
      <TextField
        v-model="password"
        hint="Password"
        secure="true"
        class="p-2 border-b border-gray-300 mb-4"
      />
      <Button
        text="Login"
        @tap="handleLogin"
        :isEnabled="!loading"
        class="bg-blue-500 text-white p-4 rounded-lg"
      />
      <Button
        text="Forgot Password"
        @tap="forgotPassword"
        class="text-blue-500 p-4"
      />
      <ActivityIndicator :busy="loading" />
    </StackLayout>
  </Page>
</template>

<script setup>
import { ref, defineEmits } from "@vue/runtime-core";
import { useLogin } from "../composables/useLogin";

const email = ref("");
const password = ref("");
const { loading, error, login } = useLogin();

const emit = defineEmits(["login"]);

async function handleLogin() {
  if (await login(email.value, password.value)) {
    emit("login");
  } else {
    alert("Login failed. Please check your credentials.");
  }
}

function forgotPassword() {
  // Navigate to Forgot Password page
  // You'll need to implement this navigation
}
</script>
