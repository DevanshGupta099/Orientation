import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  MapPin, 
  User, 
  Image as ImageIcon, 
  X, 
  Send,
  MessageSquare,
  Mail,
  Phone,
  CalendarCheck,
  BookOpen
} from 'lucide-react';
import { sessionsData } from '../data/sessionsData';

export default function OrientationsPage({ initialFilters, onBackToHome }) {
  const totalSlotsCount = sessionsData.length;

  // Day Filter State
  const [selectedDay, setSelectedDay] = useState(() => {
    if (initialFilters && initialFilters.day !== undefined) {
      return initialFilters.day;
    }
    return 'all';
  });
  
  // Search state for sessions
  const [searchQuery, setSearchQuery] = useState(() => {
    if (initialFilters) {
      if (initialFilters.query) return initialFilters.query;
    }
    return '';
  });

  // Batch Filter State: "all" | "mca" | "aiml"
  const [batchFilter, setBatchFilter] = useState(() => {
    if (initialFilters && initialFilters.category) {
      if (initialFilters.category.toLowerCase() === 'mca') return 'mca';
      if (initialFilters.category.toLowerCase() === 'aiml') return 'aiml';
    }
    return 'all';
  });

  // Category Filter Pill State: "all" | specific category
  const [activeCategory, setActiveCategory] = useState(() => {
    if (initialFilters && initialFilters.category) {
      const cat = initialFilters.category;
      if (cat !== 'mca' && cat !== 'aiml') return cat;
    }
    return 'all';
  });
  
  // Active selected session ID for separate detailed page
  const [detailSessionId, setDetailSessionId] = useState(null);

  // Lightbox State for zooming poster images
  const [activePoster, setActivePoster] = useState(null);

  // Reflections feed filters & sorting
  const [reflectionSearch, setReflectionSearch] = useState('');
  const [reflectionSort, setReflectionSort] = useState('recent'); // 'recent' | 'popular'
  
  // Reflections Memory Board State
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('cu_orientation_memories');
    if (saved) return JSON.parse(saved);
    
    return [
      {
        id: "m1",
        sessionId: "s4",
        name: "Praneeth M",
        batch: "MCA",
        content: "Designing the posters for Deepa Ma'am and the Student Council sessions was an amazing learning experience! Loved how interactive the sessions were.",
        date: "27/05/2026",
        mood: "social",
        upvotes: 6
      },
      {
        id: "m2",
        sessionId: "s12",
        name: "Jatin Sharma",
        batch: "MSc AIML",
        content: "The Responsible Use of AI session was eye-opening. Dr. Deepa explained clearly how we should treat LLMs as co-pilots and avoid academic dishonesty.",
        date: "27/05/2026",
        mood: "insightful",
        upvotes: 9
      },
      {
        id: "m3",
        sessionId: "s17",
        name: "Kusum S",
        batch: "MCA",
        content: "GitHub and LinkedIn peer sessions were very helpful. Got my portfolio repository set up with help from our seniors. Extremely grateful!",
        date: "29/05/2026",
        mood: "tech",
        upvotes: 4
      }
    ];
  });

  // Form states for new memory note
  const [newMemory, setNewMemory] = useState({
    name: '',
    batch: 'MCA',
    content: '',
    mood: 'insightful'
  });

  // Persist Reflections Feed
  useEffect(() => {
    localStorage.setItem('cu_orientation_memories', JSON.stringify(memories));
  }, [memories]);

  // Submit Reflection Note
  const handleMemorySubmit = (e) => {
    e.preventDefault();
    if (!newMemory.name.trim() || !newMemory.content.trim()) return;

    const memoryItem = {
      id: 'mem_' + Date.now(),
      sessionId: 'general',
      name: newMemory.name,
      batch: newMemory.batch,
      content: newMemory.content,
      date: new Date().toLocaleDateString('en-GB'),
      mood: newMemory.mood,
      upvotes: 0
    };

    setMemories([memoryItem, ...memories]);
    setNewMemory({
      name: '',
      batch: 'MCA',
      content: '',
      mood: 'insightful'
    });
  };

  const handleUpvote = (id) => {
    setMemories(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, upvotes: (m.upvotes || 0) + 1 };
      }
      return m;
    }));
  };

  // Day mapping categories
  const daysMapping = [
    { value: 'all', label: 'All Days', date: '25 May - 13 Jun' },
    { value: 1, label: 'Day 1', date: '25 May (Mon)' },
    { value: 2, label: 'Day 2', date: '26 May (Tue)' },
    { value: 3, label: 'Day 3', date: '27 May (Wed)' },
    { value: 4, label: 'Day 4', date: '29 May (Fri)' },
    { value: 5, label: 'Day 5', date: '30 May (Sat)' },
    { value: 6, label: 'Day 6', date: '06 Jun (Sat)' },
    { value: 7, label: 'Day 7', date: '13 Jun (Sat)' }
  ];

  // Category tags inside the timeline
  const categoryPills = [
    { value: 'all', label: 'All Fields' },
    { value: 'Keynote', label: 'Keynotes' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Ethics', label: 'Ethics & Values' },
    { value: 'Placements', label: 'Placements' },
    { value: 'Clubs', label: 'Clubs & Fests' },
    { value: 'Support', label: 'Support & Resource' }
  ];

  // Poster Marquee Array
  const marqueePosters = [
    { url: "/posters/11AM-1230PM_25May2026_InstitutionalPolicy-CampusCulture.png", title: "Institutional Policy & Campus Culture", speaker: "Dr. Rupali Wagh" },
    { url: "/posters/09AM-10AM_26May2026.png", title: "Director's Keynote Address", speaker: "Dr. Fr. Jossy P George" },
    { url: "/posters/27May2026_10-11AM_ResponsibleUseOfAI.png", title: "Responsible Use of Generative AI", speaker: "Dr. Deepa V Jose" },
    { url: "/posters/2pm  3pm (1080 px x 1515px) .png", title: "Cyber Laws & Cyber Safety", speaker: "Dr. Diya C R" },
    { url: "/posters/3pm  4 pm (1080 x 1515px).png", title: "Career Launchpad", speaker: "Placement Representatives" },
    { url: "/posters/27May11AM-12Noon_BeyondAcademics_ClubsCentresAndFests.png", title: "Beyond Academics: Clubs & Fests", speaker: "Student Council" },
    { url: "/posters/10am 12pm (1080 x 1515px).png", title: "Computational Skills Session I", speaker: "Dr. Binayak Dutta" },
    { url: "/posters/1230PM-1PM_25May2026_ChristiteValues-ProfessionalEthics.png", title: "Christite Values & Professional Ethics", speaker: "Dr. Gobi R" },
    { url: "/posters/12pm  1pm (1080 x 1515 px).png", title: "Library Connect", speaker: "Dr. Sreekumar" },
    { url: "/posters/12pm  1pm (1080 x 1515px) (1).png", title: "Student Scholarship Opportunities", speaker: "Dr. Rajesh Kanna" },
    { url: "/posters/12pm  1pm (1920 x 1080 px).png", title: "Tech Networking for Career Growth", speaker: "Akshay Singhal" },
    { url: "/posters/2PM-3PM_25May2026_IcebreakingSession.png", title: "Ice-breaking Session", speaker: "Senior Students" },
    { url: "/posters/2pm  4pm (1920 x 1080 px).png", title: "Skills AI Cannot Replace", speaker: "Dr. Emmanuel Daniel" },
    { url: "/posters/9am 11am (1080 x 1515px).png", title: "Code and Connect: GitHub & LinkedIn", speaker: "Senior Students" }
  ];

  // Double the array to make the marquee seamless
  const doubleMarqueePosters = [...marqueePosters, ...marqueePosters];

  // Map speaker details dynamically
  const getSpeakerDetails = (speakerName) => {
    const name = speakerName.toLowerCase();
    
    let designation = "Department Expert & Faculty Member";
    let bio = "Distinguished academician at Christ (Deemed to be University), focusing on PG cohort guidance, research mentoring, and software capability building.";
    let initials = "CU";
    let socials = {
      linkedin: "https://linkedin.com",
      mail: "mailto:hod.computerscience@christuniversity.in",
      twitter: "https://twitter.com",
      github: "https://github.com"
    };

    if (name.includes("rupali wagh")) {
      designation = "HoD, Department of Computer Science";
      bio = "Dr. Rupali Wagh leads the Computer Science department. She is dedicated to fostering research innovations, industry partnerships, and advanced software architectures among postgraduate scholars.";
      initials = "RW";
    } else if (name.includes("jossy")) {
      designation = "Director, Christ University (Central Campus)";
      bio = "Dr. Fr. Jossy P George guides the university administration and student welfare. He focuses on value-based computational instruction, societal contributions, and academic excellence.";
      initials = "JG";
    } else if (name.includes("gobi")) {
      designation = "Associate HoD, Computer Science";
      bio = "Dr. Gobi R coordinates academic standards, professional code of conduct, and internal assessments. He ensures every fresher adopts the highest standards of professional ethics.";
      initials = "GR";
    } else if (name.includes("deepa v jose") || name.includes("deepa jose")) {
      designation = "Associate Professor, Computer Science";
      bio = "Dr. Deepa Jose is a researcher in Artificial Intelligence, machine learning ethics, and neural engineering. She advocates for the responsible adoption of GenAI copilots in computing.";
      initials = "DJ";
    } else if (name.includes("binayak dutta")) {
      designation = "Computational logic Mentor & Faculty Member";
      bio = "Dr. Binayak Dutta conducts core algorithmic training, logic structures, and computational thinking programs to bridge the gap between freshers and advanced computing frameworks.";
      initials = "BD";
    } else if (name.includes("cynthia")) {
      designation = "Postgraduate Academic Coordinator";
      bio = "Dr. Cynthia T leads learner-centered program operations, student mentoring support systems, and safety awareness regulations within the department.";
      initials = "CT";
    } else if (name.includes("akshay singhal")) {
      designation = "Analytics Manager, MCA Alumni 2021-23";
      bio = "Akshay Singhal shares professional insights on data modeling, portfolio networking, and business analytics, representing the prestigious department alumni network.";
      initials = "AS";
      socials.github = "https://github.com/akshaysinghal";
    } else if (name.includes("sreekumar")) {
      designation = "Chief Librarian, Knowledge Resource Centre";
      bio = "Dr. Sreekumar directs central library services, journal database access subscription indices, and reference management support systems for computing postgraduates.";
      initials = "SK";
    } else if (name.includes("emmanuel daniel")) {
      designation = "Assistant Professor, School of Social Work";
      bio = "Dr. Emmanuel Daniel specializes in human-centric soft skills development, interpersonal communication, teamwork dynamics, and emotional intelligence pathways in tech careers.";
      initials = "ED";
    } else if (name.includes("diya")) {
      designation = "Assistant Professor, School of Law";
      bio = "Dr. Diya C R leads legal awareness sessions regarding the IT Act, information footprints, digital security standards, and campus code of conduct compliance.";
      initials = "DC";
    } else if (name.includes("anisha")) {
      designation = "University Student Counsellor";
      bio = "Ms. Anisha Thampy coordinates student wellness, stress management initiatives, peer support networks, and gender inclusivity sensitizations.";
      initials = "AT";
    }

    if (initials === "CU") {
      const parts = speakerName.split(' ').filter(p => !p.toLowerCase().includes('dr.') && !p.toLowerCase().includes('prof.') && !p.toLowerCase().includes('ms.'));
      if (parts.length > 0) {
        initials = parts.map(p => p[0]).join('').toUpperCase().substring(0, 2);
      }
    }

    return { designation, bio, initials, socials };
  };

  // Filtering Logic
  const filteredSessions = sessionsData.filter(session => {
    // 1. Day Filter
    const matchDay = selectedDay === 'all' || session.day === Number(selectedDay);
    
    // 2. Search query filter
    const matchQuery = searchQuery.trim() === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.topics.some(t => {
        const text = typeof t === 'object' ? `${t.title} ${t.detail || ''}` : t;
        return text.toLowerCase().includes(searchQuery.toLowerCase());
      }) ||
      session.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.venue.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 3. Category filter
    const matchCategory = activeCategory === 'all' || 
      session.category.toLowerCase() === activeCategory.toLowerCase();

    // 4. Program/Batch Filter
    let matchBatch = true;
    if (batchFilter === 'mca') {
      const isAimlOnly = (session.title.toLowerCase().includes('aiml') || session.description.toLowerCase().includes('aiml')) &&
                          !(session.title.toLowerCase().includes('mca') || session.description.toLowerCase().includes('mca'));
      matchBatch = !isAimlOnly;
    } else if (batchFilter === 'aiml') {
      const isMcaOnly = (session.title.toLowerCase().includes('mca') || session.description.toLowerCase().includes('mca')) &&
                        !(session.title.toLowerCase().includes('aiml') || session.description.toLowerCase().includes('aiml'));
      matchBatch = !isMcaOnly;
    }

    return matchDay && matchQuery && matchCategory && matchBatch;
  });

  const getCategoryStyles = (category) => {
    switch (category.toLowerCase()) {
      case 'keynote':
        return { bg: 'var(--cu-gold-light)', border: 'rgba(170, 124, 17, 0.15)', text: 'var(--cu-gold)' };
      case 'technical':
        return { bg: 'var(--cu-navy-light)', border: 'rgba(12, 35, 64, 0.12)', text: 'var(--cu-navy)' };
      case 'ethics':
        return { bg: '#f0fdf4', border: 'rgba(21, 128, 61, 0.15)', text: '#15803d' };
      case 'placements':
        return { bg: '#fdf8ff', border: 'rgba(107, 33, 168, 0.15)', text: '#6b21a8' };
      case 'clubs':
        return { bg: '#fff5f5', border: 'rgba(190, 18, 60, 0.15)', text: '#c53030' };
      default:
        return { bg: 'var(--bg-secondary)', border: 'rgba(12, 35, 64, 0.1)', text: 'var(--cu-navy)' };
    }
  };

  const getMoodConfig = (mood) => {
    switch (mood) {
      case 'insightful':
        return { class: 'sticker-navy', label: '💡 Insightful', color: 'var(--cu-navy)' };
      case 'motivating':
        return { class: 'sticker-gold', label: '🔥 Motivating', color: 'var(--cu-gold)' };
      case 'tech':
        return { class: 'sticker-blue', label: '🧠 Tech Focus', color: '#0e7490' };
      case 'social':
        return { class: 'sticker-green', label: '🎉 Social', color: '#15803d' };
      default:
        return { class: 'sticker-navy', label: '💡 Note', color: 'var(--cu-navy)' };
    }
  };

  // Sort reflections
  const filteredMemories = memories.filter(m => {
    return reflectionSearch.trim() === '' || 
      m.name.toLowerCase().includes(reflectionSearch.toLowerCase()) ||
      m.content.toLowerCase().includes(reflectionSearch.toLowerCase());
  });

  if (reflectionSort === 'popular') {
    filteredMemories.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
  } else {
    filteredMemories.sort((a, b) => b.id.localeCompare(a.id));
  }

  // Render separate page detailed view on session click
  const renderSessionDetailView = (session) => {
    if (!session) return null;
    const speakerInfo = getSpeakerDetails(session.speaker);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* Hero Banner Section with blur poster background and dark overlay */}
        <div style={{
          position: 'relative',
          height: '400px',
          width: '100%',
          backgroundImage: session.poster ? `url(${session.poster})` : 'none',
          backgroundColor: 'var(--cu-navy-dark)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'end',
          color: '#ffffff',
          overflow: 'hidden',
          borderBottom: '4px solid var(--cu-gold)'
        }}>
          {/* Dark Glassmorphic Gradient Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(5, 16, 30, 0.45) 0%, rgba(5, 16, 30, 0.88) 100%)',
            backdropFilter: session.poster ? 'blur(6px)' : 'none',
            zIndex: 1
          }} />

          {/* Action button inside Hero */}
          <motion.button
            onClick={() => setDetailSessionId(null)}
            className="btn-secondary"
            style={{
              position: 'absolute',
              top: '20px',
              left: '24px',
              zIndex: 10,
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(12, 35, 64, 0.15)',
              borderRadius: '8px',
              padding: '7px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--cu-navy)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={15} /> Back to Schedules
          </motion.button>

          {/* Hero text metadata content */}
          <div className="container" style={{
            position: 'relative',
            zIndex: 2,
            paddingBottom: '36px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{
                background: getCategoryStyles(session.category).bg,
                color: getCategoryStyles(session.category).text,
                border: `1px solid ${getCategoryStyles(session.category).border}`,
                fontSize: '0.65rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                padding: '4px 10px',
                borderRadius: '4px',
                letterSpacing: '0.04em'
              }}>
                {session.category}
              </span>
              <span style={{
                background: 'rgba(255, 255, 255, 0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                fontSize: '0.65rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '4px'
              }}>
                Day {session.day} Session Details
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 4vw, 2.3rem)',
              color: '#ffffff',
              fontWeight: 800,
              lineHeight: 1.25,
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              maxWidth: '850px'
            }}>
              {session.title}
            </h1>

            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap',
              fontSize: '0.86rem',
              color: 'rgba(255, 255, 255, 0.9)',
              alignItems: 'center',
              marginTop: '4px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={15} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.speaker}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.time}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={15} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Content & Speaker details segment beneath hero */}
        <div className="container" style={{ width: '100%', padding: '45px 24px 70px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '35px',
            alignItems: 'start'
          }} className="detail-view-grid">
            
            {/* LEFT COLUMN: Overview & Topics takeaway */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Description card */}
              <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={20} style={{ color: 'var(--cu-gold-bright)' }} />
                  Session Overview
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '0.94rem', lineHeight: 1.75 }}>
                  {session.description}
                </p>
              </div>

              {/* In-Depth Coverage */}
              {session.detailedContent && (
                <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={20} style={{ color: 'var(--cu-navy)' }} />
                    In-Depth Session Coverage
                  </h3>
                  {session.detailedContent.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: idx < session.detailedContent.split('\n\n').length - 1 ? '16px' : 0 }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Topics Breakdown Cards */}
              <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '18px', fontFamily: 'var(--font-serif)' }}>
                  Session Topics & Breakdown
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {session.topics.map((topic, idx) => (
                    <div key={idx} style={{
                      background: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      padding: '16px 18px',
                      borderLeft: '3px solid var(--cu-gold)',
                      transition: 'background 0.2s'
                    }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--cu-navy-dark)', display: 'block', marginBottom: '4px' }}>
                        {typeof topic === 'object' ? topic.title : topic}
                      </strong>
                      {typeof topic === 'object' && topic.detail && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>
                          {topic.detail}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaways */}
              {session.keyTakeaways && session.keyTakeaways.length > 0 && (
                <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '14px', fontFamily: 'var(--font-serif)' }}>
                    Key Takeaways
                  </h3>
                  <ul style={{ listStyleType: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {session.keyTakeaways.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{ color: 'var(--cu-gold)', fontWeight: 800, fontSize: '0.9rem', lineHeight: 1.5, flexShrink: 0 }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Objectives Banner */}
              {session.learningObjectives && (
                <div style={{
                  background: 'linear-gradient(135deg, var(--cu-navy) 0%, var(--cu-navy-dark) 100%)',
                  borderRadius: '16px',
                  padding: '28px 30px',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px rgba(12, 35, 64, 0.15)'
                }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '10px', fontFamily: 'var(--font-serif)', color: 'var(--cu-gold-bright)' }}>
                    🎯 Learning Objectives
                  </h3>
                  <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.9)', margin: 0 }}>
                    {session.learningObjectives}
                  </p>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Speaker profile card & poster thumbnail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              
              {/* Keynote Speaker details card */}
              <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1.5px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                  
                  {/* Styled Avatar circle with speaker initials */}
                  <div style={{ 
                    width: '68px', 
                    height: '68px', 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, var(--cu-navy) 0%, var(--cu-gold) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    color: '#ffffff', 
                    fontSize: '1.4rem', 
                    fontWeight: 800, 
                    border: '3px solid #ffffff', 
                    boxShadow: '0 4px 12px rgba(12, 35, 64, 0.12)',
                    flexShrink: 0
                  }}>
                    {speakerInfo.initials}
                  </div>

                  <div>
                    <span style={{ fontSize: '0.62rem', background: 'var(--cu-gold-light)', color: 'var(--cu-gold)', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-block', marginBottom: '4px' }}>
                      Keynote Speaker
                    </span>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--cu-navy-dark)', fontWeight: 800, lineHeight: 1.25 }}>
                      {session.speaker}
                    </h4>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 650, display: 'block', marginTop: '2px' }}>
                      {speakerInfo.designation}
                    </span>
                  </div>
                </div>

                {/* Speaker Biography */}
                <div>
                  <strong style={{ fontSize: '0.74rem', color: 'var(--cu-navy)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Speaker Biography</strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {speakerInfo.bio}
                  </p>
                </div>

                {/* Interactive Social icons */}
                <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  <strong style={{ fontSize: '0.74rem', color: 'var(--cu-navy)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Professional Socials</strong>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <a href={speakerInfo.socials.linkedin} target="_blank" rel="noreferrer" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#0077b5', transition: 'transform 0.2s', fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-sans, sans-serif)', textDecoration: 'none' }} className="nav-hover">
                      in
                    </a>
                    <a href={speakerInfo.socials.mail} style={{ color: 'var(--cu-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: 'var(--cu-navy-light)', transition: 'transform 0.2s' }} className="nav-hover">
                      <Mail size={16} />
                    </a>
                    <a href={speakerInfo.socials.twitter} target="_blank" rel="noreferrer" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#0f1419', transition: 'transform 0.2s', fontSize: '0.9rem', fontWeight: 800, fontFamily: 'var(--font-sans, sans-serif)', textDecoration: 'none' }} className="nav-hover">
                      X
                    </a>
                    {speakerInfo.socials.github && (
                      <a href={speakerInfo.socials.github} target="_blank" rel="noreferrer" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#24292e', transition: 'transform 0.2s', fontSize: '0.75rem', fontWeight: 800, fontFamily: 'var(--font-sans, sans-serif)', textDecoration: 'none' }} className="nav-hover">
                        git
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Poster card image thumbnail */}
              {session.poster && (
                <div className="academic-panel" style={{ padding: '24px', background: '#ffffff', border: '1.5px solid var(--card-border)' }}>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '14px', fontFamily: 'var(--font-serif)' }}>Official Session Poster</h4>
                  <div 
                    onClick={() => setActivePoster({ url: session.poster, title: session.title, speaker: session.speaker })}
                    className="detail-poster-img-container"
                    style={{ 
                      position: 'relative', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      cursor: 'zoom-in',
                      border: '2px solid rgba(170, 124, 17, 0.12)',
                      background: 'var(--bg-secondary)',
                      padding: '8px'
                    }}
                  >
                    <img 
                      src={session.poster} 
                      alt={session.title} 
                      style={{ 
                        width: '100%', 
                        maxHeight: '380px', 
                        objectFit: 'contain',
                        borderRadius: '8px',
                        transition: 'transform 0.3s ease' 
                      }} 
                    />
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(12, 35, 64, 0.08)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.2s'
                    }} className="detail-poster-overlay">
                      <span style={{ background: 'var(--cu-navy)', color: '#ffffff', fontSize: '0.74rem', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>Zoom Poster</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Institutional detail view footer */}
        <footer style={{ background: 'var(--cu-navy-dark)', color: '#ffffff', padding: '75px 0 35px', borderTop: '1.5px solid rgba(255,255,255,0.04)', marginTop: 'auto' }}>
          <div className="container footer-grid">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <img src="/christ_logo.png" alt="Christ University Logo" style={{ height: '44px', objectFit: 'contain', filter: 'brightness(0) invert(1)', alignSelf: 'flex-start' }} />
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                Dedicated to nurturing tech specialists through professional competency, research publications, and societal commitment. Accredited 'A+' grade by NAAC.
              </p>
              <div>
                <span className="badge-gold" style={{ fontSize: '0.65rem', padding: '4px 10px', background: 'rgba(212, 175, 55, 0.15)', color: 'var(--cu-gold-bright)', border: 'none' }}>NAAC A+ Accredited</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <strong style={{ fontSize: '1rem', color: '#ffffff', letterSpacing: '0.02em', fontWeight: 700 }}>Quick Links</strong>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <li><button onClick={() => setDetailSessionId(null)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">Back to Planner Grid</button></li>
                <li><button onClick={onBackToHome} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">Back to Landing Hub</button></li>
              </ul>
            </div>
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
              </div>
            </div>
          </div>
          <div className="container" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              &copy; 2026 Christ University, Bangalore. All Rights Reserved.
            </span>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              Department of Computer Science
            </span>
          </div>
        </footer>
      </motion.div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Header/Navbar */}
      <motion.header 
        className="glass-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '85px' }}>
          
          {/* Logo Brand */}
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

          {/* Hub Back Action button */}
          <nav>
            <motion.button 
              onClick={onBackToHome}
              className="btn-secondary" 
              style={{ padding: '8px 18px', fontSize: '0.82rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <ArrowLeft size={14} /> Back to Hub
            </motion.button>
          </nav>
        </div>
      </motion.header>

      <AnimatePresence mode="wait">
        {detailSessionId !== null ? (
          renderSessionDetailView(sessionsData.find(s => s.id === detailSessionId))
        ) : (
          <motion.div
            key="planner-list-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            {/* Modern Compact Statistics Ribbon bar */}
            <section style={{ background: 'var(--cu-navy-dark)', color: '#ffffff', padding: '18px 0', borderBottom: '2.5px solid var(--cu-gold-bright)' }}>
              <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>Active Program Overview</span>
                  <strong style={{ display: 'block', fontSize: '1rem', fontWeight: 700, color: 'var(--cu-gold-bright)' }}>MCA & MSc AIML Orientations 2026</strong>
                </div>
                
                <div style={{ display: 'flex', gap: '28px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block', fontWeight: 700 }}>TOTAL DAYS</span>
                    <strong style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 800 }}>7 Days</strong>
                  </div>
                  <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '28px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block', fontWeight: 700 }}>SESSIONS</span>
                    <strong style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 800 }}>{totalSlotsCount} Slots</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Main Schedule workspace */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              {/* Search & Program Filter container */}
              <div className="container" style={{ width: '100%', padding: '28px 24px 12px' }}>
                <div className="academic-panel" style={{ padding: '20px 24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CalendarCheck size={20} style={{ color: 'var(--cu-navy)' }} />
                      <strong style={{ fontSize: '1rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>Academic Calendar Scheduler</strong>
                    </div>

                    {/* Program Selector Tabs */}
                    <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                      {['all', 'mca', 'aiml'].map((b) => (
                        <button 
                          key={b}
                          onClick={() => setBatchFilter(b)}
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.78rem',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: 700,
                            background: batchFilter === b ? '#ffffff' : 'transparent',
                            color: batchFilter === b ? 'var(--cu-navy-dark)' : 'var(--text-muted)',
                            boxShadow: batchFilter === b ? '0 1.5px 3px rgba(0,0,0,0.08)' : 'none',
                            transition: 'all 0.2s'
                          }}
                        >
                          {b === 'all' ? 'All Batches' : b === 'mca' ? 'MCA Focus' : 'MSc AIML Focus'}
                        </button>
                      ))}
                    </div>

                    {/* Search input box */}
                    <div style={{ position: 'relative', width: '260px', minWidth: '160px', flex: '0 1 260px' }}>
                      <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        placeholder="Filter schedule..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ 
                          width: '100%', 
                          background: 'var(--bg-primary)', 
                          border: '1.5px solid #cbd5e1', 
                          borderRadius: '8px', 
                          padding: '8px 8px 8px 32px', 
                          fontSize: '0.8rem',
                          outline: 'none',
                          color: 'var(--text-dark)'
                        }}
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
                        >
                          <X size={12} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Horizontal Day selection tabs bar (Replaces side calendar selector) */}
                  <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '8px', paddingLeft: '4px' }}>
                      Select Day Timeline
                    </span>
                    <div className="top-day-selector">
                      {daysMapping.map(day => {
                        const isActive = selectedDay === day.value;
                        return (
                          <button
                            key={day.value}
                            onClick={() => setSelectedDay(day.value)}
                            className={`day-pill-btn ${isActive ? 'active' : ''}`}
                          >
                            <span>{day.label}</span>
                            <span style={{ opacity: 0.6, fontSize: '0.68rem', fontWeight: 500 }}>
                              ({day.date.split(' ')[0]})
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                    {categoryPills.map(pill => {
                      const isActive = activeCategory.toLowerCase() === pill.value.toLowerCase();
                      return (
                        <button
                          key={pill.value}
                          onClick={() => setActiveCategory(pill.value)}
                          style={{
                            padding: '6px 14px',
                            fontSize: '0.74rem',
                            borderRadius: '9999px',
                            border: '1px solid',
                            borderColor: isActive ? 'var(--cu-navy)' : '#cbd5e1',
                            background: isActive ? 'var(--cu-navy-light)' : '#ffffff',
                            color: isActive ? 'var(--cu-navy)' : 'var(--text-muted)',
                            fontWeight: isActive ? 800 : 600,
                            cursor: 'pointer',
                            transition: 'all 0.18s'
                          }}
                        >
                          {pill.label}
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>

              {/* Schedule grid workspace */}
              <div className="container" style={{ padding: '12px 24px 50px', width: '100%' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingLeft: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Orientation Grid ({filteredSessions.length} sessions listed)
                  </span>
                </div>

                {filteredSessions.length === 0 ? (
                  <div className="academic-panel" style={{ padding: '60px 20px', textAlign: 'center', background: '#ffffff' }}>
                    <CalendarCheck size={36} style={{ color: 'var(--text-muted)', marginBottom: '12px', opacity: 0.5 }} />
                    <h4 style={{ fontSize: '0.94rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '4px' }}>No Sessions Match Filters</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Try resetting the query string or batch criteria filters.</p>
                  </div>
                ) : (
                  // Full Grid displaying detailed card information directly, click to enter detail view
                  <div className="sessions-grid">
                    {filteredSessions.map(session => (
                      <motion.div
                        key={session.id}
                        onClick={() => setDetailSessionId(session.id)}
                        className="academic-panel"
                        style={{
                          padding: '24px',
                          background: '#ffffff',
                          border: '1.5px solid var(--card-border)',
                          borderRadius: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '14px',
                          height: '100%',
                          cursor: 'pointer'
                        }}
                        whileHover={{ y: -6, border: '1.5px solid var(--cu-gold)', boxShadow: 'var(--card-shadow-hover)' }}
                      >
                        {/* Card Header: Category & Day */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{
                            background: getCategoryStyles(session.category).bg,
                            color: getCategoryStyles(session.category).text,
                            border: `1px solid ${getCategoryStyles(session.category).border}`,
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            padding: '4px 10px',
                            borderRadius: '4px',
                            letterSpacing: '0.04em'
                          }}>
                            {session.category}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                            Day {session.day} Schedule
                          </span>
                        </div>

                        {/* Card Title & Speaker */}
                        <div>
                          <h3 style={{ fontSize: '1.05rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '6px', lineHeight: 1.35 }}>
                            {session.title}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                            <User size={14} style={{ color: 'var(--cu-gold)' }} />
                            by {session.speaker}
                          </div>
                        </div>

                        {/* Card Date/Time & Venue */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-main)', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '10px 0' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Clock size={14} style={{ color: 'var(--cu-navy)' }} />
                            <span>{session.time} ({session.date.split(' ')[0]})</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin size={14} style={{ color: 'var(--cu-navy)' }} />
                            <span>{session.venue}</span>
                          </div>
                        </div>

                        {/* Brief description */}
                        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6 }} className="line-clamp-3">
                          {session.description}
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px' }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--cu-navy)', fontWeight: 700 }}>
                            Click to View Full Details &rarr;
                          </span>
                          {session.poster && <ImageIcon size={16} style={{ color: 'var(--cu-gold)' }} />}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </main>

            {/* Infinite Gallery Marquee Section (Moved to bottom of Planner View) */}
              <section style={{ padding: '24px 0 10px', background: 'rgba(12, 35, 64, 0.01)', borderTop: '1px solid rgba(12, 35, 64, 0.06)' }}>
                <div className="container" style={{ marginBottom: '12px' }}>
                  <span className="badge" style={{ fontSize: '0.65rem', padding: '3px 10px' }}>Creative Gallery</span>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginTop: '4px', fontFamily: 'var(--font-serif)' }}>Infinite Orientation Gallery</h2>
                </div>

                <div className="gallery-marquee-wrap">
                  <div className="gallery-marquee-track">
                    {doubleMarqueePosters.map((poster, index) => (
                      <div 
                        key={index} 
                        className="gallery-item"
                        onClick={() => setActivePoster({ url: poster.url, title: poster.title, speaker: poster.speaker })}
                      >
                        <img src={poster.url} alt={poster.title} />
                        <div className="gallery-item-overlay">
                          <span style={{ background: '#ffffff', color: 'var(--cu-navy)', fontSize: '0.72rem', padding: '6px 12px', borderRadius: '20px', fontWeight: 800, boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                            Zoom Poster
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* reflections Memory Board Integrated at the bottom */}
              <section style={{ background: 'rgba(224,242,254,0.25)', borderTop: '1px solid rgba(12, 35, 64, 0.08)', padding: '50px 0 60px' }}>
                <div className="container">
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '40px', alignItems: 'start' }} className="detail-view-grid">
                    
                    {/* Reflections Input Form */}
                    <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                      <span className="badge" style={{ fontSize: '0.65rem', marginBottom: '8px', display: 'inline-block' }}>Student Feedback</span>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                        Share Your Takeaways
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Post an interactive memory note sticker on the 2026 Orientation portal:
                      </p>

                      <form onSubmit={handleMemorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '12px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--cu-navy-dark)', marginBottom: '4px' }}>Name</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Rahul Sharma" 
                              value={newMemory.name}
                              onChange={(e) => setNewMemory({ ...newMemory, name: e.target.value })}
                              style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', outline: 'none' }}
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--cu-navy-dark)', marginBottom: '4px' }}>Batch</label>
                            <select 
                              value={newMemory.batch}
                              onChange={(e) => setNewMemory({ ...newMemory, batch: e.target.value })}
                              style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '8px 10px', fontSize: '0.8rem', outline: 'none' }}
                            >
                              <option value="MCA">MCA</option>
                              <option value="MSc AIML">MSc AIML</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--cu-navy-dark)', marginBottom: '4px' }}>Reflection & Takeaways</label>
                          <textarea 
                            placeholder="Share a key technical point or highlight from the sessions..." 
                            rows={3}
                            value={newMemory.content}
                            onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                            style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', outline: 'none', resize: 'vertical' }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--cu-navy-dark)', marginBottom: '6px' }}>Sticker Mood</label>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {['insightful', 'motivating', 'tech', 'social'].map(m => {
                              const config = getMoodConfig(m);
                              const isSelected = newMemory.mood === m;
                              return (
                                <button
                                  key={m}
                                  type="button"
                                  onClick={() => setNewMemory({ ...newMemory, mood: m })}
                                  style={{
                                    padding: '5px 12px',
                                    fontSize: '0.72rem',
                                    borderRadius: '20px',
                                    border: '1.5px solid',
                                    borderColor: isSelected ? config.color : '#cbd5e1',
                                    background: isSelected ? 'rgba(255,255,255,1)' : '#ffffff',
                                    color: config.color,
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                                    transition: 'all 0.15s'
                                  }}
                                >
                                  {config.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                          <button type="submit" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.82rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Send size={13} /> Post Note Sticker
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Reflections List Feed */}
                    <div className="academic-panel" style={{ padding: '30px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                        <h3 style={{ fontSize: '1.15rem', color: 'var(--cu-navy-dark)', fontWeight: 800, fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MessageSquare size={18} style={{ color: 'var(--cu-gold-bright)' }} />
                          Student Board ({filteredMemories.length})
                        </h3>

                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          {/* Sort controls */}
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            <button 
                              onClick={() => setReflectionSort('recent')}
                              style={{ background: 'none', border: 'none', fontSize: '0.74rem', cursor: 'pointer', fontWeight: reflectionSort === 'recent' ? 800 : 500, color: reflectionSort === 'recent' ? 'var(--cu-navy)' : 'var(--text-muted)' }}
                            >
                              Recent
                            </button>
                            <span style={{ color: '#cbd5e1', fontSize: '0.74rem' }}>|</span>
                            <button 
                              onClick={() => setReflectionSort('popular')}
                              style={{ background: 'none', border: 'none', fontSize: '0.74rem', cursor: 'pointer', fontWeight: reflectionSort === 'popular' ? 800 : 500, color: reflectionSort === 'popular' ? 'var(--cu-navy)' : 'var(--text-muted)' }}
                            >
                              Helpful
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Local search within memories */}
                      <div style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
                        <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input 
                          type="text" 
                          placeholder="Search comments or students..." 
                          value={reflectionSearch}
                          onChange={(e) => setReflectionSearch(e.target.value)}
                          style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '6px 8px 6px 30px', fontSize: '0.78rem', outline: 'none' }}
                        />
                      </div>

                      {filteredMemories.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px 10px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No student memories posted yet. Be the first!</p>
                        </div>
                      ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px', maxHeight: '480px', overflowY: 'auto', paddingRight: '4px' }}>
                          {filteredMemories.map(m => {
                            const moodConf = getMoodConfig(m.mood);
                            return (
                              <motion.div 
                                key={m.id}
                                className={`sticker-card ${moodConf.class}`}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                  <div>
                                    <strong style={{ fontSize: '0.85rem', color: 'var(--cu-navy-dark)' }}>{m.name}</strong>
                                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: '6px' }}>({m.batch})</span>
                                  </div>
                                  <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{m.date}</span>
                                </div>
                                
                                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '10px' }}>
                                  "{m.content}"
                                </p>
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ fontSize: '0.65rem', background: '#ffffff', padding: '2px 8px', borderRadius: '4px', color: moodConf.color, border: `1px solid rgba(0,0,0,0.06)`, fontWeight: 700 }}>
                                    {moodConf.label.split(' ')[0]} {moodConf.label.split(' ').slice(1).join(' ')}
                                  </span>
                                  
                                  <button 
                                    type="button"
                                    onClick={() => handleUpvote(m.id)}
                                    className="pulse-click"
                                    style={{
                                      background: '#ffffff',
                                      border: '1px solid #cbd5e1',
                                      borderRadius: '6px',
                                      padding: '3px 10px',
                                      fontSize: '0.7rem',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      color: 'var(--cu-navy)',
                                      display: 'flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      boxShadow: '0 1.5px 3px rgba(0,0,0,0.04)',
                                      transition: 'transform 0.1s ease'
                                    }}
                                  >
                                    👍 {m.upvotes || 0}
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </section>

              {/* Footer for Planner view */}
              <footer style={{ background: 'var(--cu-navy-dark)', color: '#ffffff', padding: '75px 0 35px', borderTop: '1.5px solid rgba(255,255,255,0.04)', marginTop: 'auto' }}>
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
                      <li><button onClick={onBackToHome} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">Back to Landing Hub</button></li>
                      <li><button onClick={() => { setSelectedDay('all'); setSearchQuery(''); setBatchFilter('all'); setActiveCategory('all'); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">All Orientation Sessions</button></li>
                      <li><button onClick={() => setSelectedDay(1)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">Day 1 Inauguration</button></li>
                      <li><button onClick={() => { setSelectedDay('all'); setSearchQuery('AI'); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem' }} className="nav-hover">AI Modules</button></li>
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

          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      {activePoster && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(4, 13, 26, 0.94)',
            backdropFilter: 'blur(12px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setActivePoster(null)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '900px',
              maxHeight: '85vh',
              background: '#040d1a',
              padding: '6px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePoster(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0px',
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              <X size={18} /> Close
            </button>

            <img 
              src={activePoster.url} 
              alt={activePoster.title} 
              style={{
                width: '100%',
                maxHeight: '72vh',
                objectFit: 'contain',
                borderRadius: '14px'
              }}
            />

            <div style={{ marginTop: '12px', padding: '0 6px 6px', textAlign: 'center' }}>
              <h4 style={{ color: '#ffffff', fontSize: '0.95rem', marginBottom: '2px', fontWeight: 600 }}>{activePoster.title}</h4>
              <p style={{ color: 'var(--cu-gold-bright)', fontSize: '0.8rem', fontWeight: 500 }}>{activePoster.speaker}</p>
            </div>
          </div>
        </div>
      )}

      {/* Line-clamp and details page override */}
      <style dangerouslySetInnerHTML={{__html: `
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        @media (max-width: 900px) {
          .detail-view-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .detail-poster-img-container:hover .detail-poster-overlay {
            opacity: 1 !important;
          }
        }
      `}} />

    </div>
  );
}
