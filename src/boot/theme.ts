import { defineBoot } from '#q-app/wrappers';
import { Dark } from 'quasar';
import { THEME_MODE_KEY } from 'src/composables/useThemeMode';

export default defineBoot(() => {
  if (typeof localStorage === 'undefined') return;

  const storedThemeMode = localStorage.getItem(THEME_MODE_KEY);

  if (storedThemeMode === 'dark') {
    Dark.set(true);
    return;
  }

  if (storedThemeMode === 'light') {
    Dark.set(false);
  }
});
