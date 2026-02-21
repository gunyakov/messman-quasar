import { ref } from 'vue';
import type { MessageItem } from 'components/chat-ui/types';

export function useMessages() {
  const messages = ref<MessageItem[]>([
    {
      id: 1,
      text: 'Can you adapt Telegram desktop vibe to Quasar?',
      time: '09:10',
      outgoing: false,
    },
    {
      id: 2,
      text: 'Yes, I am building a static UI shell first, no API.',
      time: '09:12',
      outgoing: true,
    },
    {
      id: 3,
      text: 'Great. Keep the chat list and message composer very similar.',
      time: '09:16',
      outgoing: false,
    },
    {
      id: 4,
      text: 'Done. Next step can be wiring real data and interactions.',
      time: '09:21',
      outgoing: true,
    },
  ]);

  return { messages };
}
