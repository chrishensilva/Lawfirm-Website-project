import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle, TrendingUp, Globe, Heart } from 'lucide-react';
import Team from './Team.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function About({ openConsultation }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);

  const values = [
    { icon: <CheckCircle size={22} />, title: 'Professional Integrity', desc: 'We maintain strict ethical standards and integrity in all of our professional dealings and court representations.' },
    { icon: <TrendingUp size={22} />, title: 'Clear & Considered Advice', desc: 'We provide considered legal opinions in simple, understandable terms so that clients can make practical decisions.' },
    { icon: <Globe size={22} />, title: 'Efficiency in Handling Matters', desc: 'We optimize legal processes, title reviews, and documentation to deliver timely and cost-effective services.' },
    { icon: <Heart size={22} />, title: 'Absolute Confidentiality', desc: 'Respect for client confidentiality is absolute, protecting sensitive family, civil, or corporate matters.' },
  ];

  const milestones = [
    { year: '2006', event: 'Vohara Legal founded in Colombo, grounded in Sri Lanka\'s rich legal traditions.' },
    { year: '2012', event: 'Expanded services across property conveyancing, civil court, and commercial transactions.' },
    { year: '2018', event: 'Established international remote service desk to support overseas Sri Lankan clients.' },
    { year: '2022', event: 'Partnered with Lexora Legal Consultants FZE - UAE, expanding international service scope.' },
    { year: '2026', event: 'Integrated secure client portal for automated docket tracking and file exchange.' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current.children,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: textRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 80%' }
        }
      );

      gsap.fromTo(valuesRef.current.children,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: valuesRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={styles.page}>
      {/* Hero Banner for About */}
      <div style={styles.heroBanner}>
        <div className="container" style={styles.heroBannerInner}>
          <div className="badge" style={{ marginBottom: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--silver-light)', border: '1px solid rgba(255,255,255,0.2)' }}>Firm Profile</div>
          <h1 style={styles.heroTitle}>Grounded in Tradition.<br />Defined by Excellence.</h1>
          <p style={styles.heroSubtitle}>Vohara Legal is a Colombo-based law practice providing trusted legal services to individuals, businesses, and overseas clients with professionalism, discretion, and care.</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="section">
        <div className="container">
          <div style={styles.storyGrid}>
            <div ref={textRef} style={styles.storyText}>
              <span className="badge" style={{ marginBottom: '1rem' }}>Firm Overview</span>
              <h2 className="section-title">Rooted in Sri Lankan Legal Tradition</h2>
              <p style={styles.storyPara}>
                Vohara Legal is established to provide reliable and professional legal services in a rapidly evolving legal and commercial environment. Guided by established legal principles, our Colombo-based practice adapts continuously to modern client needs.
              </p>
              <p style={styles.storyPara}>
                The firm advises on a wide range of matters including property transactions, corporate arrangements, and dispute resolution. We act for local and international clients, offering dependable legal support tailored to each matter.
              </p>
              <button className="btn btn-primary" onClick={openConsultation} style={{ marginTop: '1.5rem' }}>
                Request a Consultation
              </button>
            </div>

            {/* Timeline */}
            <div style={styles.timeline}>
              <h3 style={styles.timelineTitle}>Our Journey</h3>
              {milestones.map((m, i) => (
                <div key={i} style={styles.timelineItem}>
                  <div style={styles.timelineDot}></div>
                  {i < milestones.length - 1 && <div style={styles.timelineLine}></div>}
                  <div style={styles.timelineContent}>
                    <span style={styles.timelineYear}>{m.year}</span>
                    <p style={styles.timelineEvent}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div style={styles.statsBar}>
        <div className="container">
          <div ref={statsRef} style={styles.statsGrid}>
            {[
              { num: '20+', label: 'Years in Practice' },
              { num: '5,000+', label: 'Cases Advised' },
              { num: '3+', label: 'Attorneys-at-Law' },
              { num: '100%', label: 'Discretion & Care' },
              { num: '2', label: 'Offices (Col / UAE)' },
            ].map((s, i) => (
              <div key={i} style={styles.statItem}>
                <div style={styles.statNum}>{s.num}</div>
                <div style={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Core Values */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="text-center max-w-3xl" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>What Drives Us</span>
            <h2 className="section-title centered">Our Core Values</h2>
            <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>These aren't corporate slogans — they are the principles we apply to every case, every client, every day.</p>
          </div>
          <div ref={valuesRef} style={styles.valuesGrid}>
            {values.map((val, i) => (
              <div key={i} style={styles.valueCard}>
                <div style={styles.valueIcon}>{val.icon}</div>
                <h3 style={styles.valueTitle}>{val.title}</h3>
                <p style={styles.valueDesc}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Capability Section */}
      <section className="section" style={{ borderTop: '1px solid var(--silver-medium)', backgroundColor: 'var(--white)' }}>
        <div className="container">
          <div style={styles.storyGrid}>
            <div style={styles.storyText}>
              <span className="badge" style={{ marginBottom: '1rem' }}>Global Reach</span>
              <h2 className="section-title">International Capability</h2>
              <p style={styles.storyPara}>
                While deeply rooted in Sri Lanka, Vohara Legal supports international clients, expatriates, and investors through coordinated legal services and remote engagement. We handle complex local property purchases, inheritance matters, and commercial representation without requiring your physical presence in Colombo.
              </p>
              <p style={styles.storyPara}>
                To facilitate seamless representation across the Middle East and Gulf region, we coordinate legal affairs through our strategic international partner:
              </p>
              <div style={styles.partnerCard}>
                <h4 style={{ color: 'var(--brand-blue)', fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.25rem' }}>Lexora Legal Consultants FZE</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>United Arab Emirates (UAE) — Strategic Legal Coordinators</p>
              </div>
            </div>
            <div style={styles.assistCard}>
              <h3 style={{ color: 'var(--primary-blue)', marginBottom: '1.25rem', fontFamily: 'var(--font-display)', fontWeight: '700' }}>Clients We Represent</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Local & Residing Individuals', 'Businesses & Corporates', 'Overseas Sri Lankan Expats', 'Foreign Investors & Businesses'].map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-blue)' }}></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our People — embedded in About Us */}
      <Team setView={() => {}} selectAttorney={() => {}} />
    </section>
  );
}

const styles = {
  page: { fontFamily: 'var(--font-primary)' },
  heroBanner: {
    backgroundColor: 'var(--primary-blue)',
    backgroundImage: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--brand-blue) 100%)',
    padding: '5rem 0 4rem 0',
    color: 'var(--white)',
  },
  heroBannerInner: {
    maxWidth: '700px',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
    fontWeight: '800',
    color: 'var(--white)',
    lineHeight: '1.2',
    marginBottom: '1.25rem',
  },
  heroSubtitle: {
    fontSize: '1.125rem',
    color: 'var(--silver-medium)',
    lineHeight: '1.6',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 'var(--spacing-xl)',
    alignItems: 'start',
  },
  storyText: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  storyPara: {
    fontSize: '1.0625rem',
    lineHeight: '1.7',
    color: 'var(--text-muted)',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    paddingLeft: '1rem',
  },
  timelineTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    marginBottom: '1.5rem',
  },
  timelineItem: {
    display: 'flex',
    gap: '1rem',
    position: 'relative',
    paddingBottom: '1.5rem',
  },
  timelineDot: {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: 'var(--brand-blue)',
    flexShrink: 0,
    marginTop: '4px',
    border: '2px solid var(--soft-blue)',
    zIndex: 1,
  },
  timelineLine: {
    position: 'absolute',
    left: '7px',
    top: '18px',
    bottom: 0,
    width: '2px',
    backgroundColor: 'var(--silver-medium)',
  },
  timelineContent: {
    flex: 1,
  },
  timelineYear: {
    display: 'inline-block',
    fontWeight: '700',
    fontSize: '0.8125rem',
    color: 'var(--brand-blue)',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  },
  timelineEvent: {
    fontSize: '0.9375rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  statsBar: {
    backgroundColor: 'var(--brand-blue)',
    padding: '3rem 0',
    color: 'var(--white)',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '2rem',
    textAlign: 'center',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    borderRight: '1px solid rgba(255,255,255,0.1)',
  },
  statNum: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.25rem',
    fontWeight: '800',
    color: 'var(--white)',
  },
  statLabel: {
    fontSize: '0.875rem',
    color: 'rgba(255,255,255,0.65)',
    fontWeight: '500',
  },
  valuesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-lg)',
  },
  valueCard: {
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2rem',
    border: '1px solid var(--silver-medium)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-normal)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  valueIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'var(--soft-blue)',
    color: 'var(--brand-blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.125rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
  },
  valueDesc: {
    fontSize: '0.9375rem',
    color: 'var(--text-muted)',
    lineHeight: '1.6',
  },
  partnerCard: {
    backgroundColor: 'var(--soft-blue)',
    borderLeft: '4px solid var(--brand-blue)',
    padding: '1rem 1.5rem',
    borderRadius: '0 var(--border-radius-md) var(--border-radius-md) 0',
    marginTop: '0.5rem',
  },
  assistCard: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2.5rem',
    boxShadow: 'var(--shadow-sm)',
  },
};
