<template>
  <Page>
    <ActionBar title="Customers" />
    <GridLayout columns="*, 300" rows="*">
      <ListView col="0" :items="customers" @itemTap="onCustomerTap">
        <v-template>
          <StackLayout class="p-2 border-b border-gray-200">
            <Label :text="$item.name" class="font-bold" />
            <Label :text="'Last visit: ' + formatDate($item.lastVisit)" />
            <Label :text="'Cars: ' + $item.cars.join(', ')" />
          </StackLayout>
        </v-template>
      </ListView>
      <StackLayout
        col="1"
        class="bg-white border-l border-gray-200"
        :class="{ 'translate-x-full': !selectedCustomer }"
      >
        <ScrollView>
          <StackLayout class="p-4">
            <Label text="Customer Details" class="text-lg font-bold mb-4" />
            <TextField
              v-model="selectedCustomer.name"
              hint="Name"
              class="p-2 border-b border-gray-300"
              @tap="makeEditable"
            />
            <TextField
              v-model="selectedCustomer.email"
              hint="Email"
              class="p-2 border-b border-gray-300"
              @tap="makeEditable"
            />
            <TextField
              v-model="selectedCustomer.phone"
              hint="Phone"
              class="p-2 border-b border-gray-300"
              @tap="makeEditable"
            />
            <Label text="Cars" class="font-bold mt-4 mb-2" />
            <StackLayout
              v-for="(car, index) in selectedCustomer.cars"
              :key="index"
            >
              <TextField
                v-model="selectedCustomer.cars[index]"
                class="p-2 border-b border-gray-300"
                @tap="makeEditable"
              />
            </StackLayout>
            <Button
              text="Save Changes"
              @tap="saveCustomerChanges"
              class="bg-blue-500 text-white p-2 rounded mt-4"
            />
          </StackLayout>
        </ScrollView>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script setup>
import { ref, onMounted } from "@vue/runtime-core";
import { format } from "date-fns";
import { useCustomer } from "../composables/useCustomer";

const selectedCustomer = ref(null);
const { customers, loading, error, fetchCustomers, updateCustomer } =
  useCustomer();

onMounted(() => {
  fetchCustomers();
});

function formatDate(date) {
  return format(new Date(date), "MMMM d, yyyy");
}

function onCustomerTap(event) {
  selectedCustomer.value = { ...customers.value[event.index] };
}

function makeEditable(event) {
  event.object.editable = true;
}

async function saveCustomerChanges() {
  try {
    await updateCustomer(selectedCustomer.value.id, selectedCustomer.value);
    selectedCustomer.value = null;
  } catch (error) {
    console.error("Error saving customer changes:", error);
    alert("Failed to save customer changes. Please try again.");
  }
}
</script>
