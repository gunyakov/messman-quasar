<template>
  <div class="column no-wrap fit desktop-conversation">
    <header class="row items-center justify-between q-px-md q-py-sm bg-white">
      <div class="row items-center no-wrap">
        <q-avatar color="primary" text-color="white" size="42px">{{
          activeChat.initials
        }}</q-avatar>
        <div class="q-ml-sm">
          <div class="text-weight-medium">{{ activeChat.name }}</div>
          <div class="text-caption text-grey-7">last seen recently</div>
        </div>
      </div>

      <div class="row items-center q-gutter-xs">
        <q-btn flat round dense icon="search" />
        <q-btn flat round dense icon="more_vert" />
      </div>
    </header>

    <q-separator />

    <ConversationContent
      :messages="messages"
      :draft="draft"
      mode="desktop"
      @update:draft="emit('update:draft', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import ConversationContent from './ConversationContent.vue';
import type { ChatItem, MessageItem } from './types';

defineProps<{
  activeChat: ChatItem;
  messages: MessageItem[];
  draft: string;
}>();

const emit = defineEmits<{
  'update:draft': [value: string];
}>();
</script>

<style scoped lang="scss">
.desktop-conversation {
  position: relative;
}
</style>
