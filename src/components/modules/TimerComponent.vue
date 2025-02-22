<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{ timeLeft: number; running: boolean }>();
const emit = defineEmits(["update:timeLeft"]);

const interval = ref<number | null>(null);

watchEffect(() => {
  if (props.running) {
    if (!interval.value) {
      interval.value = setInterval(() => {
        if (props.timeLeft > 0) {
          emit("update:timeLeft", props.timeLeft - 1);
        } else {
          clearInterval(interval.value!);
          interval.value = null;
        }
      }, 1000);
    }
  } else {
    if (interval.value) {
      clearInterval(interval.value);
      interval.value = null;
    }
  }
});
</script>

<template>
  <div class="timer">Time left: {{ timeLeft }}s</div>
</template>

<style scoped>
.timer {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
