import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Shield, BookOpen, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Team({ setView, selectAttorney }) {
  const containerRef = useRef(null);
  const teamGridRef = useRef(null);

  const attorneys = [
    {
      name: 'K. Vohara, Attorney-at-Law',
      role: 'Senior Partner',
      photo: '/lawyer_marcus.png',
      specialty: 'Civil Litigation, Commercial Disputes & Conveyancing',
      bio: 'Mr. Vohara has over 20 years of experience representing corporations, local businesses, and international investors in civil courts. He coordinates property transactions and dispute resolutions with professional excellence and absolute discretion.',
      education: 'University of Colombo (LL.B., Hons.), Sri Lanka Law College',
      credentials: 'Enrollment as Attorney-at-Law of the Supreme Court of Sri Lanka (2006)',
      phone: '+94 11 234 5678 ext. 101',
      email: 'k.vohara@voharalegal.lk'
    },
    {
      name: 'D. de Silva, Attorney-at-Law',
      role: 'Partner & Notary Public',
      photo: '/lawyer_sarah.png',
      specialty: 'Corporate Arrangements, Notarial & Immigration Law',
      bio: 'Mrs. de Silva specializes in company incorporations, shareholder arrangements, foreign investment compliance, and detailed property title investigations. She oversees remote legal transactions for our overseas clients.',
      education: 'University of Colombo (LL.B.)',
      credentials: 'Attorney-at-Law and Notary Public, Commissioner for Oaths',
      phone: '+94 11 234 5678 ext. 104',
      email: 'd.desilva@voharalegal.lk'
    },
    {
      name: 'A. Perera, Attorney-at-Law',
      role: 'Senior Associate',
      photo: '/lawyer_robert.png',
      specialty: 'Criminal Law Practice & Fundamental Rights',
      bio: 'Mr. Perera represents clients in criminal practice, bail hearings, magistrate inquiries, and files fundamental rights applications in the Supreme Court. He brings practical, structured solutions to complex litigation.',
      education: 'Sri Lanka Law College',
      credentials: 'Admitted as Attorney-at-Law of the Supreme Court of Sri Lanka (2014)',
      phone: '+94 11 234 5678 ext. 118',
      email: 'a.perera@voharalegal.lk'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-in of cards
      gsap.fromTo(teamGridRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleConsultClick = (attorneyName) => {
    selectAttorney(attorneyName);
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="section" id="team" style={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl" style={styles.header}>
          <div className="badge" style={{ marginBottom: '1rem' }}>Trusted Team</div>
          <h2 className="section-title centered">Expert Legal Counsel</h2>
          <p style={styles.headerSubtitle}>
            Our attorneys combine elite legal education with decades of practical trial and transactional experience. We are committed to straightforward, expert counsel.
          </p>
        </div>

        {/* Attorneys List Grid */}
        <div ref={teamGridRef} style={styles.teamGrid}>
          {attorneys.map((lawyer) => (
            <div key={lawyer.name} className="card team-card" style={styles.lawyerCard}>
              <div style={styles.imgContainer}>
                <img
                  src={lawyer.photo}
                  alt={lawyer.name}
                  style={styles.lawyerImg}
                />
                <div style={styles.roleOverlay}>
                  <span style={styles.roleText}>{lawyer.role}</span>
                </div>
              </div>
              <div className="card-body" style={styles.cardBody}>
                <h3 style={styles.lawyerName}>{lawyer.name}</h3>
                <div style={styles.specialtyBadge}>{lawyer.specialty}</div>
                <p style={styles.lawyerBio}>{lawyer.bio}</p>
                
                {/* Details Section */}
                <div style={styles.detailsList}>
                  <div style={styles.detailItem}>
                    <GraduationCap size={16} style={styles.detailIcon} />
                    <span style={styles.detailText}>{lawyer.education}</span>
                  </div>
                  <div style={styles.detailItem}>
                    <BookOpen size={16} style={styles.detailIcon} />
                    <span style={styles.detailText}>{lawyer.credentials}</span>
                  </div>
                </div>

                {/* Direct Contacts */}
                <div style={styles.contactsGrid}>
                  <a href={`mailto:${lawyer.email}`} style={styles.contactLink}>
                    <Mail size={14} />
                    {lawyer.email}
                  </a>
                  <a href={`tel:${lawyer.phone.replace(/[^0-9]/g, '')}`} style={styles.contactLink}>
                    <Phone size={14} />
                    {lawyer.phone.split('ext')[0]}
                  </a>
                </div>

                <button
                  onClick={() => handleConsultClick(lawyer.name)}
                  className="btn btn-silver btn-sm"
                  style={styles.consultBtn}
                >
                  Consult with {lawyer.name.split(',')[0]}
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
  section: {
    backgroundColor: 'var(--white)',
  },
  header: {
    marginBottom: 'var(--spacing-xl)',
  },
  headerSubtitle: {
    fontSize: '1.125rem',
    marginTop: '1rem',
  },
  teamGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
  },
  lawyerCard: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-normal)',
  },
  imgContainer: {
    position: 'relative',
    width: '100%',
    height: '320px',
    backgroundColor: 'var(--silver-light)',
    overflow: 'hidden',
  },
  lawyerImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-slow)',
  },
  roleOverlay: {
    position: 'absolute',
    bottom: '16px',
    left: '16px',
    backgroundColor: 'var(--primary-blue)',
    backgroundImage: 'var(--silver-metallic)',
    color: 'var(--primary-blue)',
    padding: '0.35rem 0.875rem',
    borderRadius: 'var(--border-radius-md)',
    fontWeight: '700',
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    boxShadow: 'var(--shadow-md)',
  },
  roleText: {
    color: 'var(--primary-blue)',
  },
  cardBody: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  lawyerName: {
    fontSize: '1.35rem',
    color: 'var(--primary-blue)',
    marginBottom: '0.35rem',
  },
  specialtyBadge: {
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: 'var(--brand-blue)',
    backgroundColor: 'var(--soft-blue)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    display: 'inline-block',
    marginBottom: '1rem',
    alignSelf: 'flex-start',
  },
  lawyerBio: {
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: 'var(--text-muted)',
    marginBottom: '1.25rem',
  },
  detailsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderTop: '1px solid var(--silver-medium)',
    borderBottom: '1px solid var(--silver-medium)',
    padding: '1rem 0',
    marginBottom: '1.25rem',
  },
  detailItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  detailIcon: {
    color: 'var(--silver-dark)',
  },
  detailText: {
    fontSize: '0.8125rem',
    color: 'var(--text-muted)',
  },
  contactsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
    marginBottom: '1.5rem',
  },
  contactLink: {
    fontSize: '0.8125rem',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    transition: 'var(--transition-fast)',
  },
  consultBtn: {
    marginTop: 'auto',
    width: '100%',
  }
};

// Hover effects
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .team-card:hover .lawyerImg {
      transform: scale(1.05);
    }
    .contactLink:hover {
      color: var(--accent-blue) !important;
    }
  `;
  document.head.appendChild(styleEl);
}
