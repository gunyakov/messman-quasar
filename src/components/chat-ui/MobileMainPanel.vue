<template>
  <div class="column no-wrap fit tg-mobile-main">
    <div
      v-if="mobileSidebarOpen"
      class="tg-mobile-sidebar-backdrop"
      @click="mobileSidebarOpen = false"
    />

    <aside
      class="tg-mobile-sidebar bg-white"
      :class="{ 'tg-mobile-sidebar--open': mobileSidebarOpen }"
    >
      <div class="q-pa-sm">
        <AccountSidebarContent @logout="onLogout" />
      </div>
    </aside>

    <header class="row items-center justify-between q-px-md q-py-sm bg-white">
      <div class="row items-center no-wrap">
        <q-btn
          v-if="activeSection === 'chats' && mobileChatOpen"
          flat
          round
          dense
          icon="arrow_back"
          class="q-mr-sm"
          @click="emit('back')"
        />
        <q-btn
          v-else
          flat
          round
          dense
          icon="menu"
          class="q-mr-sm"
          @click="mobileSidebarOpen = true"
        />
        <q-avatar
          v-if="activeSection === 'chats' && mobileChatOpen"
          color="primary"
          text-color="white"
          size="34px"
          class="q-mr-sm"
        >
          {{ activeChat.initials }}
        </q-avatar>
        <div class="text-subtitle1 text-weight-medium">{{ mobileHeaderTitle }}</div>
      </div>
      <q-btn flat round dense icon="search" />
    </header>

    <q-separator />

    <ConversationContent
      v-if="activeSection === 'chats' && mobileChatOpen"
      :messages="messages"
      :draft="draft"
      mode="mobile"
      @update:draft="emit('update:draft', $event)"
    />

    <q-scroll-area v-else class="col bg-white">
      <SectionLists
        :active-section="activeSection"
        :chats="chats"
        :contacts="contacts"
        :media-items="mediaItems"
        :active-chat-id="activeChatId"
        variant="mobile"
        @select-chat="emit('select-chat', $event)"
      />
    </q-scroll-area>

    <q-separator v-if="!(activeSection === 'chats' && mobileChatOpen)" />

    <footer
      v-if="!(activeSection === 'chats' && mobileChatOpen)"
      class="row items-center justify-around q-py-xs bg-white tg-mobile-bottom-bar"
    >
      <q-btn
        flat
        round
        dense
        icon="chat"
        :color="activeSection === 'chats' ? 'primary' : 'grey-7'"
        @click="onSetSection('chats')"
      />
      <q-btn
        flat
        round
        dense
        icon="groups"
        :color="activeSection === 'contacts' ? 'primary' : 'grey-7'"
        @click="onSetSection('contacts')"
      />
      <q-btn
        flat
        round
        dense
        icon="perm_media"
        :color="activeSection === 'media' ? 'primary' : 'grey-7'"
        @click="onSetSection('media')"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccountSidebarContent from './AccountSidebarContent.vue';
import ConversationContent from './ConversationContent.vue';
import SectionLists from './SectionLists.vue';
import type { ChatItem, ContactItem, MediaItem, MessageItem, SectionType } from './types';

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

const mobileSidebarOpen = ref(false);

function onSetSection(section: SectionType) {
  mobileSidebarOpen.value = false;
  emit('set-section', section);
}

function onLogout() {
  mobileSidebarOpen.value = false;
  emit('logout');
}
</script>

<style scoped lang="scss">
.tg-mobile-main {
  width: 100%;
  position: relative;
}

.tg-mobile-sidebar-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 20;
}

.tg-mobile-sidebar {
  position: absolute;
  top: 0;
  left: -88%;
  bottom: 0;
  width: min(82vw, 320px);
  z-index: 21;
  transition: left 0.2s ease;
  display: flex;
  flex-direction: column;
}

.tg-mobile-sidebar--open {
  left: 0;
}

.tg-mobile-bottom-bar {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
}
</style>
