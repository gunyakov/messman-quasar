const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const randomInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const isAdminCredentials = (email: string, password: string) =>
  email.trim().toLowerCase() === 'admin@admin.com' && password === 'admin';

const shouldFailRequest = (email: string) => {
  if (email.toLowerCase().includes('fail')) {
    return true;
  }

  return Math.random() < 0.3;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  authKey: string;
};

export default class API {
  static async login(payload: LoginPayload): Promise<AuthResponse> {
    await delay(randomInRange(900, 1700));

    if (isAdminCredentials(payload.email, payload.password)) {
      return {
        authKey: 'auth_admin',
      };
    }

    if (shouldFailRequest(payload.email)) {
      throw new Error('LOGIN_FAILED');
    }

    return {
      authKey: `auth_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    };
  }

  static async register(payload: RegisterPayload): Promise<AuthResponse> {
    await delay(randomInRange(1200, 2200));

    if (shouldFailRequest(payload.email)) {
      throw new Error('REGISTER_FAILED');
    }

    return {
      authKey: `auth_${payload.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
    };
  }
}
