<script setup lang="ts">
import { NText } from "naive-ui";
import { type SuitType, type RankType } from "../../types/common";
import { getShape } from "../../utils/gameUtils";
defineProps<{
  rank: RankType;
  suit: SuitType;
}>();
</script>

<template>
  <div class="card">
    <n-text class="rank">{{ rank }}</n-text>
    <n-text class="rank">{{ getShape(suit) }}</n-text>
  </div>
</template>

<style scoped>
.card {
  width: 3.75rem;
  height: 6.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px lightgray;
  border-radius: 0.2rem;
}

.rank {
  font-size: 1.25rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
