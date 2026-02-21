import { ref } from 'vue';

export type AccountProfile = {
  name: string;
  email: string;
  initials: string;
  avatarImage?: string;
};

export type AccountItem = {
  id: number;
  name: string;
  email: string;
  initials: string;
  avatarImage?: string;
  current: boolean;
};

const profile = ref<AccountProfile>({
  name: 'Demo User',
  email: 'demo@textorium.app',
  initials: 'DU',
  avatarImage: '/icons/favicon-128x128.png',
});

const accounts = ref<AccountItem[]>([
  {
    id: 1,
    name: 'Demo User',
    email: 'demo@textorium.app',
    initials: 'DU',
    avatarImage: '/icons/favicon-128x128.png',
    current: true,
  },
  { id: 2, name: 'Work Profile', email: 'work@textorium.app', initials: 'WP', current: false },
]);

function switchAccount(accountId: number) {
  accounts.value = accounts.value.map((account) => ({
    ...account,
    current: account.id === accountId,
  }));

  const selectedAccount = accounts.value.find((account) => account.id === accountId);

  if (selectedAccount) {
    profile.value = {
      name: selectedAccount.name,
      email: selectedAccount.email,
      initials: selectedAccount.initials,
      ...(selectedAccount.avatarImage ? { avatarImage: selectedAccount.avatarImage } : {}),
    };
  }
}

export function useAccounts() {
  return {
    profile,
    accounts,
    switchAccount,
  };
}
