<script setup lang="ts">
import { NButton, NText } from "naive-ui";
import { defineEmits } from "vue";

const emit = defineEmits(["start"]);
</script>

<template>
  <div class="intro-screen">
    <n-text class="title" strong>Guess the cards</n-text>
    <n-button
      class="button"
      color="#8a2be2"
      round
      size="large"
      @click="emit('start')"
      >Play</n-button
    >
  </div>
</template>

<style scoped>
.intro-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.title {
  font-size: 1.5rem;
}

.button {
  text-transform: uppercase;
}
</style>
