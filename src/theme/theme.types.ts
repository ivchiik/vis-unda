export interface Theme {
  color: {
    white: string;
    gray100: string;
    gray200: string;
    blue100: string;
    blue200: string;
    blue300: string;
    blue400: string;
    blue500: string;
    blue600: string;
    blue700: string;
    blue800: string;
    purple100: string;
    yellow100: string;
    yellow200: string;
    brown100: string;
    green100: string;
    green200: string;
    red100: string;
    red200: string;
    blueAlpha30: string;
    blueAlpha82: string;
  };
}

export type StyleFactory<T> = (theme: Theme) => T;
