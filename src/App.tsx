import { lazy, Suspense, useMemo, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Hero } from './components/sections/Hero';
import { GlobalStyles } from './styles/GlobalStyles';
import { ThemeProvider } from '@emotion/react';
import { getThemeValues, theme, type ThemeMode } from './styles/theme';
import styled from '@emotion/styled';

// Lazy load non-critical components
const Projects = lazy(() => import('./components/sections/Projects'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading fallback component
const LoadingFallback = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  color: ${theme.colors.accent};
  font-size: 1.2rem;
  
  @media print {
    display: none;
  }
`;

const THEME_STORAGE_KEY = 'portfolio-theme-mode';

const getInitialThemeMode = (): ThemeMode => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  try {
    const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedMode === 'dark' || storedMode === 'light') {
      return storedMode;
    }
  } catch {
    // Ignore storage errors and fall back to system preference.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

function App() {
  const [mode, setMode] = useState<ThemeMode>(getInitialThemeMode);
  const themeValues = useMemo(() => getThemeValues(mode), [mode]);

  const handleToggleTheme = () => {
    setMode((currentMode) => {
      const nextMode: ThemeMode = currentMode === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextMode);
      } catch {
        // Ignore storage errors to keep toggle interaction working.
      }
      return nextMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles themeValues={themeValues} />
      <Layout mode={mode} onToggleTheme={handleToggleTheme}>
        {/* Hero section is critical for LCP, so keep it eager loaded */}
        <Hero />
        
        {/* Wrap non-critical sections in Suspense */}
        <Suspense fallback={<LoadingFallback>Loading projects...</LoadingFallback>}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingFallback>Loading skills...</LoadingFallback>}>
          <Skills />
        </Suspense>
        <Suspense fallback={<LoadingFallback>Loading contact...</LoadingFallback>}>
          <Contact />
        </Suspense>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
