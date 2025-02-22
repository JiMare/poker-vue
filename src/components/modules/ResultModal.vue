<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { NModal, NCard } from "naive-ui";

defineProps<{
  isCorrect: boolean;
}>();

const emit = defineEmits(["close"]);

const show = ref(false);

const openModal = () => {
  show.value = true;
};

const closeModal = () => {
  show.value = false;
  emit("close");
};

defineExpose({ openModal });
</script>

<template>
  <n-modal v-model:show="show" @update:show="(val) => !val && emit('close')">
    <n-card
      style="width: 400px; text-align: center"
      :title="isCorrect ? 'Correct' : 'Wrong'"
      :bordered="false"
      size="huge"
      role="dialog"
    >
      {{ isCorrect ? "You gain 10s" : "You loose 10s" }}
    </n-card>
  </n-modal>
</template>
