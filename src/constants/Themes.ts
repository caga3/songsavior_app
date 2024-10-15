// theme.ts
interface Theme {
  dark: boolean;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
    notification: string;
  };
}

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#fdf15d',
    background: '#131314',
    card: '#1e1e1f',
    text: '#ffffff',
    border: '#1e1e1f',
    notification: '#131314',
  },
};
