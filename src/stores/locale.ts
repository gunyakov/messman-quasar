import { defineStore } from 'pinia';

export type SupportedLocale = 'en-US' | 'ru' | 'bg';

export const useLocaleStore = defineStore('locale', {
  state: () => ({
    locale: 'en-US' as SupportedLocale,
  }),

  actions: {
    setLocale(newLocale: SupportedLocale) {
      this.locale = newLocale;
    },
  },

  persist: true, // This enables persistence (localStorage by default
});
// Export the type of the store instance
export type LocaleStore = ReturnType<typeof useLocaleStore>;
