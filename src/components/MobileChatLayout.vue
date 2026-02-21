<template>
  <q-page class="tg-page bg-grey-3">
    <div class="tg-shell q-mx-auto q-my-md q-elevation-1 bg-white">
      <main class="tg-chat column no-wrap">
        <MobileMainPanel
          :active-section="activeSection"
          :mobile-chat-open="mobileChatOpen"
          :mobile-header-title="mobileHeaderTitle"
          :active-chat="activeChat"
          :chats="chats"
          :contacts="contacts"
          :media-items="mediaItems"
          :messages="messages"
          :draft="draft"
          :active-chat-id="activeChatId"
          @back="emit('back')"
          @select-chat="emit('select-chat', $event)"
          @set-section="emit('set-section', $event)"
          @update:draft="emit('update:draft', $event)"
          @logout="emit('logout')"
        />
      </main>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MobileMainPanel from 'components/chat-ui/MobileMainPanel.vue';
import type {
  ChatItem,
  ContactItem,
  MediaItem,
  MessageItem,
  SectionType,
} from 'components/chat-ui/types';

defineProps<{
  activeSection: SectionType;
  mobileChatOpen: boolean;
  mobileHeaderTitle: string;
  activeChat: ChatItem;
  chats: ChatItem[];
  contacts: ContactItem[];
  mediaItems: MediaItem[];
  messages: MessageItem[];
  draft: string;
  activeChatId: number;
}>();

const emit = defineEmits<{
  back: [];
  'select-chat': [chatId: number];
  'set-section': [section: SectionType];
  'update:draft': [value: string];
  logout: [];
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

  .tg-shell {
    width: 100%;
    height: 100dvh;
    margin: 0;
    border-radius: 0;
  }
}
</style>
