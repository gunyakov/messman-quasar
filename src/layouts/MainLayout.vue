<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <DesktopChatLayout
        v-if="!isMobile"
        :active-section="activeSection"
        :search="search"
        :sidebar-placeholder="sidebarPlaceholder"
        :chats="chats"
        :contacts="contacts"
        :media-items="mediaItems"
        :active-chat-id="activeChatId"
        :active-chat="activeChat"
        :messages="messages"
        :draft="draft"
        @set-section="setSection"
        @update:search="search = $event"
        @select-chat="selectChat"
        @update:draft="draft = $event"
        @logout="logout"
      />

      <MobileChatLayout
        v-else
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
        @back="mobileChatOpen = false"
        @select-chat="selectChat"
        @set-section="setSection"
        @update:draft="draft = $event"
        @logout="logout"
      />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import DesktopChatLayout from 'components/DesktopChatLayout.vue';
import MobileChatLayout from 'components/MobileChatLayout.vue';
import { useChats } from 'src/composables/useChats';
import { useContacts } from 'src/composables/useContacts';
import { useMediaItems } from 'src/composables/useMediaItems';
import { useMessages } from 'src/composables/useMessages';
import { useAuthStore } from 'src/stores/auth-store';
import type { ChatItem, SectionType } from 'components/chat-ui/types';

const search = ref('');
const draft = ref('');
const activeChatId = ref(1);
const activeSection = ref<SectionType>('chats');
const mobileChatOpen = ref(false);
const $q = useQuasar();
const router = useRouter();
const authStore = useAuthStore();
const isMobile = computed(() => $q.screen.width <= 768);
const { chats } = useChats();
const { contacts } = useContacts();
const { mediaItems } = useMediaItems();
const { messages } = useMessages();

const fallbackChat: ChatItem = {
  id: 0,
  name: 'Unknown Chat',
  initials: '?',
  preview: '',
  time: '',
  outgoing: false,
};

const activeChat = computed<ChatItem>(
  () => chats.value.find((chat) => chat.id === activeChatId.value) ?? fallbackChat,
);

const sidebarPlaceholder = computed(() => {
  if (activeSection.value === 'contacts') return 'Search contacts';
  if (activeSection.value === 'media') return 'Search files and media';
  return 'Search chats';
});

const mobileTitle = computed(() => {
  if (activeSection.value === 'contacts') return 'Contacts';
  if (activeSection.value === 'media') return 'Files & Media';
  return 'Chats';
});

const mobileHeaderTitle = computed(() => {
  if (activeSection.value === 'chats' && mobileChatOpen.value) return activeChat.value.name;
  return mobileTitle.value;
});

function setSection(section: SectionType) {
  activeSection.value = isMobile.value && section === 'account' ? 'chats' : section;
  mobileChatOpen.value = false;
}

watch(isMobile, (mobile) => {
  if (mobile && activeSection.value === 'account') {
    activeSection.value = 'chats';
  }
});

function selectChat(chatId: number) {
  activeChatId.value = chatId;

  if (isMobile.value && activeSection.value === 'chats') {
    mobileChatOpen.value = true;
  }
}

function logout() {
  authStore.clearAuthKey();
  void router.push('/auth');
}
</script>
