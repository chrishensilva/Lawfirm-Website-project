import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Search } from 'lucide-react';

export default function Blog() {
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: "Purchasing Property in Sri Lanka as a Foreign National or Expat",
      category: "Property Law",
      date: "June 18, 2026",
      author: "K. Vohara, Attorney-at-Law",
      readTime: "6 min read",
      summary: "Commercial and residential property purchases in Sri Lanka involve detailed regulations. Learn about title investigations, tax requirements, and expat property structures.",
      content: `Purchasing real estate in Sri Lanka is an attractive prospect for expatriates and foreign investors. However, Sri Lankan property law imposes specific restrictions on foreign land ownership that buyers must navigate carefully to protect their investments.

Here are the key considerations before entering a property transaction:

### 1. Restrictions on Foreign Ownership of Land
Under the Land (Restrictions on Alienation) Act, foreign nationals, foreign companies, and companies registered in Sri Lanka with over 50% foreign shareholding are generally prohibited from purchasing land. However, they are permitted to lease land on a long-term basis (up to 99 years), subject to a Land Lease Tax. Condominium units above the 4th floor can be purchased outright by foreigners without land alienation restrictions.

### 2. Rigorous Title Investigations
Before paying any advance, it is crucial to conduct a comprehensive title search. In Sri Lanka, titles should be traced back at least 30 years at the relevant Land Registry. We check for prior encumbrances, pending partition suits, unregistered deeds of gift, and municipal street line certificates that might affect the property.

### 3. Execution of Deeds of Transfer
For a valid transfer of land, a Deed of Transfer must be executed before a licensed Notary Public and attested by two witnesses. The deed is then registered at the local Land Registry to secure priority. Failure to register the deed promptly can result in competing claims.

### 4. Financing and Repatriation of Funds
Foreign buyers must channel all purchase funds through an Inward Investment Dedicated Account (IIDA) opened in a Sri Lankan commercial bank. When the property is sold, the proceeds and capital gains can be legally repatriated abroad through the same IIDA, provided all taxes are settled.`
    },
    {
      id: 2,
      title: "Executing Powers of Attorney for Overseas Clients",
      category: "Notarial & Overseas",
      date: "June 10, 2026",
      author: "D. de Silva, Attorney-at-Law",
      readTime: "5 min read",
      summary: "Residing abroad while managing legal affairs in Sri Lanka? Discover how a Power of Attorney (POA) lets you delegate property transactions, litigation, and banking.",
      content: `Overseas Sri Lankans and foreign investors often face difficulties managing local assets, selling property, or appearing in court. A Power of Attorney (POA) is a powerful legal instrument that enables a designated agent in Sri Lanka to act on your behalf.

To ensure your POA is legally enforceable, follow these steps:

### 1. Define the Scope of Power
A Power of Attorney can be General (granting broad powers to manage all affairs) or Special (limited to a specific task, such as executing a Deed of Transfer for a specific land parcel). It is highly recommended to draft a Special POA to prevent unauthorized actions or misuse of authority.

### 2. Execution and Attestation Abroad
If the POA is executed outside Sri Lanka, it must be signed in the presence of a Sri Lankan Consular Officer at the nearest embassy or high commission, or signed before a local Notary Public in that country. If signed before a foreign Notary, the document must be legalized by the foreign office (Apostille/Legalisation) and verified by the Sri Lankan embassy.

### 3. Registration in Sri Lanka
To be valid for property transactions or bank dockets, the POA must be registered at the Registrar General's Department in Colombo within a specified time limit of its arrival in Sri Lanka. The original document is filed, and a registered copy is issued.

### 4. Revocation of Power
A Power of Attorney remains valid until the principal revokes it, the agent dies/resigns, or the task is completed. To revoke a POA, a formal Deed of Revocation must be executed, registered at the Registrar General's Department, and served on the agent and relevant authorities.`
    },
    {
      id: 3,
      title: "Business Registration in Sri Lanka: A Founder's Checklist",
      category: "Corporate Law",
      date: "May 29, 2026",
      author: "D. de Silva, Attorney-at-Law",
      readTime: "7 min read",
      summary: "Setting up a private limited company in Colombo? This checklist covers name approval, drafting Articles of Association, director requirements, and tax registrations.",
      content: `Starting a business in Sri Lanka requires formal registration under the Companies Act No. 7 of 2007. Incorporating as a Private Limited (PVT Ltd) company provides limited liability protection and a structured framework for scaling operations.

Here is the essential checklist for registering a company:

### 1. Name Approval
Select a unique name for your business. The name must be submitted to the Registrar General of Companies (ROC) via the ERG online system for approval. The name approval is valid for three months, during which incorporation documents must be filed.

### 2. Draft Articles of Association
Articles of Association set out the internal regulations and governance structure of the company. Founders can adopt the standard "Table A" Articles from the Companies Act or draft customized Articles defining specific shareholder rights, voting shares, and board powers.

### 3. Form 1, Form 18, and Form 19
File the mandatory statutory forms with the ROC:
- **Form 1:** Application for Registration of a Company.
- **Form 18:** Consent and Certificate of Director (at least one director must reside in Sri Lanka).
- **Form 19:** Consent and Certificate of Secretary (every company must appoint a qualified, registered secretary).

### 4. Tax and Local Registrations
Once the Certificate of Incorporation is issued, the company must apply for a Taxpayer Identification Number (TIN) and register for VAT (if applicable) at the Department of Inland Revenue. You must also register with the Department of Labor for EPF/ETF contributions if you hire local employees.`
    },
    {
      id: 4,
      title: "Lease Agreements & Legal Obligations under Sri Lankan Law",
      category: "Property Law",
      date: "May 14, 2026",
      author: "K. Vohara, Attorney-at-Law",
      readTime: "6 min read",
      summary: "Drafting a commercial lease in Colombo? Learn about key clauses, lease registration requirements, deposit security, and landlord-tenant acts.",
      content: `Commercial lease agreements are crucial contracts that secure business premises. In Sri Lanka, lease agreements are subject to both common law principles and specific statutes like the Rent Act. Drafting a clear lease is key to preventing tenancy disputes.

Evaluate these four critical aspects before signing a lease:

### 1. Written Agreement and Notarial Execution
Under Sri Lankan law, any lease agreement exceeding one month must be in writing. For commercial leases of long duration, it is highly recommended to execute a Notarial Lease Agreement attested by a Notary Public. This ensures the lease can be registered at the Land Registry, protecting the tenant's occupancy rights against third-party purchasers.

### 2. Clearly Define Rent Escalation & Maintenance Fees
The lease should explicitly state the monthly rent, payment deadlines, and deposit details (typically 3 to 6 months of rent as security). Ensure the lease defines rent escalation terms (e.g., 5-10% increase every two years) and outlines who is responsible for municipal taxes, assessments, and structural repairs.

### 3. Eviction and Termination Clauses
Evicting a tenant in Sri Lanka can be a lengthy court process. Landlords must ensure the lease contains a clear termination clause detailing notice periods and specifying breaches that permit immediate reentry. Tenants should negotiate "Cure Periods" giving them time to resolve minor breaches before eviction proceedings can start.

### 4. Option to Renew
Secure your business location by negotiating a renewal option. The clause should specify the notice timeline (e.g., 3 months prior to expiry) and establish a clear method to calculate the new lease rate, ensuring the landlord cannot demand unreasonable rates at expiry.`
    }
  ];

  const categories = ['all', 'Corporate Law', 'Property Law', 'Notarial & Overseas'];

  const filteredArticles = articles.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedArticle = articles.find(art => art.id === selectedArticleId);

  if (selectedArticle) {
    return (
      <section className="section" style={{ backgroundColor: 'var(--white)' }}>
        <div className="container" style={styles.articleContainer}>
          <button onClick={() => setSelectedArticleId(null)} style={styles.backBtn}>
            <ArrowLeft size={16} />
            Back to Legal Insights
          </button>

          <article>
            <div style={styles.articleMeta}>
              <span className="badge">{selectedArticle.category}</span>
              <span style={styles.metaItem}><Calendar size={14} />{selectedArticle.date}</span>
              <span style={styles.metaItem}><User size={14} />By {selectedArticle.author}</span>
              <span style={styles.metaItem}><Clock size={14} />{selectedArticle.readTime}</span>
            </div>

            <h1 style={styles.articleTitle}>{selectedArticle.title}</h1>
            
            {/* Split Content by paragraphs and render nicely */}
            <div style={styles.articleBody}>
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} style={styles.subHeading}>{paragraph.replace('###', '').trim()}</h3>;
                }
                return <p key={idx} style={styles.paragraph}>{paragraph}</p>;
              })}
            </div>
          </article>

          <div style={styles.ctaBox}>
            <h4 style={{ color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>Need Specific Counsel on this Topic?</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Legal principles vary significantly by state jurisdiction and case details. Speak to one of our attorneys directly.
            </p>
            <button className="btn btn-primary btn-sm" onClick={() => {
              // Direct navigation to contact view
              const contactBtn = document.querySelector('button[onClick*="contact"]');
              if (contactBtn) contactBtn.click();
            }}>
              Request Consultation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section-bg-light" id="blog">
      <div className="container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl" style={styles.header}>
          <div className="badge" style={{ marginBottom: '1rem' }}>Legal Insights</div>
          <h2 className="section-title centered">Plain-English Articles</h2>
          <p style={styles.headerSubtitle}>
            Our legal library is designed to demystify complex corporate, family, and property law. Read straightforward guides written by practicing attorneys.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={styles.filterBar}>
          <div style={styles.categoriesRow}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  ...styles.categoryBtn,
                  backgroundColor: selectedCategory === cat ? 'var(--brand-blue)' : 'var(--white)',
                  color: selectedCategory === cat ? 'var(--white)' : 'var(--text-muted)',
                  borderColor: selectedCategory === cat ? 'var(--brand-blue)' : 'var(--silver-medium)'
                }}
              >
                {cat === 'all' ? 'All Articles' : cat}
              </button>
            ))}
          </div>

          <div style={styles.searchBox}>
            <Search size={16} style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        {/* Articles Feed */}
        {filteredArticles.length === 0 ? (
          <div style={styles.noResults}>
            <p>No articles found matching search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2">
            {filteredArticles.map(art => (
              <div key={art.id} className="card" style={styles.blogCard}>
                <div className="card-body">
                  <div style={styles.cardHeaderRow}>
                    <span className="badge" style={{ fontSize: '0.7rem' }}>{art.category}</span>
                    <span style={styles.cardReadTime}>{art.readTime}</span>
                  </div>
                  
                  <h3 style={styles.cardTitle}>{art.title}</h3>
                  <p style={styles.cardSummary}>{art.summary}</p>
                  
                  <div style={styles.cardFooter}>
                    <div style={styles.authorSection}>
                      <span style={styles.authorName}>{art.author}</span>
                      <span style={styles.divider}>•</span>
                      <span style={styles.authorDate}>{art.date}</span>
                    </div>
                    <button onClick={() => setSelectedArticleId(art.id)} className="card-link">
                      Read Full Article
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
  filterBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1.5rem',
    marginBottom: '2.5rem',
  },
  categoriesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },
  categoryBtn: {
    background: 'none',
    border: '1px solid',
    borderRadius: 'var(--border-radius-full)',
    padding: '0.4rem 1rem',
    fontSize: '0.8125rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    minWidth: '260px',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--silver-dark)',
  },
  searchInput: {
    width: '100%',
    padding: '0.5rem 1rem 0.5rem 2.25rem',
    borderRadius: 'var(--border-radius-full)',
    border: '1px solid var(--silver-medium)',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'var(--transition-fast)',
  },
  noResults: {
    textAlign: 'center',
    padding: '3rem 0',
    color: 'var(--text-muted)',
    border: '1px dashed var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
    backgroundColor: 'var(--white)',
  },
  blogCard: {
    height: '100%',
  },
  cardHeaderRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  cardReadTime: {
    fontSize: '0.75rem',
    color: 'var(--silver-dark)',
    fontWeight: '500',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: 'var(--primary-blue)',
    marginBottom: '0.75rem',
    lineHeight: '1.3',
  },
  cardSummary: {
    fontSize: '0.9rem',
    color: 'var(--text-muted)',
    lineHeight: '1.5',
    marginBottom: '1.5rem',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    borderTop: '1px solid var(--silver-medium)',
    paddingTop: '1rem',
  },
  authorSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.75rem',
    color: 'var(--silver-dark)',
  },
  authorName: {
    fontWeight: '600',
    color: 'var(--text-muted)',
  },
  divider: {
    color: 'var(--silver-medium)',
  },
  authorDate: {},
  articleContainer: {
    maxWidth: '740px',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: 'var(--brand-blue)',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    cursor: 'pointer',
    marginBottom: '2rem',
    padding: 0,
  },
  articleMeta: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1.25rem',
    fontSize: '0.8125rem',
    color: 'var(--silver-dark)',
    marginBottom: '1rem',
  },
  metaItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  articleTitle: {
    fontSize: '2.25rem',
    color: 'var(--primary-blue)',
    lineHeight: '1.2',
    marginBottom: '2rem',
  },
  articleBody: {
    lineHeight: '1.7',
    color: 'var(--text-dark)',
  },
  paragraph: {
    fontSize: '1.0625rem',
    marginBottom: '1.5rem',
    color: 'var(--text-muted)',
  },
  subHeading: {
    fontSize: '1.35rem',
    color: 'var(--primary-blue)',
    marginTop: '2rem',
    marginBottom: '1rem',
    fontFamily: 'var(--font-display)',
  },
  ctaBox: {
    marginTop: '3rem',
    padding: '2rem',
    backgroundColor: 'var(--soft-blue)',
    border: '1px solid var(--silver-medium)',
    borderRadius: 'var(--border-radius-lg)',
  }
};

if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    #blog input:focus {
      border-color: var(--brand-blue) !important;
      box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1) !important;
    }
  `;
  document.head.appendChild(styleEl);
}
