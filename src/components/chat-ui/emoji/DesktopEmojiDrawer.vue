<template>
  <q-slide-transition>
    <aside v-if="modelValue" class="desktop-emoji-drawer bg-white">
      <div class="row items-center justify-between q-px-sm q-py-xs">
        <div class="text-subtitle2 text-weight-medium">Emoji</div>
        <q-btn flat round dense icon="close" @click="emit('update:modelValue', false)" />
      </div>

      <q-separator />

      <EmojiPicker @select="emit('select', $event)" />
    </aside>
  </q-slide-transition>
</template>

<script setup lang="ts">
import EmojiPicker from './EmojiPicker.vue';

defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
  select: [emoji: string];
}>();
</script>

<style scoped lang="scss">
.desktop-emoji-drawer {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 340px;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  z-index: 10;
  display: flex;
  flex-direction: column;
}
</style>
