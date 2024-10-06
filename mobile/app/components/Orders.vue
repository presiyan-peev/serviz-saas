<template>
  <Page>
    <ActionBar title="Orders" />
    <ListView for="order in orders" @itemTap="onOrderTap">
      <v-template>
        <StackLayout class="p-2 border-b border-gray-200">
          <Label :text="'Order #' + order.id" class="font-bold" />
          <Label :text="'Customer: ' + order.customerName" />
          <Label :text="'Date: ' + formatDate(order.date)" />
          <Label :text="'Total: $' + order.total.toFixed(2)" />
        </StackLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { format } from "date-fns";
import { useApi } from "../composables/useApi";

const orders = ref([]);
const { getApi } = useApi();

onMounted(() => {
  fetchOrders();
});

async function fetchOrders() {
  try {
    const response = await getApi("/orders");
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
}

function formatDate(date) {
  return format(new Date(date), "MMMM d, yyyy");
}

function onOrderTap(event) {
  // Navigate to order details page
  // You'll need to implement this navigation
}
</script>
