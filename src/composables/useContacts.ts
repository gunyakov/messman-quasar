import { ref } from 'vue';
import type { ContactItem } from 'components/chat-ui/types';

export function useContacts() {
  const contacts = ref<ContactItem[]>([
    { id: 1, name: 'Anton K.', initials: 'AK', status: 'online' },
    { id: 2, name: 'Mila', initials: 'M', status: 'last seen 12 min ago' },
    { id: 3, name: 'Design Team', initials: 'DT', status: 'group • 7 members' },
  ]);

  return { contacts };
}
