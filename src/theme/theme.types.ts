export interface Theme {
  color: {
    background: string;
    textPrimary: string;
    textSecondary: string;
    buttonBackground: string;
    buttonText: string;
  };
}

export type StyleFactory<T> = (theme: Theme) => T;
