import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import International from './components/International';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [view, setView] = useState('home'); // 'home' | 'about' | 'services' | 'international' | 'blog' | 'contact'
  
  const mainRef = useRef(null);

  // Trigger page transition animation on view state change
  useEffect(() => {
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [view]);

  const openConsultation = () => {
    setView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to determine active metadata
  const getMetaData = () => {
    switch (view) {
      case 'home':
        return {
          title: "Vohara Legal | Sri Lankan Law Practice & Counsel",
          desc: "Colombo-based law practice grounded in tradition and defined by professional excellence. Providing trusted civil, commercial, property, and notarial services."
        };
      case 'about':
        return {
          title: "Firm Profile | Vohara Legal",
          desc: "Learn about Vohara Legal, our Colombo law firm philosophy of integrity, confidentiality, and our capability to assist local and international clients."
        };
      case 'services':
        return {
          title: "Practice Areas | Vohara Legal",
          desc: "Professional Sri Lankan legal services: Civil & Commercial Law, Criminal Law, Property Conveyancing, Corporate setups, and Fundamental Rights."
        };
      case 'international':
        return {
          title: "International & Overseas Services | Vohara Legal",
          desc: "Manage Sri Lankan property transactions and legal affairs remotely. Legal representation, document reviews, and Power of Attorney for clients residing abroad."
        };
      case 'blog':
        return {
          title: "Publications & Legal Insights | Vohara Legal",
          desc: "General legal guides on purchasing property in Sri Lanka, company registration, lease agreements, and executing Powers of Attorney."
        };
      case 'contact':
        return {
          title: "Contact Us & Consultation | Vohara Legal",
          desc: "Schedule a consultation with Vohara Legal. Secure, confidential legal intake routed directly to Colombo attorneys and consultants."
        };
      default:
        return {
          title: "Vohara Legal Colombo",
          desc: "Grounded in tradition. Defined by professional excellence."
        };
    }
  };

  const meta = getMetaData();

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <html lang="en" />
      </Helmet>

      {/* Global Header */}
      <Header 
        currentView={view} 
        setView={setView} 
        openConsultation={openConsultation} 
      />

      {/* Main Content Area — offset for always-fixed 76px header */}
      <main ref={mainRef} style={{ minHeight: '80vh', paddingTop: '76px' }}>
        {view === 'home' && (
          <>
            <Hero openConsultation={openConsultation} setView={setView} />
            <Services setView={setView} />
            <About openConsultation={openConsultation} />
          </>
        )}
        {view === 'about' && <About openConsultation={openConsultation} />}
        {view === 'services' && <Services setView={setView} />}
        {view === 'international' && (
          <International setView={setView} openConsultation={openConsultation} />
        )}
        {view === 'blog' && <Blog />}
        {view === 'contact' && (
          <Contact
            selectedAttorney={null}
            clearSelectedAttorney={() => {}}
            setView={setView}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer setView={setView} />
    </>
  );
}
