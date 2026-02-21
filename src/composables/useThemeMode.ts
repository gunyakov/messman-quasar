import { computed } from 'vue';
import { useQuasar } from 'quasar';

const THEME_MODE_KEY = 'textorium-theme-mode';

function persistThemeMode(isDark: boolean) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(THEME_MODE_KEY, isDark ? 'dark' : 'light');
}

export function useThemeMode() {
  const $q = useQuasar();

  const isDark = computed(() => $q.dark.isActive);

  function setThemeMode(isDarkMode: boolean) {
    $q.dark.set(isDarkMode);
    persistThemeMode(isDarkMode);
  }

  function toggleThemeMode() {
    setThemeMode(!$q.dark.isActive);
  }

  return {
    isDark,
    setThemeMode,
    toggleThemeMode,
  };
}

export { THEME_MODE_KEY };
