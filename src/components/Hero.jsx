import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Award, Users } from 'lucide-react';

export default function Hero({ openConsultation, setView }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const btnGroupRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // GSAP entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      tl.fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      tl.fromTo(btnGroupRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

      tl.fromTo(statsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
        '-=0.2'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} style={styles.heroSection}>
      {/* Background Overlay */}
      <div style={styles.overlay}></div>

      <div className="container" style={styles.container}>
        <div style={styles.content}>
          {/*<div style={styles.badge}>
            <ShieldCheck size={14} style={{ color: 'var(--accent-blue)' }} />
            <span>Trust. Tradition. Professional Responsibility.</span>
        </div>*/}

          <h1 ref={titleRef} style={styles.title}>
            VOHARA LEGAL <br />
            <span style={{ color: 'var(--silver-medium)' }} >Rooted in Tradition.<br />Defined by Excellence.</span>
          </h1>

          <p ref={subtitleRef} style={styles.subtitle}>
            A Sri Lankan legal practice providing trusted legal services to individuals, businesses, and overseas clients with professionalism, discretion, and care.
          </p>

          <div ref={btnGroupRef} style={styles.btnGroup}>
            <button className="btn btn-primary btn-lg" onClick={openConsultation}>
              Request a Consultation
              <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-light btn-lg"
              onClick={() => {
                setView('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Contact the Firm
            </button>
          </div>

          {/* Social Proof / Stats */}
          <div ref={statsRef} style={styles.statsContainer}>
            <div style={styles.statCard}>
              <Award size={20} style={styles.statIcon} />
              <div>
                <h4 style={{ color: 'var(--white)' }}>20+</h4>
                <p style={{ color: 'var(--silver-medium)' }}>Years of Practice</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <Users size={20} style={styles.statIcon} />
              <div>
                <h4 style={{ color: 'var(--white)' }}>3+</h4>
                <p style={{ color: 'var(--silver-medium)' }}>Senior Counsel</p>
              </div>
            </div>
            <div style={styles.statCard}>
              <ShieldCheck size={20} style={styles.statIcon} />
              <div>
                <h4 style={{ color: 'var(--white)' }}>5k+</h4>
                <p style={{ color: 'var(--silver-medium)' }}>Cases Advised</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

const styles = {
  heroSection: {
    position: 'relative',
    minHeight: '85vh',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 'var(--spacing-xxl)',
    paddingBottom: 'var(--spacing-xxl)',
    backgroundImage: "url('/Hero.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'scroll',
    color: 'var(--white)',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 30, 63, 0.5)', // Deep Navy overlay for typography legibility
    backgroundImage: 'linear-gradient(135deg, rgba(10, 30, 63, 0.9) 0%, rgba(30, 58, 138, 0.4) 100%)',
    zIndex: 1,
  },
  container: {
    position: 'relative',
    zIndex: 2,
  },
  content: {
    maxWidth: '800px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '0.4rem 0.875rem',
    borderRadius: 'var(--border-radius-full)',
    fontSize: '0.8125rem',
    fontWeight: '600',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--silver-light)',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(4px)',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    fontWeight: '800',
    lineHeight: '1.15',
    color: 'var(--white)',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  titleAccent: {
    color: 'transparent',
    WebkitTextStroke: '1px var(--silver-medium)',
    backgroundImage: 'linear-gradient(90deg, var(--white) 0%, var(--silver-dark) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
  },
  subtitle: {
    fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
    lineHeight: '1.6',
    color: 'var(--silver-medium)',
    marginBottom: '2.5rem',
    fontWeight: '400',
  },
  btnGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: 'var(--spacing-xl)',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '1.5rem',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    paddingTop: '2rem',
    marginTop: '2rem',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  statIcon: {
    color: 'var(--silver-dark)',
  },
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--white)',
    lineHeight: '1',
  },
  statLabel: {
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
    marginTop: '2px',
  },
  statLabelStyle: {
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
    marginTop: '2px',
  }
};
