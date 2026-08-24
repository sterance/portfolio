export type ThemeMode = 'dark' | 'light';

const baseTheme = {
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    default: '0.2s ease',
  },
};

export const theme = {
  ...baseTheme,
  colors: {
    primary: 'var(--color-primary)',
    secondary: 'var(--color-secondary)',
    accent: 'var(--color-accent)',
    light: 'var(--color-light)',
    text: 'var(--color-text)',
    textLight: 'var(--color-text-light)',
    textDark: 'var(--color-text-dark)',
    textMuted: 'var(--color-text-muted)',
    surfaceBorder: 'var(--color-surface-border)',
    navDotInactive: 'var(--color-nav-dot-inactive)',
    navDotBorder: 'var(--color-nav-dot-border)',
    glass: {
      background: 'var(--glass-background)',
      border: 'var(--glass-border)',
      card: 'var(--glass-card)',
      floating: 'var(--glass-floating)',
    },
    gradient: {
      main: 'var(--gradient-main)',
      accent: 'var(--gradient-accent)',
      glass: 'var(--gradient-glass)',
    },
    overlay: {
      light: 'var(--overlay-light)',
      dark: 'var(--overlay-dark)',
    },
    shadow: {
      panel: 'var(--shadow-panel)',
      ringSoft: 'var(--shadow-ring-soft)',
      ringStrong: 'var(--shadow-ring-strong)',
      accentSoft: 'var(--shadow-accent-soft)',
      accentMedium: 'var(--shadow-accent-medium)',
    },
  },
};

const themeValues = {
  dark: {
    mode: 'dark' as ThemeMode,
    colors: {
      primary: '#2f3d45',
      secondary: '#52796f',
      accent: '#83a78b',
      light: '#c8d0c3',
      text: '#ffffff',
      textLight: '#ffffff',
      textDark: '#1a2226',
      textMuted: 'rgba(255, 255, 255, 0.75)',
      surfaceBorder: 'rgba(255, 255, 255, 0.08)',
      navDotInactive: 'rgba(255, 255, 255, 0.3)',
      navDotBorder: 'rgba(255, 255, 255, 0.5)',
      glass: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'transparent',
        card: 'rgba(47, 61, 69, 0.2)',
        floating: 'rgba(20, 26, 30, 0.72)',
      },
      gradient: {
        main: 'linear-gradient(135deg, #2f3d45 0%, #41595a 50%, #2f3d45 100%)',
        accent: 'linear-gradient(135deg, #c8d0c3 0%, #83a78b 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      overlay: {
        light: 'rgba(255, 255, 255, 0.1)',
        dark: 'rgba(47, 61, 69, 0.3)',
      },
      shadow: {
        panel: '0 4px 24px rgba(0, 0, 0, 0.2)',
        ringSoft: '0 0 0 2px rgba(131, 167, 139, 0.25)',
        ringStrong: '0 0 0 4px rgba(131, 167, 139, 0.12)',
        accentSoft: '0 4px 12px rgba(131, 167, 139, 0.12)',
        accentMedium: '0 8px 30px rgba(131, 167, 139, 0.18)',
      },
    },
  },
  light: {
    mode: 'light' as ThemeMode,
    colors: {
      primary: '#273239',
      secondary: '#52796f',
      accent: '#516856',
      light: '#2d392f',
      text: '#212b26',
      textLight: '#28332e',
      textDark: '#141b17',
      textMuted: 'rgba(33, 43, 38, 0.78)',
      surfaceBorder: 'rgba(33, 43, 38, 0.14)',
      navDotInactive: 'rgba(33, 43, 38, 0.32)',
      navDotBorder: 'rgba(33, 43, 38, 0.44)',
      glass: {
        background: 'rgba(255, 255, 255, 0.78)',
        border: 'rgba(33, 43, 38, 0.12)',
        card: 'rgba(228, 233, 225, 0.95)',
        floating: 'rgba(249, 251, 248, 0.92)',
      },
      gradient: {
        main: 'linear-gradient(135deg, #eef1ec 0%, #f5f3ee 55%, #e8eee9 100%)',
        accent: 'linear-gradient(135deg, #6f8f77 0%, #516856 100%)',
        glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(233, 238, 231, 0.9) 100%)',
      },
      overlay: {
        light: 'rgba(255, 255, 255, 0.38)',
        dark: 'rgba(33, 43, 38, 0.18)',
      },
      shadow: {
        panel: '0 10px 28px rgba(30, 42, 35, 0.16)',
        ringSoft: '0 0 0 2px rgba(81, 104, 86, 0.3)',
        ringStrong: '0 0 0 4px rgba(81, 104, 86, 0.14)',
        accentSoft: '0 4px 12px rgba(81, 104, 86, 0.18)',
        accentMedium: '0 8px 30px rgba(81, 104, 86, 0.22)',
      },
    },
  },
};

export const getThemeValues = (mode: ThemeMode) => themeValues[mode];

export type Theme = typeof theme;
export type ThemeValues = ReturnType<typeof getThemeValues>;
