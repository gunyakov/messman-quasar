<template>
  <q-page class="auth-page flex flex-center bg-grey-2">
    <q-card flat bordered class="auth-card">
      <q-card-section class="q-pb-none">
        <div class="text-h6 text-weight-medium">{{ $t('auth.title') }}</div>
        <div class="text-caption text-grey-7">{{ $t('auth.subtitle') }}</div>

        <q-select
          v-model="selectedLocale"
          dense
          outlined
          emit-value
          map-options
          class="q-mt-md"
          :label="$t('auth.language.label')"
          :options="localeOptions"
        />
      </q-card-section>

      <q-tabs
        v-model="activeTab"
        dense
        align="left"
        no-caps
        active-color="primary"
        indicator-color="primary"
        class="q-px-md q-pt-sm q-mt-md"
      >
        <q-tab name="login" :label="$t('auth.tabs.login')" />
        <q-tab name="register" :label="$t('auth.tabs.register')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="login" class="q-pa-md">
          <q-form class="q-gutter-sm" @submit.prevent="onLoginSubmit">
            <q-input
              v-model="loginForm.email"
              type="email"
              outlined
              dense
              :label="$t('auth.fields.email')"
            />
            <q-input
              v-model="loginForm.password"
              type="password"
              outlined
              dense
              :label="$t('auth.fields.password')"
            />
            <q-btn
              type="submit"
              color="primary"
              class="full-width"
              :label="$t('auth.actions.sign_in')"
            />
          </q-form>
        </q-tab-panel>

        <q-tab-panel name="register" class="q-pa-md">
          <q-form class="q-gutter-sm" @submit.prevent="onRegisterSubmit">
            <q-input v-model="registerForm.name" outlined dense :label="$t('auth.fields.name')" />
            <q-input
              v-model="registerForm.email"
              type="email"
              outlined
              dense
              :label="$t('auth.fields.email')"
            />
            <q-input
              v-model="registerForm.password"
              type="password"
              outlined
              dense
              :label="$t('auth.fields.password')"
            />
            <q-btn
              type="submit"
              color="primary"
              class="full-width"
              :label="$t('auth.actions.create_account')"
            />
          </q-form>
        </q-tab-panel>
      </q-tab-panels>

      <q-separator />

      <q-card-actions align="between" class="q-px-md q-pb-md">
        <q-btn flat color="grey-8" :label="$t('auth.actions.back_to_chat')" @click="goToChat" />
        <q-btn flat color="primary" :label="$t('auth.actions.demo_mode')" @click="goToChat" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from 'src/stores/auth-store';
import { useLocaleStore, type SupportedLocale } from 'src/stores/locale';

const router = useRouter();
const { t } = useI18n();
const authStore = useAuthStore();
const localeStore = useLocaleStore();
const activeTab = ref<'login' | 'register'>('login');

const localeOptions = computed(() => [
  { label: t('locale.en_US'), value: 'en-US' as SupportedLocale },
  { label: t('locale.ru'), value: 'ru' as SupportedLocale },
  { label: t('locale.bg'), value: 'bg' as SupportedLocale },
]);

const selectedLocale = computed<SupportedLocale>({
  get: () => localeStore.locale,
  set: (value) => localeStore.setLocale(value),
});

const loginForm = ref({
  email: '',
  password: '',
});

const registerForm = ref({
  name: '',
  email: '',
  password: '',
});

function goToChat() {
  void router.push('/');
}

async function onLoginSubmit() {
  const success = await authStore.login(loginForm.value);

  if (success) {
    void router.push('/');
  }
}

async function onRegisterSubmit() {
  const success = await authStore.register(registerForm.value);

  if (success) {
    void router.push('/');
  }
}
</script>

<style scoped lang="scss">
.auth-page {
  min-height: 100dvh;
}

.auth-card {
  width: min(420px, calc(100vw - 24px));
}
</style>
