<template>
  <q-page class="tg-page bg-grey-3">
    <div class="tg-shell q-mx-auto q-my-md q-elevation-1 bg-white">
      <SectionTabs :model-value="activeSection" @update:model-value="emit('set-section', $event)" />

      <q-separator vertical class="tg-desktop-only" />

      <DesktopSidebarPanel
        :active-section="activeSection"
        :search="search"
        :sidebar-placeholder="sidebarPlaceholder"
        :chats="chats"
        :contacts="contacts"
        :media-items="mediaItems"
        :active-chat-id="activeChatId"
        @update:search="emit('update:search', $event)"
        @select-chat="emit('select-chat', $event)"
        @logout="emit('logout')"
      />

      <q-separator vertical class="tg-desktop-only" />

      <main class="tg-chat column no-wrap">
        <DesktopConversationPanel
          :active-chat="activeChat"
          :messages="messages"
          :draft="draft"
          @update:draft="emit('update:draft', $event)"
        />
      </main>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import DesktopConversationPanel from 'components/chat-ui/DesktopConversationPanel.vue';
import DesktopSidebarPanel from 'components/chat-ui/DesktopSidebarPanel.vue';
import SectionTabs from 'components/chat-ui/SectionTabs.vue';
import type {
  ChatItem,
  ContactItem,
  MediaItem,
  MessageItem,
  SectionType,
} from 'components/chat-ui/types';

defineProps<{
  activeSection: SectionType;
  search: string;
  sidebarPlaceholder: string;
  chats: ChatItem[];
  contacts: ContactItem[];
  mediaItems: MediaItem[];
  activeChatId: number;
  activeChat: ChatItem;
  messages: MessageItem[];
  draft: string;
}>();

const emit = defineEmits<{
  'set-section': [section: SectionType];
  'update:search': [value: string];
  'select-chat': [chatId: number];
  logout: [];
  'update:draft': [value: string];
}>();
</script>

<style scoped lang="scss">
.tg-page {
  min-height: 100dvh;
}

.tg-shell {
  width: min(1280px, calc(100vw - 24px));
  height: min(840px, calc(100dvh - 24px));
  border-radius: 12px;
  overflow: hidden;
  display: flex;
}

.tg-desktop-only {
  display: flex;
}

.tg-chat {
  flex: 1;
  min-width: 0;
}

@media (max-width: 1023px) {
  .tg-shell {
    width: 100%;
    height: 100dvh;
    border-radius: 0;
    margin: 0;
  }
}

@media (max-width: 768px) {
  .tg-page {
    background: inherit !important;
  }

  .tg-desktop-only {
    display: none;
  }
}
</style>
