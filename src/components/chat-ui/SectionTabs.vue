<template>
  <nav class="tg-left-tabs column items-center q-py-sm q-gutter-sm">
    <q-btn
      flat
      round
      dense
      icon="chat"
      :color="modelValue === 'chats' ? 'primary' : 'grey-7'"
      @click="emit('update:modelValue', 'chats')"
    />
    <q-btn
      flat
      round
      dense
      icon="groups"
      :color="modelValue === 'contacts' ? 'primary' : 'grey-7'"
      @click="emit('update:modelValue', 'contacts')"
    />
    <q-btn
      flat
      round
      dense
      icon="perm_media"
      :color="modelValue === 'media' ? 'primary' : 'grey-7'"
      @click="emit('update:modelValue', 'media')"
    />
    <q-btn
      flat
      round
      dense
      icon="account_circle"
      :color="modelValue === 'account' ? 'primary' : 'grey-7'"
      @click="emit('update:modelValue', 'account')"
    />
  </nav>
</template>

<script setup lang="ts">
import type { SectionType } from './types';

defineProps<{ modelValue: SectionType }>();

const emit = defineEmits<{
  'update:modelValue': [value: SectionType];
}>();
</script>

<style scoped lang="scss">
.tg-left-tabs {
  width: 72px;
  min-width: 72px;
}

@media (max-width: 768px) {
  .tg-left-tabs {
    display: none;
  }
}
</style>
