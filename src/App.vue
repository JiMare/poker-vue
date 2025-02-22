<script setup lang="ts">
import { ref, onMounted } from "vue";
import IntroScreen from "./pages/IntroScreen.vue";
import GameScreen from "./pages/GameScreen.vue";
import BaseLayout from "./components/layout/BaseLayout.vue";

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
    <IntroScreen v-if="!isPlaying && isFirstTime" @start="isPlaying = true" />
    <GameScreen v-if="isPlaying" />
  </BaseLayout>
</template>
