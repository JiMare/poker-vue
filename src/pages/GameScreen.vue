<script setup lang="ts">
import { ref, watch } from "vue";
import BaseCard from "../components/ui/BaseCard.vue";
import { NButton } from "naive-ui";
import ResultModal from "../components/modules/ResultModal.vue";
import TimerComponent from "../components/modules/TimerComponent.vue";
import { startTime } from "../constants";
import {
  generateAnswerOptions,
  getHandRanking,
  generateHand,
} from "../utils/gameUtils";

const emit = defineEmits(["gameOver"]);

const isCorrect = ref(false);
const resultModal = ref<InstanceType<typeof ResultModal> | null>(null);
const correctAnswers = ref(0);
const timeLeft = ref(startTime);
const isTimerRunning = ref(true);
const hand = ref(generateHand());
const handRanking = ref(getHandRanking(hand.value));
const options = ref(generateAnswerOptions(handRanking.value));

const checkAnswer = (option: boolean) => {
  isTimerRunning.value = false;
  isCorrect.value = option;
  resultModal.value?.openModal();
  if (option) {
    timeLeft.value += 10;
    correctAnswers.value += 1;
  } else {
    timeLeft.value -= 10;
  }
};

const shuffleNewHand = () => {
  hand.value = generateHand();
  handRanking.value = getHandRanking(hand.value);
  options.value = generateAnswerOptions(handRanking.value);
  isTimerRunning.value = true;
};

watch(timeLeft, (newTime) => {
  if (newTime <= 0) {
    const attempts = JSON.parse(localStorage.getItem("game_attempts") || "[]");
    attempts.push(correctAnswers.value);
    localStorage.setItem("game_attempts", JSON.stringify(attempts));
    emit("gameOver");
  }
});
</script>

<template>
  <div class="game-screen">
    <TimerComponent v-model:timeLeft="timeLeft" :running="isTimerRunning" />
    <div class="hand">
      <BaseCard
        v-for="(card, index) in hand"
        :key="index"
        :rank="card.rank"
        :suit="card.suit"
      />
    </div>
    <div class="options">
      <n-button
        v-for="(option, index) in options"
        :key="index"
        @click="checkAnswer(option.isCorrect)"
        :focusable="false"
        >{{ option.name }}</n-button
      >
    </div>
  </div>
  <ResultModal
    ref="resultModal"
    :isCorrect="isCorrect"
    @close="shuffleNewHand"
  />
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
