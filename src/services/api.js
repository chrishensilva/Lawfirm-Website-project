/**
 * API Service Simulation for Lawyer Management System (LMS) Integration.
 * Prepared for a multi-tenant environment, supporting secure client portals,
 * routing intakes, and retrieving documents.
 */

const SIMULATE_LATENCY = 800; // milliseconds

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Submits a client intake form to the LMS routing engine.
   * In a real SaaS setup, this would include a headers block specifying tenant ID.
   * 
   * @param {Object} intakeData 
   * @returns {Promise<{success: boolean, messageId: string, clientPortalTempToken?: string}>}
   */
  submitClientIntake: async (intakeData) => {
    await delay(SIMULATE_LATENCY);
    
    // Validate required fields basic check
    if (!intakeData.fullName || !intakeData.email || !intakeData.message) {
      throw new Error("Missing required intake fields.");
    }

    console.log("[LMS SaaS Router] Received intake ticket:", intakeData);
    
    // Simulate generation of tracking token for client portal
    const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      ticketId,
      message: "Your request has been successfully routed. A representative will contact you shortly.",
      portalAccessUrl: `https://portal.voharalegal.lk/setup?ticket=${ticketId}`
    };
  },

  /**
   * Simulates newsletter registration.
   */
  subscribeToNewsletter: async (email) => {
    await delay(SIMULATE_LATENCY);
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address.");
    }
    console.log("[Newsletter Engine] Registered subscription for:", email);
    return {
      success: true,
      message: "Successfully subscribed to legal insights."
    };
  },

  /**
   * Simulates authentication for the secure Client Portal.
   */
  loginPortalClient: async (email, passcode) => {
    await delay(SIMULATE_LATENCY);
    
    if (email === "client@demo.com" && passcode === "123456") {
      return {
        authenticated: true,
        client: {
          id: "USR-78291",
          name: "Eleanor Perera",
          email: "client@demo.com",
          firmTenantId: "TEN-VOHARA-COLOMBO-01"
        },
        token: "jwt_token_sample_abc123"
      };
    }
    
    throw new Error("Invalid credentials. Try using client@demo.com and passcode 123456.");
  },

  /**
   * Simulates fetching active case list & details from the multi-tenant SaaS backend.
   */
  fetchCaseDetails: async (token) => {
    await delay(SIMULATE_LATENCY - 300);
    if (!token) throw new Error("Unauthorized access.");

    return {
      caseNumber: "CASE-2026-VL-1042",
      caseTitle: "Vohara Legal vs. Ocean Shipping Ltd",
      status: "Discovery Phase",
      progress: 60, // percentage
      leadAttorney: "K. Vohara, Attorney-at-Law",
      courtDate: "October 14, 2026",
      timeline: [
        { date: "May 10, 2026", label: "Initial Retainer Agreement Signed", status: "completed" },
        { date: "May 25, 2026", label: "Formal Plaint Filed in District Court", status: "completed" },
        { date: "June 12, 2026", label: "Defendant's Answer Submitted", status: "completed" },
        { date: "June 22, 2026", label: "Document Production & Interrogatories", status: "active" },
        { date: "August 18, 2026", label: "Scheduled Depositions", status: "upcoming" },
        { date: "October 14, 2026", label: "Court Hearing Date", status: "upcoming" }
      ]
    };
  },

  /**
   * Simulates fetching client invoices from billing service.
   */
  fetchBillingRecords: async (token) => {
    await delay(SIMULATE_LATENCY - 400);
    if (!token) throw new Error("Unauthorized access.");

    return [
      { id: "INV-5591", description: "Case Assessment & Legal Retainer", amount: "$3,500.00", dueDate: "Paid", paid: true },
      { id: "INV-5683", description: "Title Deeds Review and Land Registry Filing", amount: "$1,250.00", dueDate: "Paid", paid: true },
      { id: "INV-5801", description: "Commercial Dispute Trial Preparation", amount: "$2,200.00", dueDate: "Due in 15 days", paid: false }
    ];
  },

  /**
   * Simulates fetching shared files uploaded by client or attorney.
   */
  fetchSharedDocuments: async (token) => {
    await delay(SIMULATE_LATENCY - 200);
    if (!token) throw new Error("Unauthorized access.");

    return [
      { id: "DOC-01", name: "signed_retainer_agreement.pdf", size: "2.1 MB", uploadedBy: "System", date: "May 11, 2026" },
      { id: "DOC-02", name: "title_deed_investigation_report.pdf", size: "4.2 MB", uploadedBy: "You", date: "June 05, 2026" },
      { id: "DOC-03", name: "shipping_contract_dispute_summons.pdf", size: "840 KB", uploadedBy: "K. Vohara", date: "June 19, 2026" }
    ];
  },

  /**
   * Simulates uploading a new document securely.
   */
  uploadDocument: async (token, fileObject) => {
    await delay(SIMULATE_LATENCY + 200);
    if (!token) throw new Error("Unauthorized access.");
    
    return {
      id: "DOC-" + Math.floor(10 + Math.random() * 90),
      name: fileObject.name,
      size: (fileObject.size / (1024 * 1024)).toFixed(1) + " MB",
      uploadedBy: "You",
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
  }
};
