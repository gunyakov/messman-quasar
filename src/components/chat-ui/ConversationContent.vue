<template>
  <div class="column no-wrap fit conversation-content">
    <q-scroll-area class="col bg-grey-2">
      <div class="q-pa-md">
        <div class="row justify-center q-mb-md">
          <q-badge rounded color="grey-5" text-color="dark">Today</q-badge>
        </div>

        <div
          v-for="message in messages"
          :key="message.id"
          class="row q-mb-sm"
          :class="message.outgoing ? 'justify-end' : 'justify-start'"
        >
          <div
            class="tg-bubble q-pa-sm"
            :class="message.outgoing ? 'bg-primary text-white' : 'bg-white text-dark'"
          >
            <div>{{ message.text }}</div>
            <div
              class="text-caption q-mt-xs"
              :class="message.outgoing ? 'text-blue-1' : 'text-grey-7'"
            >
              {{ message.time }}
              <q-icon v-if="message.outgoing" name="done_all" size="14px" class="q-ml-xs" />
            </div>
          </div>
        </div>
      </div>
    </q-scroll-area>

    <q-separator />

    <footer class="row items-center q-pa-sm bg-white q-col-gutter-sm">
      <q-btn
        flat
        round
        dense
        icon="mood"
        class="q-ml-xs"
        :color="showEmoji ? 'primary' : 'grey-7'"
        @click="showEmoji = !showEmoji"
      />
      <q-btn flat round dense icon="attach_file" />

      <div class="col">
        <q-input
          :model-value="draft"
          rounded
          outlined
          dense
          placeholder="Write a message..."
          @update:model-value="emit('update:draft', String($event ?? ''))"
        />
      </div>

      <q-btn round color="primary" class="tg-mic-btn">
        <q-icon name="mic" size="20px" class="tg-mic-icon" />
      </q-btn>
    </footer>

    <DesktopEmojiDrawer v-if="mode === 'desktop'" v-model="showEmoji" @select="appendEmoji" />
    <MobileEmojiPanel v-if="mode === 'mobile' && showEmoji" @select="appendEmoji" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DesktopEmojiDrawer from './emoji/DesktopEmojiDrawer.vue';
import MobileEmojiPanel from './emoji/MobileEmojiPanel.vue';
import type { MessageItem } from './types';

const props = defineProps<{
  messages: MessageItem[];
  draft: string;
  mode: 'desktop' | 'mobile';
}>();

const showEmoji = ref(false);

const emit = defineEmits<{
  'update:draft': [value: string];
}>();

function appendEmoji(emoji: string) {
  emit('update:draft', `${props.draft}${emoji}`);
}
</script>

<style scoped lang="scss">
.conversation-content {
  position: relative;
}

.tg-bubble {
  max-width: min(70%, 560px);
  border-radius: 12px;
}

.tg-mic-btn {
  :deep(.q-btn__content) {
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}

.tg-mic-icon {
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translate(-4px, -2px);
}
</style>
