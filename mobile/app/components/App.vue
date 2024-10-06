<template>
  <Frame>
    <Login v-if="!isAuthenticated" @login="onLogin" />
    <BottomNavigation v-else>
      <TabStrip>
        <TabStripItem>
          <Label text="Home" />
        </TabStripItem>
        <TabStripItem>
          <Label text="Customers" />
        </TabStripItem>
        <TabStripItem>
          <Label text="Orders" />
        </TabStripItem>
        <TabStripItem>
          <Label text="Profile" />
        </TabStripItem>
      </TabStrip>

      <TabContentItem>
        <Dashboard />
      </TabContentItem>
      <TabContentItem>
        <Customers />
      </TabContentItem>
      <TabContentItem>
        <Orders />
      </TabContentItem>
      <TabContentItem>
        <Profile />
      </TabContentItem>
    </BottomNavigation>
  </Frame>
</template>

<script setup>
import { ref } from "vue";
import Login from "./Login.vue";
import Dashboard from "./Dashboard.vue";
import Customers from "./Customers.vue";
import Orders from "./Orders.vue";
import Profile from "./Profile.vue";

const isAuthenticated = ref(false);

function onLogin() {
  isAuthenticated.value = true;
}
</script>
