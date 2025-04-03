<template>
  <div class="customers-list">
    <h1>Customers List</h1>
    <div class="content">
      <p>This is the customers listing page</p>
      <router-link to="/customers/create" class="btn"
        >Add New Customer</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.customers-list {
  padding: 20px;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 16px;
}
</style>
