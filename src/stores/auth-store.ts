import { defineStore } from 'pinia';
import API from 'src/api/API';
import Alerts from 'src/helpers/alerts';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authKey: '',
  }),

  getters: {
    isAuthorized: (state) => state.authKey.trim().length > 0,
  },

  actions: {
    setAuthKey(value: string) {
      this.authKey = value;
    },

    clearAuthKey() {
      this.authKey = '';
    },

    async login(payload: { email: string; password: string }) {
      Alerts.showLoading('auth.feedback.loading_login');

      try {
        const response = await API.login(payload);
        this.setAuthKey(response.authKey);
        return true;
      } catch {
        Alerts.error('auth.feedback.login_failed');
        return false;
      } finally {
        Alerts.hideLoading();
      }
    },

    async register(payload: { name: string; email: string; password: string }) {
      Alerts.showLoading('auth.feedback.loading_register');

      try {
        const response = await API.register(payload);
        this.setAuthKey(response.authKey);
        return true;
      } catch {
        Alerts.error('auth.feedback.register_failed');
        return false;
      } finally {
        Alerts.hideLoading();
      }
    },
  },

  persist: true,
});

export type AuthStore = ReturnType<typeof useAuthStore>;
