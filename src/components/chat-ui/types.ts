export type ChatItem = {
  id: number;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread?: number;
  outgoing?: boolean;
  read?: boolean;
};

export type MessageItem = {
  id: number;
  text: string;
  time: string;
  outgoing: boolean;
};

export type ContactItem = {
  id: number;
  name: string;
  initials: string;
  status: string;
};

export type MediaItem = {
  id: number;
  title: string;
  meta: string;
};

export type SectionType = 'chats' | 'contacts' | 'media' | 'account';
