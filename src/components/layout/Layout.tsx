import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';
import { theme, type ThemeMode } from '../../styles/theme';
import { FloatingNav } from '../navigation/FloatingNav';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { FaMoon, FaSun } from 'react-icons/fa';
import BasicMenu, { CvFile } from '../Menu';

const CV_BASE = '/cv/Christopher Smith - CV';

const cvFiles: CvFile[] = [
  {
    label: '.pdf',
    downloadUrl: `${CV_BASE}.pdf`,
    downloadName: 'chris-smith-cv.pdf',
    viewUrl: `${CV_BASE}.pdf`,
  },
  {
    label: '.docx',
    downloadUrl: `${CV_BASE}.docx`,
    downloadName: 'chris-smith-cv.docx',
    viewUrl: `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
      `${window.location.origin}${CV_BASE}.docx`
    )}`,
  },
  {
    label: '.md',
    downloadUrl: `${CV_BASE}.md`,
    downloadName: 'chris-smith-cv.md',
    viewUrl: `${CV_BASE}.html`,
  },
  {
    label: 'LaTeX',
    downloadUrl: `${CV_BASE}.tex`,
    downloadName: 'chris-smith-cv.tex',
    viewUrl: `${CV_BASE}.pdf`,
  },
];
interface LayoutProps {
  children: ReactNode;
  mode: ThemeMode;
  onToggleTheme: () => void;
}

const LayoutWrapper = styled.div`
  @media print {
    background: white !important;
    color: black !important;
    
    * {
      color: black !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }

    section {
      min-height: auto !important;
      padding: 2rem 0 !important;
      page-break-inside: avoid;
    }

    a[href]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
    }
  }

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: transparent;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 70% 30%,
      ${theme.colors.accent}15 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  padding: ${theme.spacing.md} 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media print {
    display: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, ${theme.colors.glass.background}, transparent);
  }
`;

const Nav = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${theme.spacing.md};
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
  }
`;

const Logo = styled(motion.div)`
  color: ${theme.colors.light};
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  a {
    color: ${theme.colors.textLight};
    transition: all ${theme.transitions.default};
    font-weight: 500;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 4px;

    &:hover {
      color: ${theme.colors.light};
      background-color: ${theme.colors.overlay.light};
    }
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.md};
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (max-width: ${theme.breakpoints.sm}) {
    gap: ${theme.spacing.sm};
  }
`;

const ThemeToggle = styled.button`
  border: 1px solid ${theme.colors.surfaceBorder};
  background: ${theme.colors.gradient.glass};
  color: ${theme.colors.textLight};
  border-radius: 999px;
  min-width: 66px;
  height: 34px;
  padding: 0 ${theme.spacing.xs};
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  transition: all ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      ${theme.colors.overlay.light},
      transparent 65%
    );
    opacity: 0.6;
    pointer-events: none;
  }

  &:hover {
    background: ${theme.colors.gradient.glass};
    color: ${theme.colors.light};
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${theme.colors.shadow.ringSoft}, ${theme.colors.shadow.ringStrong};
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    min-width: 58px;
    height: 30px;
  }
`;

const ToggleThumb = styled.span`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  font-size: 0.85rem;
  box-shadow: ${theme.colors.shadow.accentSoft};
  transition: box-shadow 0.3s ease, background 0.3s ease;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.sm}) {
    width: 20px;
    height: 20px;
    font-size: 0.75rem;
  }
`;

const ToggleThumbMotion = motion(ToggleThumb);
const ToggleIconMotion = motion.span;

const Main = styled.main`
  flex: 1;
  margin-top: 4.5rem;
  width: 100%;
  overflow-x: hidden;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm};
  z-index: 9999;
  transition: top 0.2s;

  &:focus {
    top: 0;
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;
  text-align: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, ${theme.colors.glass.background}, transparent);
  }
`;

export const Layout = ({ children, mode, onToggleTheme }: LayoutProps) => {
  useKeyboardNavigation();

  useEffect(() => {
    // Add keyboard navigation instructions to console
    console.info(
      'Keyboard Navigation:\n',
      '- Arrow Up/Down or PageUp/PageDown: Navigate between sections\n',
      '- Home: Go to top\n',
      '- End: Go to bottom'
    );
  }, []);

  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>

      <Header role="banner">
        <Nav role="navigation" aria-label="Main navigation">
          <div className="container">
            <Logo
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              role="heading"
              aria-level={1}
            >
              Portfolio <span style={{ fontWeight: 400 }}>|</span>&nbsp;
              {/* <a href="#">CV</a> */}
              <BasicMenu label="CV" files={cvFiles} />
            </Logo>
            <NavActions>
              <NavLinks role="list">
                <a href="#home" role="listitem" aria-label="Home section">Home</a>
                <a href="#projects" role="listitem" aria-label="Projects section">Projects</a>
                <a href="#skills" role="listitem" aria-label="Skills section">Skills</a>
                <a href="#contact" role="listitem" aria-label="Contact section">Contact</a>
              </NavLinks>
              <ThemeToggle
                type="button"
                onClick={onToggleTheme}
                aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-pressed={mode === 'light'}
              >
                <ToggleThumbMotion
                  aria-hidden="true"
                  initial={false}
                  animate={{ x: mode === 'dark' ? 30 : 0 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
                >
                  <ToggleIconMotion
                    key={mode}
                    initial={{ rotate: mode === 'light' ? -18 : 18, scale: 0.86, opacity: 0.6 }}
                    animate={{ rotate: 0, scale: 1, opacity: 1 }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                  >
                    {mode === 'dark' ? <FaMoon /> : <FaSun />}
                  </ToggleIconMotion>
                </ToggleThumbMotion>
              </ThemeToggle>
            </NavActions>
          </div>
        </Nav>
      </Header>
      <Main id="main-content" role="main" tabIndex={-1}>
        {children}
      </Main>
      <FloatingNav />
      <Footer role="contentinfo">
        <div className="container">
          <p>© {new Date().getFullYear()} Chris Smith. All rights reserved.</p>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};
