<script setup lang="ts">
import { NCard, NList, NListItem, NText } from "naive-ui";
import { computed } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(["start"]);

const attempts = computed(() => {
  return JSON.parse(localStorage.getItem("game_attempts") || "[]");
});
</script>

<template>
  <n-card :bordered="false">
    <template #header>
      <n-text strong style="font-size: 24px">Leaderboard</n-text>
    </template>
    <n-list>
      <n-list-item v-for="(score, index) in attempts" :key="index">
        <n-text>Attempt {{ index + 1 }} - {{ score }} answers</n-text>
      </n-list-item>
    </n-list>
  </n-card>
  <n-button
    class="button"
    color="#8a2be2"
    round
    size="large"
    @click="emit('start')"
    >Play again</n-button
  >
</template>

<style scoped>
.button {
  text-transform: uppercase;
}
</style>
