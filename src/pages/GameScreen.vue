<script setup lang="ts">
import { ref } from "vue";
import BaseCard from "../components/ui/BaseCard.vue";
import { NButton, NText } from "naive-ui";
import ResultModal from "../components/modules/ResultModal.vue";
import TimerComponent from "../components/modules/TimerComponent.vue";

const isCorrect = ref(false);
const resultModal = ref<InstanceType<typeof ResultModal> | null>(null);
const timeLeft = ref(100);

const options = ref(["Full House", "Two Pair", "Straight Flush"]);

const checkAnswer = (option: string) => {
  isCorrect.value = option === "Full House";
  resultModal.value?.openModal();
};
</script>

<template>
  <div class="game-screen">
    <TimerComponent v-model:timeLeft="timeLeft" />
    <div class="hand">
      <BaseCard rank="A" suit="♠" />
      <BaseCard rank="K" suit="♥" />
      <BaseCard rank="Q" suit="♦" />
      <BaseCard rank="J" suit="♣" />
      <BaseCard rank="10" suit="♠" />
    </div>
    <div class="options">
      <n-button
        v-for="(option, index) in options"
        :key="index"
        @click="checkAnswer(option)"
        >{{ option }}</n-button
      >
    </div>
  </div>
  <ResultModal ref="resultModal" :isCorrect="isCorrect" />
</template>

<style scoped>
.game-screen {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
}

.hand {
  display: flex;
  gap: 0.5rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
