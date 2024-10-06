<template>
  <Page>
    <ActionBar title="Profile" />
    <ScrollView>
      <StackLayout class="p-4">
        <Image :src="user.avatar" class="w-32 h-32 rounded-full mx-auto mb-4" />
        <TextField
          v-model="user.name"
          hint="Name"
          class="p-2 border-b border-gray-300 mb-4"
        />
        <TextField
          v-model="user.email"
          hint="Email"
          keyboardType="email"
          class="p-2 border-b border-gray-300 mb-4"
        />
        <TextField
          v-model="user.phone"
          hint="Phone"
          keyboardType="phone"
          class="p-2 border-b border-gray-300 mb-4"
        />
        <Button
          text="Save Changes"
          @tap="saveChanges"
          class="bg-blue-500 text-white p-4 rounded-lg mb-4"
        />
        <Button
          text="Change Password"
          @tap="changePassword"
          class="bg-gray-500 text-white p-4 rounded-lg"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { useApi } from "../composables/useApi";

const user = ref({
  name: "",
  email: "",
  phone: "",
  avatar: "https://example.com/default-avatar.png",
});

const { getApi, putApi } = useApi();

onMounted(() => {
  fetchUserProfile();
});

async function fetchUserProfile() {
  try {
    const response = await getApi("/user-profile");
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}

async function saveChanges() {
  try {
    await putApi("/user-profile", user.value);
    alert("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile. Please try again.");
  }
}

function changePassword() {
  // Navigate to change password page
  // You'll need to implement this navigation
}
</script>
