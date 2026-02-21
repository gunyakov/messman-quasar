import { ref } from 'vue';
import type { MediaItem } from 'components/chat-ui/types';

export function useMediaItems() {
  const mediaItems = ref<MediaItem[]>([
    { id: 1, title: 'UI_Concept_v3.png', meta: 'Image • 2.4 MB' },
    { id: 2, title: 'Sprint Notes.pdf', meta: 'Document • 860 KB' },
    { id: 3, title: 'demo-recording.mp4', meta: 'Video • 14.2 MB' },
  ]);

  return { mediaItems };
}
