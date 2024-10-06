<template>
  <Page>
    <ActionBar title="Forgot Password" />
    <StackLayout class="p-4">
      <TextField
        v-model="email"
        hint="Email"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        class="p-2 border-b border-gray-300 mb-4"
      />
      <Button
        text="Reset Password"
        @tap="resetPassword"
        class="bg-blue-500 text-white p-4 rounded-lg"
      />
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from "@vue/runtime-core";
import axios from "axios";

export default Vue.extend({
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async resetPassword() {
      try {
        await axios.post("/forgot-password", { email: this.email });
        alert("Password reset instructions have been sent to your email.");
        this.$navigateBack();
      } catch (error) {
        console.error("Password reset error:", error);
        alert("Failed to send password reset instructions. Please try again.");
      }
    },
  },
});
</script>
