<template>
  <q-list v-if="activeSection === 'chats'" separator>
    <q-item
      v-for="chat in chats"
      :key="chat.id"
      clickable
      :active="chat.id === activeChatId"
      active-class="bg-grey-2"
      class="q-py-md"
      @click="emit('select-chat', chat.id)"
    >
      <q-item-section avatar>
        <q-avatar color="primary" text-color="white">{{ chat.initials }}</q-avatar>
      </q-item-section>

      <q-item-section v-if="variant === 'desktop'" class="tg-chat-main-section">
        <q-item-label class="tg-chat-top-row">
          <span class="text-weight-medium tg-chat-name">{{ chat.name }}</span>
        </q-item-label>
        <q-item-label caption lines="1" class="row items-center no-wrap tg-chat-preview">
          <q-icon
            v-if="chat.outgoing"
            name="done_all"
            size="16px"
            class="q-mr-xs"
            :class="chat.read ? 'text-primary' : 'text-grey-7'"
          />
          {{ chat.preview }}
        </q-item-label>
      </q-item-section>

      <q-item-section v-else>
        <q-item-label class="text-weight-medium">{{ chat.name }}</q-item-label>
        <q-item-label caption lines="1">{{ chat.preview }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <span
          class="text-caption text-grey-7"
          :class="variant === 'desktop' ? 'tg-chat-time' : ''"
          >{{ chat.time }}</span
        >
        <q-badge v-if="variant === 'desktop' && chat.unread" rounded color="primary">{{
          chat.unread
        }}</q-badge>
      </q-item-section>
    </q-item>
  </q-list>

  <q-list v-else-if="activeSection === 'contacts'" separator>
    <q-item v-for="contact in contacts" :key="contact.id" clickable>
      <q-item-section avatar>
        <q-avatar color="secondary" text-color="white">{{ contact.initials }}</q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-medium">{{ contact.name }}</q-item-label>
        <q-item-label caption>{{ contact.status }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <q-list v-else-if="activeSection === 'media'" separator>
    <q-item v-for="item in mediaItems" :key="item.id" clickable>
      <q-item-section avatar>
        <q-icon name="photo" color="primary" />
      </q-item-section>
      <q-item-section>
        <q-item-label class="text-weight-medium">{{ item.title }}</q-item-label>
        <q-item-label caption>{{ item.meta }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>

  <div v-else class="q-pa-md text-caption text-grey-7">Select section</div>
</template>

<script setup lang="ts">
import type { ChatItem, ContactItem, MediaItem, SectionType } from './types';

defineProps<{
  activeSection: SectionType;
  chats: ChatItem[];
  contacts: ContactItem[];
  mediaItems: MediaItem[];
  activeChatId: number;
  variant: 'desktop' | 'mobile';
}>();

const emit = defineEmits<{
  'select-chat': [chatId: number];
}>();
</script>

<style scoped lang="scss">
.tg-chat-main-section {
  min-width: 0;
}

.tg-chat-top-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.tg-chat-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.tg-chat-time {
  display: inline-block;
  flex-shrink: 0;
}

.tg-chat-preview {
  min-width: 0;
}
</style>
