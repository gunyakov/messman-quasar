import { defineBoot } from '#q-app/wrappers';
import { createI18n } from 'vue-i18n';
import { useLocaleStore } from 'src/stores/locale';
import { watch } from 'vue';
import messages, { setI18nInstance } from 'src/i18n';

export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-object-type */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-object-type */

export default defineBoot(({ app }) => {
  const i18n = createI18n<{ message: MessageSchema }, MessageLanguages>({
    locale: 'en',
    fallbackLocale: 'en',
    legacy: false,
    messages,
    globalInjection: true, // Allows $t to be used in templates without importing
  });
  const localeStore = useLocaleStore();

  // First load: set i18n locale from Pinia (persisted value)
  //@ts-expect-error no errors, just misstype
  i18n.global.locale.value = localeStore.locale;
  //@ts-expect-error types mistmatch in very complex case. skip type cheking
  setI18nInstance(i18n);
  // Whenever Pinia locale changes → update i18n
  watch(
    () => localeStore.locale,
    (newLocale) => {
      //@ts-expect-error no errors, just misstype
      i18n.global.locale.value = newLocale;
      document.documentElement.lang = newLocale;
    },
  );
  // Set i18n instance on app
  app.use(i18n);
});
