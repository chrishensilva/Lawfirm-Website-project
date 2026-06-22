import React, { useState } from 'react';
import { Scale, Mail, Phone, MapPin, Send } from 'lucide-react';
import { api } from '../services/api';

export default function Footer({ setView }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const response = await api.subscribeToNewsletter(email);
      if (response.success) {
        setStatus({ type: 'success', message: 'Successfully subscribed!' });
        setEmail('');
      }
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Subscription failed.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleNavClick = (viewName) => {
    setView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      {/* Top Footer Section */}
      <div className="container" style={styles.topSection}>
        <div style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.colBrand}>
            <div style={styles.logo} onClick={() => handleNavClick('home')}>
              <div style={styles.logoIconBg}>
                <Scale size={20} style={styles.logoIcon} />
              </div>
              <span style={styles.logoText}>VOHARA LEGAL</span>
            </div>
            <p style={styles.brandDesc}>
              Colombo-based law practice providing trusted civil, commercial, and property services with professionalism, discretion, and care.
            </p>
            <div style={styles.socials}>
              <a href="#" aria-label="Facebook" style={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" style={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" style={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.colLinks}>
            <h4 style={styles.heading}>Explore</h4>
            <ul style={styles.linkList}>
              <li><button onClick={() => handleNavClick('home')} style={styles.linkBtn}>Home</button></li>
              <li><button onClick={() => handleNavClick('about')} style={styles.linkBtn}>About Us</button></li>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Practice Areas</button></li>
              <li><button onClick={() => handleNavClick('international')} style={styles.linkBtn}>International Services</button></li>
              <li><button onClick={() => handleNavClick('team')} style={styles.linkBtn}>Our People</button></li>
              <li><button onClick={() => handleNavClick('blog')} style={styles.linkBtn}>Publications</button></li>
              <li><button onClick={() => handleNavClick('contact')} style={styles.linkBtn}>Contact Us</button></li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div style={styles.colLinks}>
            <h4 style={styles.heading}>Services</h4>
            <ul style={styles.linkList}>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Civil & Commercial Law</button></li>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Property & Conveyancing</button></li>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Corporate & Business Law</button></li>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Dispute Resolution</button></li>
              <li><button onClick={() => handleNavClick('services')} style={styles.linkBtn}>Notarial & Documentation</button></li>
            </ul>
          </div>

          {/* Newsletter Intake */}
          <div style={styles.colNewsletter}>
            <h4 style={styles.heading}>Stay Informed</h4>
            <p style={styles.newsletterDesc}>
              Subscribe to Vohara Insights for monthly updates on Sri Lankan commercial, property, and civil law guidelines.
            </p>
            <form onSubmit={handleSubscribe} style={styles.form}>
              <div style={styles.inputContainer}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.input}
                />
                <button 
                  type="submit" 
                  disabled={submitting} 
                  style={styles.subscribeBtn}
                  aria-label="Submit subscription"
                >
                  <Send size={16} />
                </button>
              </div>
              {status.message && (
                <div style={{
                  ...styles.statusText,
                  color: status.type === 'success' ? '#10B981' : '#EF4444'
                }}>
                  {status.message}
                </div>
              )}
            </form>
            <div style={styles.contactDetails}>
              <div style={styles.contactItem}>
                <MapPin size={16} style={styles.contactIcon} />
                <span style={styles.contactText}>No. 45, Flower Road, Colombo 00700, Sri Lanka</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div style={styles.bottomSection}>
        <div className="container" style={styles.bottomContainer}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} Vohara Legal. All rights reserved.
          </p>
          <div style={styles.legalLinks}>
            <a href="#" style={styles.bottomLink}>Privacy Policy</a>
            <a href="#" style={styles.bottomLink}>Terms of Service</a>
            <a href="#" style={styles.bottomLink}>Data Protection Act Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: 'var(--primary-blue)',
    borderTop: '4px solid var(--silver-medium)',
    color: 'var(--silver-light)',
    paddingTop: 'var(--spacing-xl)',
    fontFamily: 'var(--font-primary)',
  },
  topSection: {
    paddingBottom: 'var(--spacing-xl)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '2.5rem',
  },
  colBrand: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
  },
  logoIconBg: {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    backgroundColor: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    color: 'var(--primary-blue)',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '1.25rem',
    letterSpacing: '0.05em',
    color: 'var(--white)',
  },
  brandDesc: {
    color: 'var(--silver-dark)',
    fontSize: '0.875rem',
    lineHeight: '1.6',
  },
  socials: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  socialLink: {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: 'var(--silver-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-fast)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  colLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  heading: {
    color: 'var(--white)',
    fontFamily: 'var(--font-display)',
    fontSize: '1rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--silver-dark)',
    fontSize: '0.875rem',
    textAlign: 'left',
    cursor: 'pointer',
    padding: 0,
    transition: 'var(--transition-fast)',
  },
  colNewsletter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  newsletterDesc: {
    color: 'var(--silver-dark)',
    fontSize: '0.875rem',
    lineHeight: '1.5',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%',
  },
  input: {
    width: '100%',
    padding: '0.75rem 2.5rem 0.75rem 0.875rem',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    borderRadius: 'var(--border-radius-md)',
    color: 'var(--white)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  subscribeBtn: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    bottom: '4px',
    width: '32px',
    backgroundColor: 'var(--brand-blue)',
    border: 'none',
    borderRadius: '4px',
    color: 'var(--white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  statusText: {
    fontSize: '0.75rem',
    marginTop: '0.5rem',
    fontWeight: '500',
  },
  contactDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    marginTop: '0.5rem',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  contactIcon: {
    color: 'var(--silver-dark)',
    marginTop: '3px',
    flexShrink: 0,
  },
  contactText: {
    color: 'var(--silver-dark)',
    fontSize: '0.8125rem',
    lineHeight: '1.4',
  },
  bottomSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '1.5rem 0',
    marginTop: 'var(--spacing-xl)',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
  },
  legalLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
    transition: 'var(--transition-fast)',
  },
};
// Add hover overrides
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    footer button:hover {
      color: var(--white) !important;
    }
    footer a:hover {
      color: var(--white) !important;
      border-color: var(--white) !important;
    }
    footer input:focus {
      border-color: var(--silver-dark) !important;
      background-color: rgba(255, 255, 255, 0.08) !important;
    }
  `;
  document.head.appendChild(styleEl);
}
