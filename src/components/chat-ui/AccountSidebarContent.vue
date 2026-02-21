<template>
  <div class="column no-wrap fit">
    <div class="tg-sidebar-profile q-pa-md bg-grey-2">
      <div class="tg-sidebar-profile-top row items-start justify-between">
        <q-avatar size="56px" color="primary" text-color="white">
          <img v-if="profile.avatarImage" :src="profile.avatarImage" :alt="profile.name" />
          <template v-else>{{ profile.initials }}</template>
        </q-avatar>

        <q-btn
          flat
          round
          dense
          :icon="isDark ? 'light_mode' : 'dark_mode'"
          @click="toggleThemeMode"
        >
          <q-tooltip>
            {{
              isDark ? $t('common.theme.switch_to_light') : $t('common.theme.switch_to_dark')
            }}
          </q-tooltip>
        </q-btn>
      </div>
      <div class="text-subtitle1 text-weight-medium q-mt-sm">{{ profile.name }}</div>
      <div class="text-caption text-grey-7">{{ profile.email }}</div>
    </div>

    <q-list>
      <q-item
        v-for="account in accounts"
        :key="account.id"
        clickable
        @click="switchAccount(account.id)"
      >
        <q-item-section avatar>
          <div class="tg-account-avatar-wrap">
            <q-avatar color="primary" text-color="white">
              <img v-if="account.avatarImage" :src="account.avatarImage" :alt="account.name" />
              <template v-else>{{ account.initials }}</template>
            </q-avatar>
            <q-badge v-if="account.current" rounded color="positive" class="tg-current-account-dot">
              <q-icon name="check" size="10px" color="white" />
            </q-badge>
          </div>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ account.name }}</q-item-label>
          <q-item-label caption>{{ account.email }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="person_add" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Add account</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-separator />

    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon name="settings" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Settings</q-item-label>
        </q-item-section>
      </q-item>

      <q-item clickable @click="emit('logout')">
        <q-item-section avatar>
          <q-icon name="logout" color="negative" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-negative">Logout</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { useAccounts } from 'src/composables/useAccounts';
import { useThemeMode } from 'src/composables/useThemeMode';

const emit = defineEmits<{
  logout: [];
}>();

const { profile, accounts, switchAccount } = useAccounts();
const { isDark, toggleThemeMode } = useThemeMode();
</script>

<style scoped lang="scss">
.tg-sidebar-profile {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.tg-account-avatar-wrap {
  position: relative;
  display: inline-flex;
}

.tg-current-account-dot {
  position: absolute;
  right: -2px;
  bottom: -1px;
  min-width: 14px;
  width: 14px;
  height: 14px;
  padding: 0;
  border: 2px solid white;
}
</style>
