import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, CheckCircle2, AlertCircle, Upload, File } from 'lucide-react';
import { api } from '../services/api';

export default function Contact({ selectedAttorney, clearSelectedAttorney, setView }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    practiceArea: 'corp',
    attorney: 'none',
    message: '',
  });

  const [attachedFile, setAttachedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [submitResult, setSubmitResult] = useState(null);

  useEffect(() => {
    if (selectedAttorney) {
      // Map attorney name to select value
      let selectVal = 'none';
      if (selectedAttorney.includes('Vohara')) {
        selectVal = 'vohara';
        setFormData(prev => ({ ...prev, attorney: selectVal, practiceArea: 'civil' }));
      } else if (selectedAttorney.includes('Silva')) {
        selectVal = 'desilva';
        setFormData(prev => ({ ...prev, attorney: selectVal, practiceArea: 'property' }));
      } else if (selectedAttorney.includes('Perera')) {
        selectVal = 'perera';
        setFormData(prev => ({ ...prev, attorney: selectVal, practiceArea: 'criminal' }));
      }
    }
  }, [selectedAttorney]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const validate = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }
    if (!formData.message.trim()) errors.message = 'Please specify how we can help you.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    setSubmitResult(null);

    try {
      const payload = { ...formData };
      if (attachedFile) {
        payload.fileName = attachedFile.name;
        payload.fileSize = attachedFile.size;
      }
      
      const response = await api.submitClientIntake(payload);
      if (response.success) {
        setSubmitResult({
          type: 'success',
          ticketId: response.ticketId,
          message: response.message,
          portalAccessUrl: response.portalAccessUrl,
        });
        
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          practiceArea: 'corp',
          attorney: 'none',
          message: '',
        });
        setAttachedFile(null);
        clearSelectedAttorney();
      }
    } catch (err) {
      setSubmitResult({
        type: 'error',
        message: err.message || 'An error occurred during submission. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section section-bg-light" id="contact" style={styles.contactSection}>
      <div className="container">
        
        {/* Title */}
        <div className="text-center max-w-3xl" style={styles.header}>
          <div className="badge" style={{ marginBottom: '1rem' }}>Secure Intake</div>
          <h2 className="section-title centered">Start Your Consultation</h2>
          <p style={styles.headerSubtitle}>
            Our secure client routing engine ensures your legal query is directed to the correct practice expert immediately. All consultations are strictly confidential.
          </p>
        </div>

        <div style={styles.gridContainer}>
          {/* Contact Details Card */}
          <div style={styles.detailsCard}>
            <h3 style={styles.cardTitle}>Vohara Legal Offices</h3>
            <p style={styles.cardDesc}>Connect with us directly or schedule a private consultation at our Colombo chambers.</p>
            
            <div style={styles.infoList}>
              <div style={styles.infoItem}>
                <div style={styles.iconContainer}><MapPin size={18} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Firm Address</h4>
                  <p style={styles.infoValue}>No. 45, Flower Road, Colombo 00700, Sri Lanka</p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconContainer}><Phone size={18} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Direct Intake Hotlines</h4>
                  <p style={styles.infoValue}><a href="tel:+94112345678" style={styles.detailLink}>+94 11 234 5678</a></p>
                  <p style={styles.infoValue}>WhatsApp: <a href="https://wa.me/94771234567" target="_blank" rel="noopener noreferrer" style={styles.detailLink}>+94 77 123 4567</a></p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconContainer}><Mail size={18} /></div>
                <div>
                  <h4 style={styles.infoLabel}>General Enquiries</h4>
                  <p style={styles.infoValue}><a href="mailto:info@voharalegal.lk" style={styles.detailLink}>info@voharalegal.lk</a></p>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={styles.iconContainer}><Clock size={18} /></div>
                <div>
                  <h4 style={styles.infoLabel}>Office Hours</h4>
                  <p style={styles.infoValue}>Monday – Friday, 9:00 AM – 5:00 PM (SLT)</p>
                  <p style={styles.infoValue} style={{ color: 'var(--accent-blue)', fontSize: '0.8125rem', fontWeight: '600', marginTop: '2px' }}>*Consultations are available by prior appointment. Remote consultations can be arranged for overseas clients.</p>
                </div>
              </div>
            </div>

            {/* Premium Maps Placeholder */}
            <div style={styles.mapPlaceholder}>
              <div style={styles.mapInner}>
                <MapPin size={32} style={{ color: 'var(--brand-blue)', marginBottom: '0.5rem' }} />
                <h4 style={{ color: 'var(--primary-blue)', margin: 0, fontSize: '0.9rem' }}>Colombo Office Map View</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No. 45, Flower Road, Colombo 7</p>
              </div>
            </div>
          </div>

          {/* Consultation Intake Form */}
          <div style={styles.formCard}>
            {submitResult && submitResult.type === 'success' ? (
              <div style={styles.successBlock}>
                <CheckCircle2 size={56} style={{ color: 'var(--success)', marginBottom: '1rem' }} />
                <h3 style={styles.successTitle}>Intake Form Successfully Routed</h3>
                <p style={styles.successDesc}>{submitResult.message}</p>
                
                <div style={styles.ticketBox}>
                  <span style={styles.ticketLabel}>Secure Intake Ticket ID</span>
                  <span style={styles.ticketId}>{submitResult.ticketId}</span>
                </div>

                <div style={styles.portalPrompt}>
                  <ShieldCheck size={20} style={{ color: 'var(--brand-blue)', flexShrink: 0 }} />
                  <p style={styles.portalPromptText}>
                    A secure case portal has been generated. Use this Ticket ID to track the real-time status, upload documents, and message counsel.
                  </p>
                </div>

                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    // Set credentials in session storage for demo and navigate to portal
                    sessionStorage.setItem('demo_ticket_id', submitResult.ticketId);
                    setView('portal');
                  }}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Enter Secure Client Portal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={styles.formTitle}>Consultation Intake</h3>
                <p style={styles.formDesc}>All fields are encrypted and routed directly to practicing attorneys.</p>

                {submitResult && submitResult.type === 'error' && (
                  <div style={styles.errorBanner}>
                    <AlertCircle size={18} />
                    <span>{submitResult.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="form-input"
                    />
                    {formErrors.fullName && <div className="form-error">{formErrors.fullName}</div>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. j.doe@example.com"
                      className="form-input"
                    />
                    {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                  </div>
                </div>

                <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. (555) 123-4567"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Legal Practice Area</label>
                    <select
                      name="practiceArea"
                      value={formData.practiceArea}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="civil">Civil & Commercial Law</option>
                      <option value="criminal">Criminal Law & Practice</option>
                      <option value="fr">Fundamental Rights Applications</option>
                      <option value="property">Property & Conveyancing</option>
                      <option value="corp">Corporate & Business Law</option>
                      <option value="dispute">Dispute Resolution</option>
                      <option value="notarial">Notarial & Documentation</option>
                      <option value="visa">Visa & Migration Services</option>
                      <option value="other">Other / Uncategorized</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Attorney Counsel</label>
                  <select
                    name="attorney"
                    value={formData.attorney}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="none">No Preference (First Available Expert)</option>
                    <option value="vohara">K. Vohara, Attorney-at-Law (Civil/Commercial)</option>
                    <option value="desilva">D. de Silva, Attorney-at-Law (Corporate/Notarial)</option>
                    <option value="perera">A. Perera, Attorney-at-Law (Criminal/FR)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Detailed Case Overview / Query *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly detail your legal matter. Avoid sharing specific bank details or highly sensitive passwords here."
                    className="form-textarea"
                  />
                  {formErrors.message && <div className="form-error">{formErrors.message}</div>}
                </div>

                {/* Secure File Attachments */}
                <div style={styles.fileUploadArea}>
                  <label style={styles.fileLabel}>
                    <Upload size={16} style={{ color: 'var(--brand-blue)' }} />
                    <span>Attach Legal Documents (PDF, Word, Images - Max 10MB)</span>
                    <input 
                      type="file" 
                      onChange={handleFileChange} 
                      style={{ display: 'none' }}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                  </label>
                  {attachedFile && (
                    <div style={styles.attachedFileBox}>
                      <File size={14} style={{ color: 'var(--silver-dark)' }} />
                      <span style={styles.fileNameText}>{attachedFile.name} ({(attachedFile.size / 1024).toFixed(1)} KB)</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '1.5rem' }}
                >
                  {loading ? 'Routing Intake Ticket...' : 'Secure Submit to Counsel'}
                  {!loading && <Send size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  contactSection: {
    backgroundColor: 'var(--silver-light)',
  },
  header: {
    marginBottom: 'var(--spacing-xl)',
  },
  headerSubtitle: {
    fontSize: '1.125rem',
    marginTop: '1rem',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '2.5rem',
    alignItems: 'start',
  },
  detailsCard: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2rem',
    boxShadow: 'var(--shadow-sm)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    marginBottom: '0.5rem',
  },
  cardDesc: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '2rem',
  },
  infoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  infoItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    backgroundColor: 'var(--soft-blue)',
    color: 'var(--brand-blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  infoLabel: {
    fontSize: '0.8125rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--primary-blue)',
    marginBottom: '2px',
  },
  infoValue: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.4',
  },
  detailLink: {
    color: 'inherit',
    transition: 'var(--transition-fast)',
  },
  mapPlaceholder: {
    marginTop: '2.5rem',
    height: '180px',
    backgroundColor: 'var(--soft-blue)',
    border: '1px dashed var(--silver-dark)',
    borderRadius: 'var(--border-radius-md)',
    overflow: 'hidden',
    position: 'relative',
  },
  mapInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'radial-gradient(var(--silver-medium) 1px, transparent 1px)',
    backgroundSize: '16px 16px',
    textAlign: 'center',
    padding: '1rem',
  },
  formCard: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2.5rem',
    boxShadow: 'var(--shadow-md)',
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
    marginBottom: '0.35rem',
  },
  formDesc: {
    fontSize: '0.875rem',
    color: 'var(--text-muted)',
    marginBottom: '2rem',
  },
  errorBanner: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.5rem',
  },
  fileUploadArea: {
    marginTop: '1rem',
    border: '1px dashed var(--silver-dark)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1rem',
    backgroundColor: 'var(--silver-light)',
    transition: 'var(--transition-fast)',
  },
  fileLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.8125rem',
    color: 'var(--text-dark)',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
  },
  attachedFileBox: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    marginTop: '0.75rem',
  },
  fileNameText: {
    fontSize: '0.75rem',
    color: 'var(--text-muted)',
  },
  successBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem 0',
  },
  successTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: 'var(--primary-blue)',
    marginBottom: '0.75rem',
  },
  successDesc: {
    fontSize: '0.95rem',
    color: 'var(--text-muted)',
    marginBottom: '1.5rem',
    lineHeight: '1.5',
  },
  ticketBox: {
    backgroundColor: 'var(--soft-blue)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    marginBottom: '1.5rem',
  },
  ticketLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--text-muted)',
    fontWeight: '600',
  },
  ticketId: {
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'var(--primary-blue)',
  },
  portalPrompt: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
    border: '1px solid rgba(59, 130, 246, 0.15)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1rem',
    textAlign: 'left',
    marginBottom: '1.5rem',
  },
  portalPromptText: {
    fontSize: '0.8125rem',
    color: 'var(--brand-blue)',
    lineHeight: '1.4',
    margin: 0,
  }
};

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    #contact a:hover {
      color: var(--accent-blue) !important;
    }
  `;
  document.head.appendChild(styleEl);
}
