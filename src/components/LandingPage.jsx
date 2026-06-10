import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Terminal, 
  Cpu, 
  MapPin, 
  Award, 
  GraduationCap,
  Building,
  CheckCircle,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Library,
  BookOpen,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Menu,
  X
} from 'lucide-react';

export default function LandingPage({ onEnterPortal }) {
  // Mobile navigation expansion state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Programs Accordion Expand/Collapse states
  const [mcaExpanded, setMcaExpanded] = useState(false);
  const [aimlExpanded, setAimlExpanded] = useState(false);

  // Posters Carousel State
  const carouselPosters = [
    {
      url: "/posters/11AM-1230PM_25May2026_InstitutionalPolicy-CampusCulture.png",
      title: "HoD's Address: Institutional Policy & Campus Culture",
      speaker: "Dr. Rupali Wagh",
      day: 1
    },
    {
      url: "/posters/09AM-10AM_26May2026.png",
      title: "Director's Keynote Address",
      speaker: "Dr. Fr. Jossy P George",
      day: 2
    },
    {
      url: "/posters/27May2026_10-11AM_ResponsibleUseOfAI.png",
      title: "Responsible Use of Generative AI",
      speaker: "Dr. Deepa V Jose",
      day: 3
    },
    {
      url: "/posters/2pm  3pm (1080 px x 1515px) .png",
      title: "Sensitization on Cyber Laws & Safety",
      speaker: "Dr. Diya C R",
      day: 2
    },
    {
      url: "/posters/3pm  4 pm (1080 x 1515px).png",
      title: "Career Launchpad & Internship briefing",
      speaker: "Placement Representatives & Seniors",
      day: 2
    },
    {
      url: "/posters/27May11AM-12Noon_BeyondAcademics_ClubsCentresAndFests.png",
      title: "Beyond Academics: Clubs & Fests",
      speaker: "Student Council Members",
      day: 3
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselPosters.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselPosters.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselPosters.length) % carouselPosters.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselPosters.length);
  };

  // Helper to resolve 3D poster placement in carousel stack
  const getCardState = (idx) => {
    const diff = (idx - currentIndex + carouselPosters.length) % carouselPosters.length;
    let x = 0;
    let scale = 1;
    let rotate = 0;
    let opacity = 0;
    let zIndex = 0;
    let active = false;
    let visible = false;

    if (diff === 0) {
      x = 0;
      scale = 1;
      rotate = 0;
      opacity = 1;
      zIndex = 10;
      active = true;
      visible = true;
    } else if (diff === 1) {
      x = 55;
      scale = 0.88;
      rotate = 5;
      opacity = 0.65;
      zIndex = 5;
      visible = true;
    } else if (diff === carouselPosters.length - 1) {
      x = -55;
      scale = 0.88;
      rotate = -5;
      opacity = 0.65;
      zIndex = 5;
      visible = true;
    }

    return { x, scale, rotate, opacity, zIndex, active, visible };
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 90, damping: 16 }
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 80, damping: 15, duration: 0.5 }
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      
      {/* Header/Navbar */}
      <motion.header 
        className="glass-header"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '85px' }}>
          
          {/* Logo Brand with Official Christ University Logo */}
          <div className="header-logo-container">
            <img 
              src="/christ_logo.png" 
              alt="Christ University Logo" 
              className="header-logo-img" 
            />
            <div style={{ borderLeft: '1.5px solid rgba(12, 35, 64, 0.15)', paddingLeft: '14px' }}>
              <div className="header-dept-title">
                Department of<br />Computer Science
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="header-nav">
            <a href="#about-dept" className="nav-link">Legacy & Ethos</a>
            <a href="#director-desk" className="nav-link">Welcome Message</a>
            <a href="#roadmap" className="nav-link">Curriculum Roadmap</a>
            <a href="#programs" className="nav-link">Programs</a>
            <motion.button 
              onClick={() => onEnterPortal()}
              className="btn-primary" 
              style={{ padding: '9px 22px', fontSize: '0.82rem', borderRadius: '8px' }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(15, 46, 92, 0.18)' }}
              whileTap={{ scale: 0.95 }}
            >
              Interactive Planner
            </motion.button>
          </nav>

          {/* Hamburger button for mobile/tablet screen widths */}
          <button 
            className="hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu Dropdown overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <a href="#about-dept" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Legacy & Ethos</a>
            <a href="#director-desk" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Welcome Message</a>
            <a href="#roadmap" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Curriculum Roadmap</a>
            <a href="#programs" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>Programs</a>
            <button 
              onClick={() => { setMobileMenuOpen(false); onEnterPortal(); }}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
            >
              Interactive Planner
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section style={{ padding: '70px 0 90px', position: 'relative' }}>
        {/* Soft Background glow to enhance blend */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '50%', background: 'radial-gradient(circle, rgba(224,242,254,0.3) 0%, rgba(255,253,240,0.2) 60%, transparent 100%)', pointerEvents: 'none', zIndex: -1 }} />

        <div className="container hero-grid">
          
          {/* Left Hero Block */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={itemVariants} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '18px' }}>
              <span className="badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(170, 124, 17, 0.08)' }}>
                <ShieldCheck size={14} style={{ color: 'var(--cu-gold)' }} /> NAAC Grade A+ Deemed to be University
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.4rem)', lineHeight: 1.12, marginBottom: '22px', color: 'var(--cu-navy-dark)', fontFamily: 'var(--font-serif)' }}>
              Nurturing Excellence <br />
              <span className="gradient-text-cu" style={{ fontWeight: 800 }}>In Advanced Computing</span>
            </motion.h1>

            <motion.p variants={itemVariants} style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: '32px', maxWidth: '530px' }}>
              Welcome to the Department of Computer Science. We cultivate technical expertise, scientific innovation, and ethical leadership in postgraduate computer science professionals. 
              Explore the comprehensive academic planning of the 2026-28 cohort.
            </motion.p>

            {/* University Stats row */}
            <motion.div variants={itemVariants} className="hero-stats-row">
              <div style={{ borderLeft: '3px solid var(--cu-gold)', paddingLeft: '14px', background: 'rgba(170, 124, 17, 0.02)', padding: '6px 12px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ display: 'block', fontSize: '1.4rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>25+ Years</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Department Legacy</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--cu-gold)', paddingLeft: '14px', background: 'rgba(170, 124, 17, 0.02)', padding: '6px 12px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ display: 'block', fontSize: '1.4rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>NAAC A+</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>University Rating</span>
              </div>
              <div style={{ borderLeft: '3px solid var(--cu-gold)', paddingLeft: '14px', background: 'rgba(170, 124, 17, 0.02)', padding: '6px 12px', borderRadius: '0 8px 8px 0' }}>
                <strong style={{ display: 'block', fontSize: '1.4rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>100%</strong>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>Placement Support</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-btns-row">
              <motion.button 
                onClick={() => onEnterPortal()} 
                className="btn-primary" 
                style={{ padding: '14px 30px', borderRadius: '8px', fontSize: '0.9rem' }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Enter Schedule Planner <ArrowRight size={15} />
              </motion.button>
              <motion.a 
                href="#roadmap" 
                className="btn-secondary" 
                style={{ padding: '14px 30px', borderRadius: '8px', fontSize: '0.9rem', textDecoration: 'none' }}
                whileHover={{ scale: 1.04, y: -2 }}
              >
                Curriculum Roadmap
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Hero Block - 3D Stacked Carousel of Actual Posters */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 70 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', width: '100%', minHeight: '560px', justifyContent: 'center' }}
          >
            {/* Elegant 3D Slider Container */}
            <div className="slider-container">
              {carouselPosters.map((poster, index) => {
                const state = getCardState(index);
                return (
                  <motion.div
                    key={index}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'radial-gradient(circle, var(--cu-navy) 0%, var(--cu-navy-dark) 100%)',
                      border: '6px solid var(--cu-navy-dark)',
                      outline: state.active ? '1.5px solid var(--cu-gold-bright)' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '16px',
                      boxShadow: state.active ? '0 30px 60px -12px rgba(12, 35, 64, 0.28)' : '0 10px 25px -10px rgba(0,0,0,0.3)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      display: state.visible ? 'flex' : 'none',
                      flexDirection: 'column'
                    }}
                    animate={{
                      x: state.x,
                      scale: state.scale,
                      rotate: state.rotate,
                      opacity: state.opacity,
                      zIndex: state.zIndex
                    }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    onClick={() => {
                      if (state.active) {
                        onEnterPortal({ day: poster.day });
                      } else {
                        setCurrentIndex(index);
                      }
                    }}
                  >
                    <img 
                      src={poster.url} 
                      alt={poster.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                    />

                    {/* Text info capsule on active poster only */}
                    {state.active && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background: 'linear-gradient(to top, rgba(5, 16, 30, 0.96) 0%, rgba(5, 16, 30, 0.7) 75%, transparent 100%)',
                          padding: '24px 20px 18px',
                          color: '#ffffff',
                          textAlign: 'left'
                        }}
                      >
                        <span className="badge-gold" style={{ fontSize: '0.62rem', padding: '2px 8px', background: 'var(--cu-gold)', color: '#ffffff', border: 'none', marginBottom: '8px', display: 'inline-block' }}>
                          Day {poster.day} Poster
                        </span>
                        <h4 style={{ color: '#ffffff', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.35, marginBottom: '4px' }}>
                          {poster.title}
                        </h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                          {poster.speaker}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Slide controls overlay */}
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                style={{ position: 'absolute', left: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(12,35,64,0.1)', color: 'var(--cu-navy)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                style={{ position: 'absolute', right: '-20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.92)', border: '1px solid rgba(12,35,64,0.1)', color: 'var(--cu-navy)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Indicator dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
              {carouselPosters.map((_, idx) => (
                <div 
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  style={{
                    width: currentIndex === idx ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: currentIndex === idx ? 'var(--cu-navy)' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Section 1: Department Legacy & Core Values */}
      <section id="about-dept" style={{ padding: '85px 0', borderTop: '1px solid rgba(12, 35, 64, 0.06)', background: 'rgba(224, 242, 254, 0.25)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(to bottom, rgba(224, 242, 254, 0.15) 0%, rgba(255, 253, 240, 0.15) 100%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="about-grid">
            
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <span className="badge">Academic Ethos</span>
              <h2 style={{ fontSize: '2.2rem', margin: '12px 0 18px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                Legacy of Academic Leadership
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.98rem', lineHeight: 1.7 }}>
                At Christ (Deemed to be University), our curriculum is designed around continuous learner feedback, academic rigor, and state-of-the-art computational tools. 
                Under the direction of Dr. Fr. Jossy P George and our experienced faculty heads, postgraduates build critical competencies for computing careers.
              </p>
              
              <button 
                onClick={() => onEnterPortal({ day: 2 })}
                className="btn-secondary"
                style={{ padding: '10px 22px', fontSize: '0.85rem' }}
              >
                Explore Day 2 Core Keys <ArrowRight size={14} />
              </button>
            </motion.div>

            {/* Cards Grid with Framer Motion Staggered in View */}
            <motion.div 
              className="about-cards-grid"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={containerVariants}
            >
              {[
                { icon: <GraduationCap size={24} />, title: "Distinguished Mentors", desc: "Interactive teaching led by PhD scholars and experienced computational experts." },
                { icon: <Award size={24} />, title: "NAAC Accredited Ethos", desc: "Syllabi continuously audited against global academic standards." },
                { icon: <Building size={24} />, title: "Advanced Lab Spaces", desc: "Dedicated cloud computing infrastructures and software testbeds." },
                { icon: <BookOpen size={24} />, title: "Holistic Core Guidelines", desc: "Briefings covering professional ethics, cyber security sensitization, and research methodologies." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  variants={itemVariants}
                  className="academic-panel" 
                  style={{ padding: '24px', background: '#ffffff', borderRadius: '14px' }}
                  whileHover={{ y: -6, scale: 1.02, border: '1.5px solid var(--cu-gold-bright)' }}
                >
                  <div style={{ color: 'var(--cu-navy)', marginBottom: '12px' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ marginBottom: '6px', fontSize: '0.98rem', fontWeight: 800, color: 'var(--cu-navy-dark)' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW: Director's Desk Section */}
      <section id="director-desk" style={{ padding: '90px 0', background: '#ffffff', position: 'relative' }}>
        <div className="container">
          <div className="director-grid">
            
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <span className="badge-gold" style={{ boxShadow: '0 2px 8px rgba(170,124,17,0.05)' }}>Welcome Message</span>
              <h2 style={{ fontSize: '2.2rem', margin: '12px 0 18px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                From the Director's Desk
              </h2>
              
              {/* Premium signature quote box */}
              <div style={{ position: 'relative', borderLeft: '4px solid var(--cu-gold)', paddingLeft: '24px', margin: '24px 0', background: 'rgba(254, 252, 240, 0.45)', padding: '20px 24px', borderRadius: '0 12px 12px 0', border: '1px solid rgba(170,124,17,0.08)', borderLeftWidth: '5px' }}>
                <span style={{ position: 'absolute', top: '-10px', left: '10px', fontSize: '5rem', color: 'rgba(170,124,17,0.06)', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none' }}>“</span>
                <p style={{ fontSize: '1.05rem', color: 'var(--cu-navy)', fontStyle: 'italic', lineHeight: 1.6, fontWeight: 500, position: 'relative', zIndex: 1 }}>
                  "Our vision is focused on holistic development. We encourage postgraduate scholars in Computer Science to pursue computing excellence, maintain an ethical compass, and innovate responsibly."
                </p>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '28px' }}>
                Dr. Fr. Jossy P George leads the Central Campus administration, guiding the department toward cutting-edge research outputs. 
                His address on Day 2 of orientation establishes the core expectations of academic discipline, innovation, and leadership attributes.
              </p>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--cu-navy-light)', color: 'var(--cu-navy)', display: 'flex', alignItems: 'center', justify: 'center', border: '1px solid rgba(12,35,64,0.1)' }}>
                  <UserCheck size={22} />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.96rem', color: 'var(--cu-navy-dark)', fontWeight: 700 }}>Dr. Fr. Jossy P George</strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Director, Christ University (Central Campus)</span>
                </div>
              </div>
            </motion.div>

            {/* Keynote address card */}
            <motion.div 
              className="academic-panel"
              style={{ padding: '34px', background: 'var(--cu-gold-light)', borderRadius: '18px', border: '1.5px solid rgba(170, 124, 17, 0.15)' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span style={{ fontSize: '0.62rem', background: 'var(--cu-navy)', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05rem', display: 'inline-block', marginBottom: '10px' }}>
                Day 2 Keynote Spotlight
              </span>
              <h4 style={{ color: 'var(--cu-navy-dark)', fontSize: '1.1rem', fontWeight: 800, marginBottom: '14px', fontFamily: 'var(--font-serif)' }}>Keynote Address Highlights</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem', color: 'var(--text-main)' }}>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                  <CheckCircle size={15} style={{ color: 'var(--cu-gold)', marginTop: '2px', flexShrink: 0 }} />
                  <span>Emphasis on academic integrity, ethics, and research mindset.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                  <CheckCircle size={15} style={{ color: 'var(--cu-gold)', marginTop: '2px', flexShrink: 0 }} />
                  <span>Integration of computing curricula with global industrial demands.</span>
                </li>
                <li style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                  <CheckCircle size={15} style={{ color: 'var(--cu-gold)', marginTop: '2px', flexShrink: 0 }} />
                  <span>Nurturing social commitment and community-centric code of conduct.</span>
                </li>
              </ul>

              <div style={{ marginTop: '24px', borderTop: '1px dashed rgba(170,124,17,0.25)', paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <div>
                  <strong>VENUE</strong>
                  <span style={{ display: 'block', color: 'var(--cu-navy)', fontWeight: 700 }}>KE Auditorium</span>
                </div>
                <div>
                  <strong>SCHEDULE</strong>
                  <span style={{ display: 'block', color: 'var(--cu-navy)', fontWeight: 700 }}>9:00 AM, Day 2</span>
                </div>
              </div>

              <motion.button 
                onClick={() => onEnterPortal({ day: 2 })}
                className="btn-primary" 
                style={{ width: '100%', marginTop: '22px', padding: '12px', fontSize: '0.82rem', borderRadius: '8px', justifyContent: 'center' }}
                whileHover={{ scale: 1.02 }}
              >
                Go to Keynote Schedule
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* NEW: Curriculum Roadmap Timeline Section */}
      <section id="roadmap" style={{ padding: '90px 0', borderTop: '1px solid rgba(12, 35, 64, 0.06)', background: 'rgba(224, 242, 254, 0.18)', position: 'relative' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge">Academic Lifecycle</span>
            <h2 style={{ fontSize: '2.2rem', margin: '12px 0 10px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>Curriculum Roadmap</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '0.94rem' }}>
              A visual roadmap tracing the computational learning stages of the MCA & MSc batches.
            </p>
          </div>

          {/* Roadmap Horizontal Grid with Staggered animations */}
          <motion.div 
            className="roadmap-grid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            {/* Visual connecting line behind */}
            <div className="roadmap-line" />

            {[
              { stage: "Stage 1", title: "Orientation & Induction", status: "Active Phase", desc: "Policy briefings, AI ethics introduction, computational primers, and student scholarship awareness." },
              { stage: "Stage 2", title: "Core Academics", status: "Semesters 1-2", desc: "Intense software engineering modules, deep learning labs, database systems, and data structures." },
              { stage: "Stage 3", title: "Specialization & Labs", status: "Semester 3", desc: "Outbound retreats, research publications, special interest groups, and industry collaborative projects." },
              { stage: "Stage 4", title: "Corporate Placement", status: "Semester 4 & Beyond", desc: "Placement cell briefings, recruiting opportunities, internship applications, and portfolio reviews." }
            ].map((node, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="academic-panel"
                style={{ padding: '28px 24px', background: '#ffffff', borderRadius: '14px', zIndex: 2, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}
                whileHover={{ y: -6 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--cu-navy)', color: 'var(--cu-gold-bright)', display: 'flex', alignItems: 'center', justify: 'center', fontSize: '0.8rem', fontWeight: 800 }}>
                    {index + 1}
                  </div>
                  <span style={{ fontSize: '0.62rem', background: index === 0 ? 'var(--cu-navy-light)' : '#f1f5f9', color: index === 0 ? 'var(--cu-navy)' : 'var(--text-muted)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                    {node.status}
                  </span>
                </div>
                <span style={{ fontSize: '0.68rem', color: 'var(--cu-gold)', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>{node.stage}</span>
                <h4 style={{ fontSize: '0.96rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '10px' }}>{node.title}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: 'auto' }}>{node.desc}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Section 2: Programs Offered */}
      <section id="programs" style={{ padding: '90px 0' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="badge">Academic Programs</span>
            <h2 style={{ fontSize: '2.2rem', margin: '12px 0 10px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>Flagship Postgraduate Programs</h2>
            <p style={{ color: 'var(--text-muted)', maxWidth: '580px', margin: '0 auto', fontSize: '0.94rem' }}>
              Explore the two distinct computational programs offered by the Department of Computer Science.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }} className="programs-grid">
            
            {/* MCA Card */}
            <motion.div 
              className="academic-panel" 
              style={{ 
                padding: '38px', 
                background: 'linear-gradient(180deg, #ffffff 0%, var(--bg-secondary) 100%)', 
                border: '1px solid rgba(12,35,64,0.08)',
                borderRadius: '18px',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px'
              }}
              whileHover={{ y: -8, border: '1.5px solid var(--cu-navy)' }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: 'var(--cu-navy-light)', padding: '8px', borderRadius: '8px', color: 'var(--cu-navy)', display: 'flex' }}>
                  <Terminal size={22} />
                </div>
                <span className="badge" style={{ fontSize: '0.65rem' }}>2 Years (MCA)</span>
              </div>
              
              <h3 style={{ fontSize: '1.3rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                Master of Computer Applications (MCA)
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                A highly comprehensive, application-focused curriculum covering modern software engineering, web application development, cloud architectures, database systems, and mobile systems programming. Designed to build elite technical leaders.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0 10px' }}>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(12,35,64,0.1)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--text-main)' }}>Software Engineering</span>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(12,35,64,0.1)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--text-main)' }}>Cloud Deployments</span>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(12,35,64,0.1)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--text-main)' }}>Web Technologies</span>
              </div>

              {/* Accordion Toggle Button */}
              <button 
                onClick={() => setMcaExpanded(!mcaExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--cu-navy)', 
                  fontWeight: 800, 
                  fontSize: '0.8rem', 
                  cursor: 'pointer',
                  padding: '4px 0',
                  outline: 'none',
                  alignSelf: 'flex-start'
                }}
              >
                {mcaExpanded ? (
                  <>Hide Curriculum Details <ChevronUp size={15} /></>
                ) : (
                  <>Show Curriculum Details <ChevronDown size={15} /></>
                )}
              </button>

              {/* Accordion Expandable Content */}
              <div className={`expandable-panel ${mcaExpanded ? 'expanded' : ''}`} style={{ borderTop: mcaExpanded ? '1px dashed rgba(12,35,64,0.15)' : 'none', paddingTop: mcaExpanded ? '16px' : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: 'var(--cu-navy)', display: 'block', marginBottom: '4px' }}>Core Subjects Covered:</strong>
                    <ul style={{ paddingLeft: '18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', color: 'var(--text-main)' }}>
                      <li>Advanced Web Development</li>
                      <li>Enterprise Java (EE)</li>
                      <li>Cloud & Microservices</li>
                      <li>Data Science & ML</li>
                      <li>Distributed Databases</li>
                      <li>Mobile Programming</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--cu-navy)', display: 'block', marginBottom: '4px' }}>Lab Infrastructures:</strong>
                    <p style={{ color: 'var(--text-muted)' }}>Systems Development Lab, Web Architectures Research Lab, Virtual Cloud Testbed.</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--cu-navy)', display: 'block', marginBottom: '4px' }}>Target Careers:</strong>
                    <p style={{ color: 'var(--text-muted)' }}>Full-Stack Engineer, Cloud Architect, DevOps Specialist, System Analyst.</p>
                  </div>
                </div>
              </div>
              
              <motion.button 
                onClick={() => onEnterPortal({ category: 'Technical' })}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', marginTop: 'auto', padding: '10px 22px', fontSize: '0.82rem', borderRadius: '8px' }}
                whileHover={{ scale: 1.05 }}
              >
                Explore Technical Modules <ArrowRight size={14} />
              </motion.button>
            </motion.div>

            {/* MSc AIML Card */}
            <motion.div 
              className="academic-panel" 
              style={{ 
                padding: '38px', 
                background: 'linear-gradient(180deg, #ffffff 0%, var(--cu-gold-light) 100%)', 
                border: '1px solid rgba(170,124,17,0.15)',
                borderRadius: '18px',
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px'
              }}
              whileHover={{ y: -8, border: '1.5px solid var(--cu-gold-bright)' }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ background: 'var(--cu-gold-light)', padding: '8px', borderRadius: '8px', color: 'var(--cu-gold)', display: 'flex' }}>
                  <Cpu size={22} />
                </div>
                <span className="badge-gold" style={{ fontSize: '0.65rem' }}>2 Years (MSc AIML)</span>
              </div>
              
              <h3 style={{ fontSize: '1.3rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                MSc in Artificial Intelligence & ML
              </h3>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                Tailored for the next generation of AI researchers and practitioners. Focuses on neural networks, deep learning algorithms, computer vision, natural language processing, ethical AI adoption, and advanced data modeling.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '6px 0 10px' }}>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(170, 124, 17, 0.2)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--cu-gold)' }}>Deep Learning</span>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(170, 124, 17, 0.2)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--cu-gold)' }}>Computer Vision</span>
                <span style={{ fontSize: '0.72rem', background: '#ffffff', border: '1px solid rgba(170, 124, 17, 0.2)', padding: '4px 8px', borderRadius: '6px', fontWeight: 600, color: 'var(--cu-gold)' }}>Generative AI Ethics</span>
              </div>

              {/* Accordion Toggle Button */}
              <button 
                onClick={() => setAimlExpanded(!aimlExpanded)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  background: 'none', 
                  border: 'none', 
                  color: 'var(--cu-gold)', 
                  fontWeight: 800, 
                  fontSize: '0.8rem', 
                  cursor: 'pointer',
                  padding: '4px 0',
                  outline: 'none',
                  alignSelf: 'flex-start'
                }}
              >
                {aimlExpanded ? (
                  <>Hide Curriculum Details <ChevronUp size={15} /></>
                ) : (
                  <>Show Curriculum Details <ChevronDown size={15} /></>
                )}
              </button>

              {/* Accordion Expandable Content */}
              <div className={`expandable-panel ${aimlExpanded ? 'expanded' : ''}`} style={{ borderTop: aimlExpanded ? '1px dashed rgba(170,124,17,0.25)' : 'none', paddingTop: aimlExpanded ? '16px' : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <strong style={{ color: 'var(--cu-gold)', display: 'block', marginBottom: '4px' }}>Core Subjects Covered:</strong>
                    <ul style={{ paddingLeft: '18px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', color: 'var(--text-main)' }}>
                      <li>Neural Networks & ML</li>
                      <li>Deep Learning & PyTorch</li>
                      <li>Natural Language Proc (NLP)</li>
                      <li>Computer Vision Systems</li>
                      <li>Generative AI Tools & LLMs</li>
                      <li>Reinforcement Learning</li>
                    </ul>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--cu-gold)', display: 'block', marginBottom: '4px' }}>Lab Infrastructures:</strong>
                    <p style={{ color: 'var(--text-muted)' }}>High-Performance GPU Computing Cluster, AI & Robotics Innovation Lab.</p>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--cu-gold)', display: 'block', marginBottom: '4px' }}>Target Careers:</strong>
                    <p style={{ color: 'var(--text-muted)' }}>AI Engineer, Machine Learning Developer, Computer Vision Specialist, Data Scientist.</p>
                  </div>
                </div>
              </div>
              
              <motion.button 
                onClick={() => onEnterPortal({ day: 3 })}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', marginTop: 'auto', padding: '10px 22px', fontSize: '0.82rem', borderRadius: '8px' }}
                whileHover={{ scale: 1.05 }}
              >
                Explore AI Modules <ArrowRight size={14} />
              </motion.button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: Placements & Industry Links */}
      <section id="placements" style={{ padding: '85px 0', borderTop: '1px solid rgba(12, 35, 64, 0.06)', borderBottom: '1px solid rgba(12, 35, 64, 0.06)', background: 'rgba(224, 242, 254, 0.18)', position: 'relative' }}>
        <div className="container">
          <div className="placements-grid">
            
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <span className="badge">Placements & Careers</span>
              <h2 style={{ fontSize: '2.2rem', margin: '12px 0 18px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                Corporate Outreach & Readiness
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.98rem', lineHeight: 1.7 }}>
                Our corporate outreach cell aligns postgraduates with top recruiting firms like OpenText, Volvo Group, and Mphasis. 
                Student mentors and placement representatives brief cohorts on guidelines and requirements early in the program.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--cu-gold)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 650, color: 'var(--cu-navy-dark)' }}>Strong recruiting networks with global software firms.</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <CheckCircle size={18} style={{ color: 'var(--cu-gold)' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 650, color: 'var(--cu-navy-dark)' }}>Detailed briefings detailing CGPA parameters and rules.</span>
                </div>
              </div>

              <button 
                onClick={() => onEnterPortal({ category: 'Placements' })}
                className="btn-primary"
                style={{ padding: '12px 26px', fontSize: '0.85rem' }}
              >
                View Placements Schedule <ArrowRight size={14} />
              </button>
            </motion.div>

            <motion.div 
              className="academic-panel" 
              style={{ 
                padding: '40px', 
                background: '#ffffff', 
                border: '1.5px solid rgba(12,35,64,0.08)',
                textAlign: 'center',
                borderRadius: '18px'
              }}
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h4 style={{ color: 'var(--cu-navy)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Industry Readiness</h4>
              <div style={{ fontSize: '3.6rem', fontWeight: 800, color: 'var(--cu-navy-dark)', margin: '10px 0', letterSpacing: '-0.02rem' }}>100%</div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Dedicated training modules to ensure technical readiness for top-tier companies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 4: Infrastructure & Outbound training */}
      <section id="campus-life" style={{ padding: '90px 0', background: '#ffffff' }}>
        <div className="container">
          <div className="campus-grid">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {[
                { icon: <Library size={22} />, title: "Knowledge Resource Centres", desc: "Library connect briefing showing indexed database access with Dr. Sreekumar." },
                { icon: <MapPin size={22} />, title: "Outbound Retreats", desc: "Dedicated retreat coordinates at Kengeri Campus, sustainability pledges and fresher talent showcase." }
              ].map((card, idx) => (
                <motion.div 
                  key={idx}
                  className="academic-panel" 
                  style={{ padding: '24px', background: '#ffffff', display: 'flex', gap: '18px', alignItems: 'start', borderRadius: '14px' }}
                  whileHover={{ x: 6, border: '1.5px solid var(--cu-navy)' }}
                >
                  <div style={{ background: 'var(--cu-navy-light)', padding: '10px', borderRadius: '8px', color: 'var(--cu-navy)', display: 'flex' }}>
                    {card.icon}
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '6px', fontSize: '1rem', fontWeight: 800, color: 'var(--cu-navy-dark)' }}>{card.title}</h4>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUpVariant}
            >
              <span className="badge">Student Resources</span>
              <h2 style={{ fontSize: '2.2rem', margin: '12px 0 18px', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>
                Wellbeing & Academic Support
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '26px', fontSize: '0.98rem', lineHeight: 1.7 }}>
                Our academic framework incorporates extensive student support. 
                From database and reference archives briefing sessions to stress management counseling coordinates, we prioritize student wellbeing.
              </p>
              
              <button 
                onClick={() => onEnterPortal({ query: 'Library' })}
                className="btn-secondary"
                style={{ padding: '10px 22px', fontSize: '0.85rem' }}
              >
                View Support Activities <ArrowRight size={14} />
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--cu-navy-dark)', color: '#ffffff', padding: '75px 0 35px', borderTop: '1.5px solid rgba(255,255,255,0.04)' }}>
        <div className="container footer-grid">
          
          {/* Col 1: Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src="/christ_logo.png" 
                alt="Christ University Logo" 
                style={{ height: '44px', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} 
              />
            </div>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              Dedicated to nurturing tech specialists through professional competency, research publications, and societal commitment. Accredited 'A+' grade by NAAC.
            </p>
            <div>
              <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--cu-gold-bright)', border: 'none' }}>NAAC A+ Accredited</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.02em', fontWeight: 700 }}>Quick Links</strong>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#about-dept" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="nav-hover">Legacy & History</a></li>
              <li><a href="#director-desk" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="nav-hover">Welcome Message</a></li>
              <li><a href="#roadmap" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="nav-hover">Curriculum Roadmap</a></li>
              <li><a href="#programs" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }} className="nav-hover">Postgraduate Programs</a></li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.85rem' }}>
            <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.02em', fontWeight: 700 }}>Contact Details</strong>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <MapPin size={16} style={{ color: 'var(--cu-gold-bright)' }} />
                <span>Hosur Road, Bengaluru - 560029, India</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <Mail size={16} style={{ color: 'var(--cu-gold-bright)' }} />
                <span>hod.computerscience@christuniversity.in</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'rgba(255,255,255,0.7)' }}>
                <Phone size={16} style={{ color: 'var(--cu-gold-bright)' }} />
                <span>+91 80 4012 9100</span>
              </div>
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            &copy; 2026 Christ University, Bangalore. All Rights Reserved.
          </span>
          <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
            Department of Computer Science
          </span>
        </div>
      </footer>

    </div>
  );
}
