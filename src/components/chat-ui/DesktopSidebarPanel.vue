<template>
  <aside class="tg-sidebar column no-wrap tg-desktop-only">
    <div v-if="activeSection !== 'account'" class="q-pa-sm">
      <q-input
        :model-value="search"
        dense
        rounded
        outlined
        :placeholder="sidebarPlaceholder"
        bg-color="grey-2"
        @update:model-value="emit('update:search', String($event ?? ''))"
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <q-scroll-area class="col">
      <SectionLists
        v-if="activeSection !== 'account'"
        :active-section="activeSection"
        :chats="chats"
        :contacts="contacts"
        :media-items="mediaItems"
        :active-chat-id="activeChatId"
        variant="desktop"
        @select-chat="emit('select-chat', $event)"
      />

      <AccountSidebarContent v-else @logout="emit('logout')" />
    </q-scroll-area>
  </aside>
</template>

<script setup lang="ts">
import AccountSidebarContent from './AccountSidebarContent.vue';
import SectionLists from './SectionLists.vue';
import type { ChatItem, ContactItem, MediaItem, SectionType } from './types';

defineProps<{
  activeSection: SectionType;
  search: string;
  sidebarPlaceholder: string;
  chats: ChatItem[];
  contacts: ContactItem[];
  mediaItems: MediaItem[];
  activeChatId: number;
}>();

const emit = defineEmits<{
  'update:search': [value: string];
  'select-chat': [chatId: number];
  logout: [];
}>();
</script>

<style scoped lang="scss">
.tg-sidebar {
  width: 420px;
  min-width: 360px;
}

.tg-desktop-only {
  display: flex;
}

@media (max-width: 1023px) {
  .tg-sidebar {
    width: 340px;
    min-width: 300px;
  }
}

@media (max-width: 768px) {
  .tg-desktop-only {
    display: none;
  }
}
</style>
