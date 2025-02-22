<script setup lang="ts">
import { ref } from "vue";
import { NModal, NCard } from "naive-ui";

defineProps<{
  isCorrect: boolean;
}>();

const show = ref(false);

const openModal = () => {
  show.value = true;
};

defineExpose({ openModal });
</script>

<template>
  <n-modal v-model:show="show">
    <n-card
      style="width: 400px; text-align: center"
      :title="isCorrect ? 'Correct' : 'Wrong'"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      {{ isCorrect ? "You gain 10s" : "You loose 10s" }}
    </n-card>
  </n-modal>
</template>
