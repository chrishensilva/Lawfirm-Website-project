import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Users, Home, ShieldAlert, Award, FileText, ArrowRight, Scale, Gavel, Shield, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Services({ setView }) {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 'civil',
      icon: <Scale size={24} />,
      title: 'Civil & Commercial Law',
      desc: 'Advising on contractual matters, civil disputes, and general commercial issues.',
      details: 'We represent clients in contract negotiations, commercial disputes, and debt recovery before civil courts in Sri Lanka.'
    },
    {
      id: 'criminal',
      icon: <Gavel size={24} />,
      title: 'Criminal Law & Practice',
      desc: 'Professional legal representation and courtroom practice across all stages of criminal proceedings.',
      details: 'Our experienced counsel represents clients in investigations, bail applications, trials, and appeals with discretion and care.'
    },
    {
      id: 'fr',
      icon: <Shield size={24} />,
      title: 'Fundamental Rights Applications',
      desc: 'Direct applications to the Supreme Court of Sri Lanka to protect constitutional fundamental rights.',
      details: 'We file and advocate for applications involving violations of equality, liberty, and other constitutionally protected rights.'
    },
    {
      id: 'property',
      icon: <Home size={24} />,
      title: 'Property & Conveyancing',
      desc: 'Title investigation and verification, property transfers, lease agreements, and legal documentation.',
      details: 'We conduct rigorous title searches at land registries, draft deeds of transfer, and prepare residential/commercial leases.'
    },
    {
      id: 'corp',
      icon: <Briefcase size={24} />,
      title: 'Corporate & Business Law',
      desc: 'Company incorporation, shareholder and partnership agreements, business structuring, and commercial contracts.',
      details: 'We assist local and foreign investors with company setup (PVT Ltd), joint ventures, Board minutes, and commercial contracts.'
    },
    {
      id: 'dispute',
      icon: <Users size={24} />,
      title: 'Dispute Resolution',
      desc: 'Court representation, negotiation, settlement, and alternative dispute resolution (ADR).',
      details: 'We actively pursue settlements through mediation and arbitration to resolve disputes efficiently and avoid protracted trials.'
    },
    {
      id: 'notarial',
      icon: <FileText size={24} />,
      title: 'Notarial & Documentation',
      desc: 'Attestation and certification, affidavits, declarations, Powers of Attorney, legalization, and last wills.',
      details: 'Full notary public services, certifying local and foreign documents, drafting Wills, and executing Powers of Attorney.'
    },
    {
      id: 'visa',
      icon: <Globe size={24} />,
      title: 'Visa & Migration Services',
      desc: 'Assistance with residency, work permits, investor visas, and immigration compliance in Sri Lanka.',
      details: 'We help international businesses and expats secure residency status, coordinate with departments, and maintain visas.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the cards as they scroll into view
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%', // Starts when top of container hits 80% viewport height
            toggleActions: 'play none none none',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleServiceClick = () => {
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="section section-bg-light" id="services">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl" style={styles.header}>
          <div className="badge" style={{ marginBottom: '1rem' }}>Practice Expertise</div>
          <h2 className="section-title centered">Areas of Legal Excellence</h2>
          <p style={styles.headerSubtitle}>
            Our firm delivers highly tailored legal strategies. We translate complex law into strategic, actionable choices for our clients.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="card"
              style={styles.card}
            >
              <div className="card-body">
                <div className="card-icon" style={styles.iconBg}>
                  {service.icon}
                </div>
                <h3 className="card-title" style={styles.cardTitle}>{service.title}</h3>
                <p className="card-text" style={styles.cardDesc}>{service.desc}</p>
                <p style={styles.cardDetails}>{service.details}</p>
                <button
                  onClick={handleServiceClick}
                  className="card-link"
                  style={styles.cardLink}
                >
                  Consult on this Area
                  <ArrowRight size={14} style={styles.arrow} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  header: {
    marginBottom: 'var(--spacing-xl)',
  },
  headerSubtitle: {
    fontSize: '1.125rem',
    marginTop: '1rem',
  },
  card: {
    border: '1px solid var(--silver-medium)',
    backgroundColor: 'var(--white)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'var(--transition-normal)',
  },
  iconBg: {
    backgroundColor: 'var(--soft-blue)',
    color: 'var(--brand-blue)',
    transition: 'var(--transition-fast)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    marginBottom: '0.75rem',
  },
  cardDesc: {
    color: 'var(--text-dark)',
    fontSize: '0.95rem',
    fontWeight: '500',
    lineHeight: '1.5',
    marginBottom: '0.75rem',
  },
  cardDetails: {
    color: 'var(--text-muted)',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  },
  cardLink: {
    background: 'none',
    border: 'none',
    color: 'var(--brand-blue)',
    cursor: 'pointer',
    padding: 0,
    fontWeight: '600',
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    transition: 'var(--transition-fast)',
    marginTop: 'auto',
  },
  arrow: {
    transition: 'var(--transition-fast)',
  }
};

// Add hover styling enhancements via style tag
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .card:hover .card-icon {
      background-color: var(--brand-blue) !important;
      color: var(--white) !important;
    }
    .card-link:hover {
      color: var(--accent-blue) !important;
    }
    .card-link:hover svg {
      transform: translateX(4px);
    }
  `;
  document.head.appendChild(styleEl);
}
