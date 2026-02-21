import { defineBoot } from '#q-app/wrappers';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli-vite/boot-files
export default defineBoot(({ app } /* { app, router, ... } */) => {
  const pinia = createPinia();
  pinia.use(piniaPluginPersistedState);
  app.use(pinia);
});
