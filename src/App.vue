<script setup lang="ts">
import { ref, onMounted } from "vue";
import IntroScreen from "./pages/IntroScreen.vue";
import GameScreen from "./pages/GameScreen.vue";
import BaseLayout from "./components/layout/BaseLayout.vue";
import LeaderbordScreen from "./pages/LeaderbordScreen.vue";

const isPlaying = ref(false);
const isFirstTime = ref(true);

const checkResults = () => {
  const attempts = JSON.parse(localStorage.getItem("game_attempts") || "[]");
  isFirstTime.value = attempts.length === 0;
};

onMounted(checkResults);
</script>

<template>
  <BaseLayout>
    <GameScreen v-if="isPlaying" @gameOver="isPlaying = false; checkResults()" />
    <IntroScreen
      v-else-if="!isPlaying && isFirstTime"
      @start="isPlaying = true"
    />
    <LeaderbordScreen
      v-else-if="!isPlaying && !isFirstTime"
      @start="isPlaying = true"
    />
  </BaseLayout>
</template>
