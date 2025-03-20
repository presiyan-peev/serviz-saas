<template>
  <v-snackbar v-model="showSnackbar" v-bind="snackbarProps">
    {{ snackbarProps.title }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotify } from "src/composables/useNotify.ts";

const { showSnackbar, snackbarProps } = useNotify();
</script>
