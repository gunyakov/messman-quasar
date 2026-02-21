<template>
  <div class="mobile-emoji-panel bg-white">
    <q-separator />
    <EmojiPicker @select="emit('select', $event)" />
  </div>
</template>

<script setup lang="ts">
import EmojiPicker from './EmojiPicker.vue';

const emit = defineEmits<{
  select: [emoji: string];
}>();
</script>

<style scoped lang="scss">
.mobile-emoji-panel {
  height: 260px;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
