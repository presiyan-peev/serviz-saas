<template>
  <div class="cars-list">
    <h1>Cars List</h1>
    <div class="content">
      <p>This is the cars listing page</p>
      <router-link to="/cars/create" class="btn">Add New Car</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.cars-list {
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
