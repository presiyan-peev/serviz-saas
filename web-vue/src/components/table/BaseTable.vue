<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key" class="text-left">
          {{ header.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td v-for="header in headers" :key="header.key">
          {{ item[header.key] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
interface TableHeader {
  title: string;
  key: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
}

interface Props {
  headers: TableHeader[];
  items: Record<string, any>[];
}

defineProps<Props>();
</script>

<style scoped>
/* Add custom styles here if needed */
</style>
