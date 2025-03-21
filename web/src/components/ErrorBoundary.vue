<template>
  <div v-if="error" class="error">{{ errorMessage }}</div>
  <div v-else><slot></slot></div>
</template>

<script setup lang="ts">
import { useErrorHandler } from "@/composables/utils/useErrorHandler";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const { logErrorToConsole } = useErrorHandler();

const error = ref<unknown>(null);
const errorMessage = `Error rendering this part of the site. Error Code UI${props.id}`;

// TODO: find how to import this from vue
type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void;

const errorCaptured: ErrorCapturedHook = (err, vm, info) => {
  error.value = err;
  logErrorToConsole(err, vm, info);
  return false; // Prevents the error from propagating further
};

onErrorCaptured(errorCaptured);
</script>
