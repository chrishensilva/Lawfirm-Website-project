import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Video, FileCheck, ShieldAlert, ArrowRight, CheckCircle2, ShieldCheck, Mail, Users, Landmark } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function International({ setView, openConsultation }) {
  const containerRef = useRef(null);
  const cardGridRef = useRef(null);
  const flowRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      if (cardGridRef.current) {
        gsap.fromTo(cardGridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // How we work flow
      if (flowRef.current) {
        gsap.fromTo(flowRef.current.children,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: flowRef.current,
              start: 'top 85%',
            }
          }
        );
      }

      // Strengths & clients list
      if (listRef.current) {
        gsap.fromTo(listRef.current.children,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 80%',
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const overseasServices = [
    {
      icon: <Landmark size={24} />,
      title: 'Remote Property Transactions',
      desc: 'Complete property transfers, deeds registration, and title verification in Sri Lanka without needing to travel.'
    },
    {
      icon: <FileCheck size={24} />,
      title: 'Power of Attorney Representation',
      desc: 'Drafting, attestation, and execution of local and foreign Powers of Attorney to represent your legal interests.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Legal Documentation & Certification',
      desc: 'Preparation, review, legalization, and apostille certification of affidavits, declarations, and deeds.'
    },
    {
      icon: <Users size={24} />,
      title: 'Coordinated Legal Counsel',
      desc: 'Direct liaison with foreign lawyers, financial advisors, and estate administrators to handle cross-border assets.'
    }
  ];

  const workFlow = [
    {
      icon: <Video size={22} />,
      step: '01',
      title: 'Video Consultations',
      desc: 'Conducted via Zoom, MS Teams, or WhatsApp to align on goals and legal strategies.'
    },
    {
      icon: <ShieldCheck size={22} />,
      step: '02',
      title: 'Secure Document Exchange',
      desc: 'Upload legal files, deeds, and identification documents encrypted through our secure LMS portal.'
    },
    {
      icon: <Mail size={22} />,
      step: '03',
      title: 'Regular Client Updates',
      desc: 'Receive ongoing case status reports and draft reviews directly to your email and client portal.'
    }
  ];

  return (
    <section ref={containerRef} style={{ fontFamily: 'var(--font-primary)' }}>
      {/* Banner */}
      <div style={styles.heroBanner}>
        <div className="container" style={styles.heroBannerInner}>
          <div className="badge" style={styles.badge}>Global Engagement</div>
          <h1 style={styles.heroTitle}>International &<br />Overseas Services</h1>
          <p style={styles.heroSubtitle}>
            Vohara Legal provides comprehensive legal support to clients based outside Sri Lanka, enabling them to manage local property, corporate, and civil matters efficiently without requiring a physical presence.
          </p>
        </div>
      </div>

      {/* Services Grid Section */}
      <section className="section">
        <div className="container">
          <div className="text-center max-w-3xl" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>Expertise</span>
            <h2 className="section-title centered">Services for Overseas Clients</h2>
            <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>We represent and protect your local interest with strict compliance, remote execution, and timely updates.</p>
          </div>

          <div ref={cardGridRef} style={styles.cardGrid}>
            {overseasServices.map((service, idx) => (
              <div key={idx} className="card" style={styles.serviceCard}>
                <div style={styles.iconContainer}>
                  {service.icon}
                </div>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <p style={styles.cardDesc}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="text-center max-w-3xl" style={{ marginBottom: 'var(--spacing-xl)' }}>
            <span className="badge" style={{ marginBottom: '1rem' }}>Client Journey</span>
            <h2 className="section-title centered">How We Coordinate Remotely</h2>
            <p style={{ marginTop: '1rem', fontSize: '1.125rem' }}>Our workflow is optimized for distance, ensuring security, transparency, and simple tracking.</p>
          </div>

          <div ref={flowRef} style={styles.flowGrid}>
            {workFlow.map((flow, idx) => (
              <div key={idx} style={styles.flowCard}>
                <div style={styles.flowHeader}>
                  <div style={styles.flowIcon}>{flow.icon}</div>
                  <span style={styles.flowStep}>{flow.step}</span>
                </div>
                <h3 style={styles.flowTitle}>{flow.title}</h3>
                <p style={styles.flowDesc}>{flow.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients & Strengths Section */}
      <section className="section">
        <div className="container">
          <div ref={listRef} style={styles.twoColGrid}>
            {/* Clients We Assist */}
            <div style={styles.listBlock}>
              <span className="badge" style={{ marginBottom: '1rem' }}>Partnership</span>
              <h2 style={styles.blockTitle}>Clients We Assist</h2>
              <p style={styles.blockIntro}>We represent a diverse portfolio of international stakeholders requiring reliable local legal representation in Sri Lanka:</p>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} style={styles.listIcon} />
                <div>
                  <h4 style={styles.listItemTitle}>Sri Lankan Nationals Residing Abroad</h4>
                  <p style={styles.listItemDesc}>Expats managing inheritance, property conveyancing, partition cases, or executing power of attorney dockets.</p>
                </div>
              </div>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} style={styles.listIcon} />
                <div>
                  <h4 style={styles.listItemTitle}>Foreign Investors & Expatriates</h4>
                  <p style={styles.listItemDesc}>Individuals purchasing residential/commercial property or establishing startup operations in Sri Lanka.</p>
                </div>
              </div>
              <div style={styles.listItem}>
                <CheckCircle2 size={18} style={styles.listIcon} />
                <div>
                  <h4 style={styles.listItemTitle}>International Businesses</h4>
                  <p style={styles.listItemDesc}>Corporations setting up subsidiaries, managing commercial contracts, or executing local conveyancing transactions.</p>
                </div>
              </div>
            </div>

            {/* Our Strengths */}
            <div style={styles.strengthBlock}>
              <h3 style={styles.strengthBlockTitle}>Our Strength & Approach</h3>
              <p style={{ color: 'var(--silver-medium)', fontSize: '0.95rem', marginBottom: '2rem' }}>We deliver international service standards with absolute local capability and adherence to legal ethics.</p>
              <div style={styles.strengthGrid}>
                {[
                  { title: 'Local Legal Knowledge', desc: 'Thorough expertise in Sri Lankan property, civil, and corporate jurisprudence.' },
                  { title: 'Practical Commercial Awareness', desc: 'Translating legal restrictions into practical, strategic business choices.' },
                  { title: 'International Service Standards', desc: 'Rigorous responsiveness, clear documentation, and structured updates.' },
                  { title: 'Awareness of Ethics & Confidentiality', desc: 'Absolute compliance with ethical bar standards and client trust.' }
                ].map((strength, idx) => (
                  <div key={idx} style={styles.strengthItem}>
                    <div style={styles.strengthBullet}></div>
                    <div>
                      <h4 style={{ color: 'var(--white)', fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.25rem' }}>{strength.title}</h4>
                      <p style={{ color: 'var(--silver-dark)', fontSize: '0.85rem', margin: 0, lineHeight: '1.4' }}>{strength.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="section section-bg-light" style={{ padding: '4rem 0' }}>
        <div className="container text-center">
          <div className="max-w-3xl" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
            <h2 style={{ fontSize: '2rem', color: 'var(--primary-blue)', margin: 0 }}>Start Your Remote Legal Consultation</h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', margin: 0, maxWidth: '600px' }}>
              Speak with Mr. K. Vohara or one of our Colombo legal consultants via Zoom or Teams. We will outline the exact roadmap to resolve your property or corporate matter.
            </p>
            <button className="btn btn-primary btn-lg" onClick={openConsultation} style={{ marginTop: '0.5rem' }}>
              Request a Consultation
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
}

const styles = {
  heroBanner: {
    backgroundColor: 'var(--primary-blue)',
    backgroundImage: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--brand-blue) 100%)',
    padding: '5rem 0 4rem 0',
    color: 'var(--white)',
  },
  heroBannerInner: {
    maxWidth: '700px',
  },
  badge: {
    marginBottom: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'var(--silver-light)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
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
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '2rem',
  },
  serviceCard: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2.5rem 2rem',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  iconContainer: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--border-radius-md)',
    backgroundColor: 'var(--soft-blue)',
    color: 'var(--brand-blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    fontFamily: 'var(--font-display)',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  flowGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2.5rem',
  },
  flowCard: {
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2rem',
    border: '1px solid var(--silver-medium)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  flowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flowIcon: {
    color: 'var(--brand-blue)',
  },
  flowStep: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '2rem',
    color: 'var(--silver-medium)',
    lineHeight: '1',
  },
  flowTitle: {
    fontSize: '1.15rem',
    color: 'var(--primary-blue)',
    fontWeight: '700',
  },
  flowDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    lineHeight: '1.55',
  },
  twoColGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
  },
  listBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  blockTitle: {
    fontSize: '2rem',
    color: 'var(--primary-blue)',
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
  },
  blockIntro: {
    fontSize: '1.05rem',
    lineHeight: '1.6',
    color: 'var(--text-muted)',
  },
  listItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  listIcon: {
    color: 'var(--success)',
    flexShrink: 0,
    marginTop: '3px',
  },
  listItemTitle: {
    fontSize: '1rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    marginBottom: '2px',
  },
  listItemDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
  },
  strengthBlock: {
    backgroundColor: 'var(--primary-blue)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '3rem 2.5rem',
    boxShadow: 'var(--shadow-xl)',
  },
  strengthBlockTitle: {
    color: 'var(--white)',
    fontSize: '1.5rem',
    fontWeight: '700',
    fontFamily: 'var(--font-display)',
    marginBottom: '0.5rem',
  },
  strengthGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  strengthItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
  },
  strengthBullet: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--accent-blue)',
    marginTop: '8px',
    flexShrink: 0,
  }
};
