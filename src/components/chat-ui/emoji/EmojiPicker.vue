<template>
  <div class="emoji-picker column no-wrap">
    <q-tabs
      v-model="activeTab"
      dense
      inline-label
      no-caps
      align="left"
      class="bg-grey-1 text-grey-8"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab
        v-for="category in categories"
        :key="category.key"
        :name="category.key"
        :icon="category.icon"
      />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="activeTab" animated class="col">
      <q-tab-panel
        v-for="category in categories"
        :key="category.key"
        :name="category.key"
        class="q-pa-none"
      >
        <q-scroll-area class="emoji-scroll-area">
          <div class="emoji-grid q-pa-sm">
            <q-btn
              v-for="emoji in category.items"
              :key="`${category.key}-${emoji}`"
              flat
              dense
              class="emoji-btn"
              @click="emit('select', emoji)"
            >
              <span class="emoji-char">{{ emoji }}</span>
            </q-btn>
          </div>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useEmojiCatalog } from 'src/composables/useEmojiCatalog';

const { categories } = useEmojiCatalog();
const activeTab = ref('smileys');

const emit = defineEmits<{
  select: [emoji: string];
}>();
</script>

<style scoped lang="scss">
.emoji-picker {
  height: 100%;
}

.emoji-scroll-area {
  height: 100%;
}

.emoji-grid {
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  gap: 4px;
}

.emoji-btn {
  min-height: 34px;
}

.emoji-char {
  font-size: 20px;
  line-height: 1;
}

@media (max-width: 768px) {
  .emoji-grid {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
}
</style>
