export interface ICredentials {
  email: string;
  password: string;
  callbackUrl: string;
}

export type StateAdminForm = {
  error?: string | null;
  success?: boolean;
};
