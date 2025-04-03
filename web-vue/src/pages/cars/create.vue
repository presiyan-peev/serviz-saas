<template>
  <div class="car-create">
    <h1>Add New Car</h1>
    <div class="content">
      <p>This is the car creation form</p>
      <router-link to="/cars" class="btn">Back to List</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic will go here
</script>

<style scoped>
.car-create {
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
