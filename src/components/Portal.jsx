import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, LogOut, CheckCircle2, FileText, Download, Upload, MessageSquare, Send, DollarSign, Calendar, RefreshCw, AlertCircle, File } from 'lucide-react';
import { api } from '../services/api';

export default function Portal() {
  const [auth, setAuth] = useState(null); // { token, client }
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Portal Data States
  const [activeTab, setActiveTab] = useState('case'); // 'case' | 'documents' | 'billing' | 'messages'
  const [caseDetails, setCaseDetails] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [billing, setBilling] = useState([]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Marcus Vance, Esq.', text: "Hello Eleanor, I've reviewed the documents you uploaded last week. The opposing counsel has agreed to depositions on August 18. Please check the scheduling updates.", time: "June 20, 2:15 PM" },
    { id: 2, sender: 'You', text: "Thank you Marcus. I have added the latest forensic ledger to the Shared Documents tab. Please let me know if we need additional bank records.", time: "June 21, 10:30 AM" }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [dataLoading, setDataLoading] = useState(false);

  // File Upload states
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Check if user came from a completed intake form with automated token
    const demoTicket = sessionStorage.getItem('demo_ticket_id');
    if (demoTicket) {
      setAuth({
        token: 'jwt_token_sample_abc123',
        client: {
          id: 'USR-78291',
          name: 'Eleanor Vance (Demo)',
          email: 'client@demo.com',
          firmTenantId: 'TEN-VANGUARD-001'
        }
      });
      sessionStorage.removeItem('demo_ticket_id');
    }
  }, []);

  useEffect(() => {
    if (auth) {
      loadPortalData();
    }
  }, [auth]);

  const loadPortalData = async () => {
    setDataLoading(true);
    try {
      const caseRes = await api.fetchCaseDetails(auth.token);
      const docsRes = await api.fetchSharedDocuments(auth.token);
      const billsRes = await api.fetchBillingRecords(auth.token);
      setCaseDetails(caseRes);
      setDocuments(docsRes);
      setBilling(billsRes);
    } catch (err) {
      setError('Failed to fetch case data.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.loginPortalClient(loginEmail, loginPass);
      if (response.authenticated) {
        setAuth({
          token: response.token,
          client: response.client
        });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Invalid email or passcode.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setAuth(null);
    setCaseDetails(null);
    setDocuments([]);
    setBilling([]);
    setError('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today'
    };
    setMessages(prev => [...prev, msg]);
    setNewMessage('');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const newDoc = await api.uploadDocument(auth.token, file);
      setDocuments(prev => [newDoc, ...prev]);
    } catch (err) {
      alert('Upload failed: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  if (!auth) {
    return (
      <section className="section section-bg-dark" style={styles.authSection}>
        <div className="container" style={styles.authContainer}>
          <div style={styles.authInfo}>
            <div style={styles.badge}>SaaS Portal Ready</div>
            <h1 style={{ color: 'var(--white)' }}>Secure Client Portal</h1>
            <p style={{ color: 'var(--silver-dark)' }}>
              Vanguard Legal Partners utilizes a state-of-the-art secure case management system. 
              Active retainer clients can download case documents, review invoices, check court calendars, and directly message their attorney in a secure encrypted environment.
            </p>
            <div style={styles.securityHighlight}>
              <ShieldCheck size={24} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--white)', fontSize: '0.9rem' }}>AES-256 Bit Encryption</h4>
                <p style={{ color: 'var(--silver-dark)', fontSize: '0.8rem', margin: 0 }}>
                  This site adheres strictly to SOC2 compliance protocols. All legal advice requests are encrypted end-to-end.
                </p>
              </div>
            </div>
          </div>

          <div style={styles.loginCard}>
            <div style={styles.loginCardHeader}>
              <Lock size={20} style={{ color: 'var(--brand-blue)' }} />
              <h3 style={{ color: 'var(--primary-blue)', margin: 0 }}>Secure Login</h3>
            </div>
            
            <form onSubmit={handleLogin} style={{ padding: '2rem' }}>
              {error && (
                <div style={styles.errorBox}>
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}

              <div className="form-group">
                <label className="form-label">Client Email Address</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. client@demo.com"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Portal Passcode</label>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter passcode"
                  className="form-input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '1rem' }}
              >
                {loading ? 'Decrypting Secure Token...' : 'Access Portal'}
              </button>

              <div style={styles.demoTip}>
                <h5 style={{ margin: '0 0 4px 0', color: 'var(--brand-blue)' }}>Demo Access</h5>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Email: <strong>client@demo.com</strong><br />
                  Passcode: <strong>123456</strong>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-bg-light" style={styles.dashboardSection}>
      <div className="container">
        
        {/* Dashboard Header */}
        <div style={styles.dbHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={styles.dbLogoBg}>
              <ShieldCheck size={20} style={{ color: 'var(--primary-blue)' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.5rem', paddingBottom: 0, color: 'var(--primary-blue)' }}>Vanguard Client Dashboard</h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', margin: 0 }}>
                Firm Tenant: <strong>Vanguard Manhattan LLP (Active)</strong> | Client: <strong>{auth.client.name}</strong>
              </p>
            </div>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <LogOut size={16} />
            Logout Secure Session
          </button>
        </div>

        {/* Dashboard Tabs & Content Area */}
        <div style={styles.dbContainer}>
          {/* Sidebar Nav */}
          <div style={styles.dbSidebar}>
            <button 
              onClick={() => setActiveTab('case')}
              style={{ ...styles.sidebarLink, ...(activeTab === 'case' ? styles.sidebarActive : {}) }}
            >
              <Calendar size={18} />
              Case Tracker
            </button>
            <button 
              onClick={() => setActiveTab('documents')}
              style={{ ...styles.sidebarLink, ...(activeTab === 'documents' ? styles.sidebarActive : {}) }}
            >
              <FileText size={18} />
              Shared Documents ({documents.length})
            </button>
            <button 
              onClick={() => setActiveTab('billing')}
              style={{ ...styles.sidebarLink, ...(activeTab === 'billing' ? styles.sidebarActive : {}) }}
            >
              <DollarSign size={18} />
              Invoices & Billing ({billing.filter(b => !b.paid).length})
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              style={{ ...styles.sidebarLink, ...(activeTab === 'messages' ? styles.sidebarActive : {}) }}
            >
              <MessageSquare size={18} />
              Message Counsel
            </button>

            <div style={styles.sidebarSecurityFooter}>
              <Lock size={12} />
              <span>TLS 1.3 Active connection</span>
            </div>
          </div>

          {/* Tab Content Box */}
          <div style={styles.dbContent}>
            {dataLoading ? (
              <div style={styles.spinnerArea}>
                <RefreshCw size={36} className="spinner" style={{ color: 'var(--brand-blue)' }} />
                <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Decrypting client storage records...</p>
              </div>
            ) : (
              <>
                {/* 1. CASE TRACKER */}
                {activeTab === 'case' && caseDetails && (
                  <div>
                    <h3 style={styles.tabTitle}>{caseDetails.caseTitle}</h3>
                    <div style={styles.caseMetaBar}>
                      <span>Case Reference: <strong>{caseDetails.caseNumber}</strong></span>
                      <span>Lead Attorney: <strong>{caseDetails.leadAttorney}</strong></span>
                    </div>

                    {/* Progress Bar */}
                    <div style={styles.progressContainer}>
                      <div style={styles.progressHeader}>
                        <span>Current Phase: <strong>{caseDetails.status}</strong></span>
                        <span>{caseDetails.progress}% Complete</span>
                      </div>
                      <div style={styles.progressBarBg}>
                        <div style={{ ...styles.progressBarFill, width: `${caseDetails.progress}%` }}></div>
                      </div>
                    </div>

                    {/* Timeline List */}
                    <h4 style={{ marginBottom: '1rem', color: 'var(--primary-blue)' }}>Case Milestone Schedule</h4>
                    <div style={styles.timelineList}>
                      {caseDetails.timeline.map((step, idx) => (
                        <div key={idx} style={styles.timelineItem}>
                          <div style={{
                            ...styles.timelineBadge,
                            backgroundColor: step.status === 'completed' ? 'var(--success)' : 
                                             step.status === 'active' ? 'var(--accent-blue)' : 'var(--silver-medium)',
                            color: 'var(--white)'
                          }}>
                            {step.status === 'completed' ? '✓' : idx + 1}
                          </div>
                          <div style={styles.timelineContent}>
                            <span style={styles.timelineDate}>{step.date}</span>
                            <span style={{ 
                              ...styles.timelineText, 
                              fontWeight: step.status === 'active' ? '700' : '400',
                              color: step.status === 'active' ? 'var(--primary-blue)' : 'var(--text-dark)'
                            }}>
                              {step.label}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. DOCUMENTS */}
                {activeTab === 'documents' && (
                  <div>
                    <div style={styles.tabHeaderRow}>
                      <h3 style={styles.tabTitle}>Shared Legal Documents</h3>
                      <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                        {uploading ? 'Encrypting & Uploading...' : 'Upload Document'}
                        <Upload size={14} />
                        <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} disabled={uploading} />
                      </label>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      These documents represent file transfers between the client and attorney. Files uploaded here are automatically stored in the secure LMS cabinet.
                    </p>

                    <div style={styles.tableContainer}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Document Name</th>
                            <th style={styles.th}>Size</th>
                            <th style={styles.th}>Uploaded By</th>
                            <th style={styles.th}>Date Shared</th>
                            <th style={styles.th} style={{ textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documents.map((doc) => (
                            <tr key={doc.id} style={styles.tr}>
                              <td style={styles.td}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <FileText size={18} style={{ color: 'var(--brand-blue)' }} />
                                  <span style={{ fontWeight: '500' }}>{doc.name}</span>
                                </div>
                              </td>
                              <td style={styles.td}>{doc.size}</td>
                              <td style={styles.td}>
                                <span style={{
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  backgroundColor: doc.uploadedBy === 'You' ? 'var(--soft-blue)' : 'var(--silver-medium)',
                                  color: doc.uploadedBy === 'You' ? 'var(--brand-blue)' : 'var(--primary-blue)'
                                }}>
                                  {doc.uploadedBy}
                                </span>
                              </td>
                              <td style={styles.td}>{doc.date}</td>
                              <td style={styles.td} style={{ textAlign: 'right' }}>
                                <button className="btn btn-silver btn-sm" style={{ padding: '0.35rem' }} onClick={() => alert(`Downloading ${doc.name}...`)}>
                                  <Download size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. BILLING */}
                {activeTab === 'billing' && (
                  <div>
                    <h3 style={styles.tabTitle}>Billing Summary</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      Review active retainer balances and invoice archives. Payments can be processed securely through credit card or automated clearing house (ACH).
                    </p>

                    <div style={styles.tableContainer}>
                      <table style={styles.table}>
                        <thead>
                          <tr>
                            <th style={styles.th}>Invoice ID</th>
                            <th style={styles.th}>Description</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Due Date / Status</th>
                            <th style={styles.th} style={{ textAlign: 'right' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billing.map((inv) => (
                            <tr key={inv.id} style={styles.tr}>
                              <td style={styles.td} style={{ fontFamily: 'monospace', fontWeight: '700' }}>{inv.id}</td>
                              <td style={styles.td}>{inv.description}</td>
                              <td style={styles.td} style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>{inv.amount}</td>
                              <td style={styles.td}>
                                <span style={{
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  backgroundColor: inv.paid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                  color: inv.paid ? 'var(--success)' : 'var(--danger)'
                                }}>
                                  {inv.dueDate}
                                </span>
                              </td>
                              <td style={styles.td} style={{ textAlign: 'right' }}>
                                {inv.paid ? (
                                  <button className="btn btn-secondary btn-sm" style={{ fontSize: '0.75rem' }} disabled>
                                    Receipt Issued
                                  </button>
                                ) : (
                                  <button className="btn btn-accent btn-sm" style={{ fontSize: '0.75rem' }} onClick={() => alert(`Opening gateway for ${inv.amount}...`)}>
                                    Pay Online
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 4. MESSAGES */}
                {activeTab === 'messages' && (
                  <div style={styles.messagesTab}>
                    <h3 style={styles.tabTitle}>Secure Messaging Thread</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                      Messages sent here are encrypted and delivered directly to the attorney assigned to your case docket.
                    </p>

                    <div style={styles.chatArea}>
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          style={{
                            ...styles.chatBubbleContainer,
                            justifyContent: msg.sender === 'You' ? 'flex-end' : 'flex-start'
                          }}
                        >
                          <div style={{
                            ...styles.chatBubble,
                            backgroundColor: msg.sender === 'You' ? 'var(--brand-blue)' : 'var(--soft-blue)',
                            color: msg.sender === 'You' ? 'var(--white)' : 'var(--text-dark)',
                            borderRadius: msg.sender === 'You' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                          }}>
                            <span style={styles.bubbleSender}>{msg.sender}</span>
                            <p style={styles.bubbleText}>{msg.text}</p>
                            <span style={{
                              ...styles.bubbleTime,
                              color: msg.sender === 'You' ? 'rgba(255,255,255,0.65)' : 'var(--silver-dark)'
                            }}>{msg.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleSendMessage} style={styles.chatForm}>
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Write a message to your attorney..."
                        style={styles.chatInput}
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem' }}>
                        <Send size={16} />
                      </button>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

const styles = {
  authSection: {
    minHeight: '80vh',
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--spacing-xxl) 0',
  },
  authContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '4rem',
    alignItems: 'center',
  },
  authInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '0.35rem 0.75rem',
    borderRadius: 'var(--border-radius-full)',
    fontSize: '0.75rem',
    fontWeight: '700',
    color: 'var(--silver-light)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  securityHighlight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '1.25rem',
    marginTop: '1rem',
  },
  loginCard: {
    backgroundColor: 'var(--white)',
    borderRadius: 'var(--border-radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-xl)',
  },
  loginCardHeader: {
    backgroundColor: 'var(--silver-light)',
    borderBottom: '1px solid var(--silver-medium)',
    padding: '1.25rem 2rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  errorBox: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    border: '1px solid var(--danger)',
    color: 'var(--danger)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.75rem 1rem',
    fontSize: '0.8125rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
  },
  demoTip: {
    backgroundColor: 'var(--soft-blue)',
    border: '1px dashed var(--silver-dark)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.875rem 1.25rem',
    marginTop: '1.5rem',
  },
  dashboardSection: {
    backgroundColor: 'var(--silver-light)',
    minHeight: '80vh',
  },
  dbHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '1.25rem 2rem',
    marginBottom: '2rem',
    boxShadow: 'var(--shadow-sm)',
  },
  dbLogoBg: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: 'var(--soft-blue)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtn: {
    background: 'none',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-md)',
    padding: '0.5rem 1rem',
    fontSize: '0.8125rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  dbContainer: {
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    gap: '2rem',
    alignItems: 'start',
  },
  dbSidebar: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
    boxShadow: 'var(--shadow-sm)',
  },
  sidebarLink: {
    background: 'none',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius-md)',
    textAlign: 'left',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: 'var(--text-muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'var(--transition-fast)',
  },
  sidebarActive: {
    backgroundColor: 'var(--brand-blue)',
    color: 'var(--white)',
  },
  sidebarSecurityFooter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '0.6875rem',
    color: 'var(--silver-dark)',
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: '1px solid var(--silver-medium)',
  },
  dbContent: {
    backgroundColor: 'var(--white)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    padding: '2.5rem',
    boxShadow: 'var(--shadow-sm)',
    minHeight: '420px',
  },
  spinnerArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '300px',
  },
  tabTitle: {
    fontSize: '1.5rem',
    color: 'var(--primary-blue)',
    marginBottom: '0.5rem',
  },
  caseMetaBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1.5rem',
    fontSize: '0.8125rem',
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--silver-medium)',
    paddingBottom: '1rem',
    marginBottom: '1.5rem',
  },
  progressContainer: {
    backgroundColor: 'var(--silver-light)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1.25rem',
    marginBottom: '2rem',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.875rem',
    marginBottom: '0.5rem',
    color: 'var(--text-dark)',
  },
  progressBarBg: {
    height: '8px',
    backgroundColor: 'var(--silver-medium)',
    borderRadius: 'var(--border-radius-full)',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: 'var(--accent-blue)',
    backgroundImage: 'linear-gradient(90deg, var(--brand-blue) 0%, var(--accent-blue) 100%)',
    borderRadius: 'var(--border-radius-full)',
  },
  timelineList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    position: 'relative',
    paddingLeft: '1rem',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  timelineBadge: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: '700',
    flexShrink: 0,
  },
  timelineContent: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
  },
  timelineDate: {
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
    width: '100px',
    fontWeight: '600',
  },
  timelineText: {
    fontSize: '0.875rem',
  },
  tabHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '0.5rem',
  },
  tableContainer: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  th: {
    padding: '0.75rem 1rem',
    borderBottom: '2px solid var(--silver-medium)',
    color: 'var(--primary-blue)',
    fontWeight: '700',
    fontSize: '0.8125rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  tr: {
    borderBottom: '1px solid var(--silver-medium)',
    transition: 'var(--transition-fast)',
  },
  td: {
    padding: '1rem',
    fontSize: '0.875rem',
    color: 'var(--text-dark)',
  },
  messagesTab: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  chatArea: {
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-md)',
    padding: '1.5rem',
    height: '280px',
    overflowY: 'auto',
    backgroundColor: 'var(--silver-light)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    marginBottom: '1rem',
  },
  chatBubbleContainer: {
    display: 'flex',
    width: '100%',
  },
  chatBubble: {
    padding: '0.875rem 1.25rem',
    maxWidth: '75%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-sm)',
  },
  bubbleSender: {
    fontSize: '0.75rem',
    fontWeight: '700',
    marginBottom: '4px',
  },
  bubbleText: {
    fontSize: '0.875rem',
    margin: 0,
    lineHeight: '1.4',
  },
  bubbleTime: {
    fontSize: '0.6875rem',
    alignSelf: 'flex-end',
    marginTop: '6px',
  },
  chatForm: {
    display: 'flex',
    gap: '0.5rem',
  },
  chatInput: {
    flexGrow: 1,
    padding: '0.75rem 1rem',
    borderRadius: 'var(--border-radius-md)',
    border: '1px solid var(--silver-medium)',
    outline: 'none',
  }
};

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .spinner {
      animation: spin 1s linear infinite;
    }
    .dbSidebar button:hover {
      background-color: var(--soft-blue);
      color: var(--brand-blue);
    }
    .tr:hover {
      background-color: var(--soft-blue);
    }
    @media (max-width: 768px) {
      .dbContainer {
        grid-template-columns: 1fr !important;
      }
    }
  `;
  document.head.appendChild(styleEl);
}
