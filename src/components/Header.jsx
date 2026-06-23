import React, { useState, useEffect } from 'react';
import { Scale, Phone, Mail, Clock, Menu, X, ShieldAlert } from 'lucide-react';

export default function Header({ currentView, setView, openConsultation }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let rafId = null;
    const handleScroll = () => {
      if (rafId) return; // already queued
      rafId = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 40);
        rafId = null;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { view: 'home', label: 'Home' },
    { view: 'about', label: 'About Us' },
    { view: 'services', label: 'Practice Areas' },
    { view: 'international', label: 'International Services' },
    { view: 'blog', label: 'Publications' },
    { view: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (viewName) => {
    setView(viewName);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/*
      <div className="top-utility-bar" style={styles.utilityBar}>
        <div className="container" style={styles.utilityContainer}>
          <div style={styles.utilityGroup}>
            <span style={styles.utilityItem}>
              <Phone size={14} style={styles.utilityIcon} />
              <a href="tel:+94112345678" style={styles.utilityLink}>+94 11 234 5678</a>
            </span>
            <span style={styles.utilityItem}>
              <Mail size={14} style={styles.utilityIcon} />
              <a href="mailto:info@voharalegal.lk" style={styles.utilityLink}>info@voharalegal.lk</a>
            </span>
          </div>
          <div style={styles.utilityGroup}>
            <span style={styles.utilityItem}>
              <Clock size={14} style={styles.utilityIcon} />
              <span>Mon - Fri: 9:00 AM - 5:00 PM (SLT)</span>
            </span>
          </div>
        </div>
      </div>*/}
      {/* Main Navigation Header */}
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`} style={{
        ...styles.header,
        boxShadow: isScrolled ? 'var(--shadow-md)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--silver-medium)' : '1px solid rgba(212,175,106,0.2)',
        backgroundColor: isScrolled ? 'rgba(255,255,255,0.97)' : 'var(--white)',
      }}>
        <div className="container" style={styles.headerContainer}>
          {/* Brand Logo */}
          <div style={styles.logo} onClick={() => handleNavClick('home')}>
            <div style={styles.logoIconBg}>
              <Scale size={24} style={styles.logoIcon} />
            </div>
            <div style={styles.logoTextGroup}>
              <span style={styles.logoMain}>VOHARA LEGAL</span>
              <span style={styles.logoSub}>TRADITION • INTEGRITY • EXCELLENCE</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" style={styles.desktopNav}>
            {navLinks.map((link) => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                style={{
                  ...styles.navLink,
                  color: currentView === link.view ? 'var(--brand-blue)' : 'var(--text-dark)',
                  fontWeight: currentView === link.view ? '700' : '500',
                  borderBottomColor: currentView === link.view ? 'var(--brand-blue)' : 'transparent',
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="header-actions" style={styles.headerActions}>
            <button className="btn btn-primary btn-sm" onClick={openConsultation}>
              Free Consultation
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            style={styles.mobileMenuToggle}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div style={styles.mobileMenu}>
            <div className="container" style={styles.mobileMenuContainer}>
              {navLinks.map((link) => (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  style={{
                    ...styles.mobileNavLink,
                    color: currentView === link.view ? 'var(--brand-blue)' : 'var(--text-dark)',
                    backgroundColor: currentView === link.view ? 'var(--soft-blue)' : 'transparent',
                  }}
                >
                  {link.label}
                </button>
              ))}
              <div style={styles.mobileActions}>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openConsultation();
                  }}
                >
                  Free Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

const styles = {
  utilityBar: {
    backgroundColor: 'var(--primary-blue)',
    color: 'var(--silver-light)',
    padding: '0.4rem 0',
    fontSize: '0.75rem',
    fontFamily: 'var(--font-primary)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  utilityContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  utilityGroup: {
    display: 'flex',
    gap: '1.25rem',
    alignItems: 'center',
  },
  utilityItem: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
  },
  utilityIcon: {
    color: 'var(--silver-dark)',
  },
  utilityLink: {
    color: 'inherit',
    transition: 'var(--transition-fast)',
  },
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    willChange: 'box-shadow, background-color, border-color',
    transform: 'translateZ(0)',
    transition: 'box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease',
  },
  headerContainer: {
    height: '76px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    cursor: 'pointer',
    userSelect: 'none',
  },
  logoIconBg: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'var(--primary-blue)',
    backgroundImage: 'var(--silver-metallic)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow-sm)',
  },
  logoIcon: {
    color: 'var(--primary-blue)',
  },
  logoTextGroup: {
    display: 'flex',
    flexDirection: 'column',
    lineHeight: '1.1',
  },
  logoMain: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '1.35rem',
    letterSpacing: '0.05em',
    color: 'var(--primary-blue)',
  },
  logoSub: {
    fontSize: '0.625rem',
    fontWeight: '700',
    letterSpacing: '0.15em',
    color: 'var(--silver-dark)',
  },
  desktopNav: {
    display: 'none',
    gap: '1.5rem',
    height: '100%',
  },
  navLink: {
    background: 'none',
    border: 'none',
    borderBottom: '3px solid transparent',
    padding: '0 0.25rem',
    height: '100%',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontFamily: 'var(--font-primary)',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'var(--transition-fast)',
  },
  headerActions: {
    display: 'none',
    alignItems: 'center',
    gap: '1rem',
  },
  portalBtn: {
    background: 'none',
    border: '1px solid',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.5rem 1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  portalBtnHover: {
    backgroundColor: 'var(--soft-blue)',
  },
  mobileMenuToggle: {
    background: 'none',
    border: 'none',
    color: 'var(--primary-blue)',
    cursor: 'pointer',
    display: 'block',
  },
  mobileMenu: {
    position: 'absolute',
    top: '76px',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--white)',
    borderBottom: '2px solid var(--silver-medium)',
    boxShadow: 'var(--shadow-lg)',
    paddingTop: '1rem',
    paddingBottom: '1.5rem',
    zIndex: 999,
  },
  mobileMenuContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  mobileNavLink: {
    background: 'none',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius-md)',
    textAlign: 'left',
    width: '100%',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  mobileActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--silver-medium)',
  },
  mobilePortalBtn: {
    background: 'none',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.75rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    width: '100%',
    cursor: 'pointer',
    textAlign: 'center',
  },
};

// media query styling helpers for responsive display (handled inside react component lifecycle/inline triggers or standard css)
// We will write media overrides for these styles in a small style tag or in index.css so they trigger correctly on desktop.
// Let's add header responsive classes in index.css!
const styleTag = `
@media (min-width: 992px) {
  .desktop-nav {
    display: flex !important;
  }
  .header-actions {
    display: flex !important;
  }
  .main-header button[aria-label="Toggle menu"] {
    display: none !important;
  }
}
`;
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = styleTag;
  document.head.appendChild(styleEl);
}
