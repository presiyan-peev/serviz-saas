<template>
  <Page>
    <ActionBar title="Dashboard" />
    <ScrollView>
      <StackLayout class="p-4">
        <Label text="Today's Appointments" class="text-lg font-bold mb-2" />
        <StackLayout
          v-for="(appointment, index) in todayAppointments"
          :key="index"
          :class="['p-2 mb-2 rounded', appointmentColors[index % 6]]"
        >
          <Label :text="appointment.time" class="font-bold" />
          <Label :text="appointment.customerName" />
          <Label :text="appointment.carMake" />
        </StackLayout>

        <StackLayout class="h-px bg-gray-300 my-4" />

        <Label text="Tomorrow's Appointments" class="text-lg font-bold mb-2" />
        <StackLayout
          v-for="(appointment, index) in tomorrowAppointments"
          :key="index"
          :class="[
            'p-2 mb-2 rounded',
            appointmentColors[(index + todayAppointments.length) % 6],
          ]"
        >
          <Label :text="appointment.time" class="font-bold" />
          <Label :text="appointment.customerName" />
          <Label :text="appointment.carMake" />
        </StackLayout>

        <Button
          text="Add Appointment"
          @tap="openCalendarModal"
          class="bg-blue-500 text-white p-4 rounded-lg mt-4"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script setup>
import { ref } from "@vue/runtime-core";

const todayAppointments = ref([
  { time: "09:00", customerName: "John Doe", carMake: "Toyota Corolla" },
  { time: "11:30", customerName: "Jane Smith", carMake: "Honda Civic" },
]);

const tomorrowAppointments = ref([
  { time: "10:00", customerName: "Alice Johnson", carMake: "Ford Mustang" },
  { time: "14:00", customerName: "Bob Williams", carMake: "Chevrolet Camaro" },
]);

const appointmentColors = [
  "bg-red-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-yellow-200",
  "bg-purple-200",
  "bg-pink-200",
];

function openCalendarModal() {
  console.log("Open calendar modal");
  // Implement calendar modal logic here
}
</script>
