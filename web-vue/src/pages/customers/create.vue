<template>
  <div class="customer-create">
    <h1>Add New Customer</h1>
    <div class="content">
      <p>This is the customer creation form</p>
      <router-link to="/customers" class="btn">Back to List</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.customer-create {
  padding: 20px;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #666;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 16px;
}
</style>
