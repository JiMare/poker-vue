<script setup lang="ts">
import { ref, onMounted } from "vue";
import { startTime } from "../../constants";

defineProps<{ timeLeft: number }>();
const emit = defineEmits(["update:timeLeft"]);

const time = ref(startTime);

const startTimer = () => {
  const interval = setInterval(() => {
    if (time.value > 0) {
      time.value--;
      emit("update:timeLeft", time.value);
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

onMounted(startTimer);
</script>

<template>
  <div class="timer">Time left: {{ time }}s</div>
</template>

<style scoped>
.timer {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
</style>
