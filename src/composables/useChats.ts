import { ref } from 'vue';
import type { ChatItem } from 'components/chat-ui/types';

function truncatePreview(text: string, maxLength = 30): string {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 3).trimEnd()}...`;
}

export function useChats() {
  const chats = ref<ChatItem[]>([
    {
      id: 1,
      name: 'Design Team',
      initials: 'DT',
      preview: truncatePreview('Let’s keep this sidebar close to Telegram desktop.'),
      time: '09:41',
      unread: 2,
      outgoing: false,
    },
    {
      id: 2,
      name: 'Anton K.',
      initials: 'AK',
      preview: truncatePreview('Perfect, I will send final assets in 10 min.'),
      time: '08:12',
      outgoing: true,
      read: true,
    },
    {
      id: 3,
      name: 'Frontend Squad',
      initials: 'FS',
      preview: truncatePreview('No backend today, only static UI sample 👍'),
      time: 'Yesterday',
      outgoing: false,
    },
    {
      id: 4,
      name: 'Mila',
      initials: 'M',
      preview: truncatePreview('Can we switch to dark mode later?'),
      time: 'Wed',
      outgoing: false,
    },
  ]);

  return { chats };
}
