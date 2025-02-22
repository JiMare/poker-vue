<template>
  <div class="layout">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.layout {
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 100%;
  max-width: 400px;
  text-align: center;
}
</style>
