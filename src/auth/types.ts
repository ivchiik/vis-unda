export interface AuthUser {
  uid: string;
  displayName: string | null;
  email: string | null;
}

export type AuthAction = "google" | "apple" | "signOut";
