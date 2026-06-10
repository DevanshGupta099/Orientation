import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  CheckCircle, 
  Image as ImageIcon, 
  X, 
  Send,
  MessageSquare,
  Mail,
  Phone,
  CalendarCheck,
  ArrowUpDown
} from 'lucide-react';
import { sessionsData } from '../data/sessionsData';

export default function OrientationsPage({ initialFilters, onBackToHome }) {
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

  // Attended Sessions State
  const [attendedSessions, setAttendedSessions] = useState(() => {
    const saved = localStorage.getItem('cu_attended_sessions');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Active selected session ID for inspector detail view
  const [detailSessionId, setDetailSessionId] = useState(null);
  
  // Lightbox State
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

  // Persist Attended Sessions
  useEffect(() => {
    localStorage.setItem('cu_attended_sessions', JSON.stringify(attendedSessions));
  }, [attendedSessions]);

  // Persist Reflections Feed
  useEffect(() => {
    localStorage.setItem('cu_orientation_memories', JSON.stringify(memories));
  }, [memories]);

  // Toggle Session Attendance
  const toggleAttended = (id) => {
    if (attendedSessions.includes(id)) {
      setAttendedSessions(attendedSessions.filter(sid => sid !== id));
    } else {
      setAttendedSessions([...attendedSessions, id]);
    }
  };

  // Submit Reflection Note
  const handleMemorySubmit = (e) => {
    e.preventDefault();
    if (!newMemory.name.trim() || !newMemory.content.trim()) return;

    const memoryItem = {
      id: 'mem_' + Date.now(),
      sessionId: detailSessionId || 'general',
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

  // Filtering Logic
  const filteredSessions = sessionsData.filter(session => {
    // 1. Day Filter
    const matchDay = selectedDay === 'all' || session.day === Number(selectedDay);
    
    // 2. Search query filter
    const matchQuery = searchQuery.trim() === '' || 
      session.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.speaker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
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

  const [checkedTopics, setCheckedTopics] = useState(() => {
    const saved = localStorage.getItem('cu_checked_topics');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleTopicChecked = (sessionId, topicIndex) => {
    const key = `${sessionId}_${topicIndex}`;
    const updated = { ...checkedTopics, [key]: !checkedTopics[key] };
    setCheckedTopics(updated);
    localStorage.setItem('cu_checked_topics', JSON.stringify(updated));
  };

  // Calculate syllabus progress for active session
  const getSyllabusProgress = (session) => {
    if (!session || !session.topics) return { checkedCount: 0, percentage: 0 };
    const checkedCount = session.topics.reduce((acc, _, idx) => {
      return acc + (checkedTopics[`${session.id}_${idx}`] ? 1 : 0);
    }, 0);
    const percentage = Math.round((checkedCount / session.topics.length) * 100);
    return { checkedCount, percentage };
  };

  const renderSessionDetailView = (session) => {
    if (!session) return null;
    const isAttended = attendedSessions.includes(session.id);
    
    // Sort reflections memories
    const sessionMemories = memories.filter(m => {
      const matchSession = m.sessionId === session.id;
      const matchQuery = reflectionSearch.trim() === '' || 
        m.name.toLowerCase().includes(reflectionSearch.toLowerCase()) ||
        m.content.toLowerCase().includes(reflectionSearch.toLowerCase());
      return matchSession && matchQuery;
    });

    if (reflectionSort === 'popular') {
      sessionMemories.sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0));
    } else {
      // Sort chronologically (newest first based on string ID parse)
      sessionMemories.sort((a, b) => b.id.localeCompare(a.id));
    }

    const { checkedCount, percentage } = getSyllabusProgress(session);

    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35 }}
        style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        {/* Dynamic Hero Section */}
        <div style={{
          position: 'relative',
          height: '380px',
          width: '100%',
          backgroundImage: session.poster ? `url(${session.poster})` : 'none',
          backgroundColor: 'var(--cu-navy-dark)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'end',
          color: '#ffffff',
          overflow: 'hidden',
          borderRadius: '0 0 24px 24px',
          boxShadow: '0 10px 30px rgba(12, 35, 64, 0.12)',
          borderBottom: '2.5px solid var(--cu-gold-bright)'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(12, 35, 64, 0.35) 0%, rgba(12, 35, 64, 0.92) 100%)',
            backdropFilter: session.poster ? 'blur(4px)' : 'none',
            zIndex: 1
          }} />

          {/* Back Action button inside Hero */}
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
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 800,
              color: 'var(--cu-navy)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            whileHover={{ scale: 1.05, x: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={14} /> Back to Schedules
          </motion.button>

          {/* Hero text metadata */}
          <div className="container" style={{
            position: 'relative',
            zIndex: 2,
            paddingBottom: '32px',
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
                Day {session.day} Schedule
              </span>
            </div>

            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.2rem',
              color: '#ffffff',
              fontWeight: 800,
              lineHeight: 1.25,
              textShadow: '0 2px 8px rgba(0,0,0,0.3)',
              maxWidth: '850px'
            }}>
              {session.title}
            </h1>

            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              fontSize: '0.82rem',
              color: 'rgba(255, 255, 255, 0.85)',
              alignItems: 'center',
              marginTop: '4px'
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <User size={14} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.speaker}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.time}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={14} style={{ color: 'var(--cu-gold-bright)' }} />
                {session.venue}
              </span>
            </div>
          </div>
        </div>

        {/* Beneath Hero Body Grid */}
        <div className="container" style={{ width: '100%', padding: '40px 24px 60px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '32px',
            alignItems: 'start'
          }} className="detail-view-grid">
            
            {/* LEFT COLUMN: Overview & Topics & Discussion Reflections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Session Overview */}
              <div className="academic-panel" style={{ padding: '28px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '14px', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={18} style={{ color: 'var(--cu-gold-bright)' }} />
                  Session Description & Goals
                </h3>
                <p style={{ color: 'var(--text-main)', fontSize: '0.92rem', lineHeight: 1.7 }}>
                  {session.description}
                </p>
              </div>

              {/* Topics Syllabus checklist */}
              <div className="academic-panel" style={{ padding: '28px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--cu-navy-dark)', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
                      Orientation Syllabus & Competencies
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      Check off items as they are discussed in the induction slot:
                    </p>
                  </div>

                  {/* Syllabus checklist progress counter */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: percentage === 100 ? '#15803d' : 'var(--cu-navy)' }}>
                      Progress: {checkedCount} / {session.topics.length} ({percentage}%)
                    </span>
                    <div style={{ width: '120px', height: '6px', background: '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${percentage}%`, background: percentage === 100 ? '#10b981' : 'var(--cu-navy)', transition: 'width 0.3s ease' }} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {session.topics.map((topic, idx) => {
                    const key = `${session.id}_${idx}`;
                    const isChecked = !!checkedTopics[key];
                    return (
                      <div 
                        key={idx}
                        onClick={() => toggleTopicChecked(session.id, idx)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          padding: '11px 16px',
                          background: isChecked ? 'rgba(240, 253, 244, 0.5)' : 'var(--bg-secondary)',
                          border: isChecked ? '1px solid rgba(21, 128, 61, 0.2)' : '1px solid var(--card-border)',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          readOnly
                          style={{ accentColor: 'var(--cu-navy)', pointerEvents: 'none' }}
                        />
                        <span style={{
                          fontSize: '0.82rem',
                          color: isChecked ? '#15803d' : 'var(--text-main)',
                          fontWeight: isChecked ? 700 : 600,
                          textDecoration: isChecked ? 'line-through' : 'none'
                        }}>
                          {topic}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Session Reflections Memory Board */}
              <div className="academic-panel" style={{ padding: '28px', background: '#ffffff', border: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '18px', fontFamily: 'var(--font-serif)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} style={{ color: 'var(--cu-gold-bright)' }} />
                  Session Reflections ({sessionMemories.length})
                </h3>

                {/* Form to submit reflection for this session */}
                <form onSubmit={handleMemorySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px', background: 'var(--cu-navy-light)', padding: '20px', borderRadius: '14px', border: '1.5px solid rgba(12, 35, 64, 0.08)' }}>
                  <span style={{ fontSize: '0.62rem', background: 'var(--cu-navy)', color: '#ffffff', padding: '3px 8px', borderRadius: '4px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'inline-block', alignSelf: 'flex-start' }}>
                    Post a Reflection Sticker
                  </span>
                  
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
                    <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 800, color: 'var(--cu-navy-dark)', marginBottom: '4px' }}>Takeaway Note</label>
                    <textarea 
                      placeholder="Share a key technical point or highlight from this session..." 
                      rows={2}
                      value={newMemory.content}
                      onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                      style={{ width: '100%', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  {/* Mood selection buttons */}
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
                    <button type="submit" className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.78rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Send size={13} /> Post Note Sticker
                    </button>
                  </div>
                </form>

                {/* Filter and Sorting Header for notes list */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '18px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
                  {/* Notes search */}
                  <div style={{ position: 'relative', width: '220px' }}>
                    <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input 
                      type="text" 
                      placeholder="Search notes..." 
                      value={reflectionSearch}
                      onChange={(e) => setReflectionSearch(e.target.value)}
                      style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '5px 8px 5px 28px', fontSize: '0.74rem', outline: 'none' }}
                    />
                  </div>

                  {/* Notes sorting */}
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <ArrowUpDown size={12} style={{ color: 'var(--text-muted)' }} />
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

                {/* Reflections list specific to this session */}
                {sessionMemories.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '40px 10px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No student memories match the current filters.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
                    {sessionMemories.map(m => {
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

            {/* RIGHT COLUMN: Check-In widget & framed Poster */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', position: 'sticky', top: '104px' }}>
              
              {/* Check-In widget */}
              <div className="academic-panel" style={{ padding: '26px', background: '#ffffff', border: '1px solid var(--card-border)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--cu-navy-dark)', fontWeight: 800, fontFamily: 'var(--font-serif)' }}>
                  Attendance Check-In
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isAttended ? '#10b981' : '#cbd5e1',
                    boxShadow: isAttended ? '0 0 10px #10b981' : 'none'
                  }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isAttended ? '#10b981' : 'var(--text-muted)' }}>
                    {isAttended ? 'Checked In for this Session' : 'Not Checked In yet'}
                  </span>
                </div>
                
                <motion.button
                  onClick={() => toggleAttended(session.id)}
                  className={isAttended ? "btn-secondary" : "btn-primary"}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 800,
                    justifyContent: 'center'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isAttended ? 'Cancel My Check-In' : 'Check In as Attended'}
                </motion.button>
              </div>

              {/* Poster frame */}
              <div className="academic-panel" style={{ padding: '26px', background: '#ffffff', textAlign: 'center', border: '1px solid var(--card-border)' }}>
                <h3 style={{ fontSize: '1.05rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>Session Poster</h3>
                {session.poster ? (
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
                      padding: '10px',
                      boxShadow: 'var(--card-shadow)'
                    }}
                  >
                    <img 
                      src={session.poster} 
                      alt={session.title} 
                      style={{ 
                        width: '100%', 
                        maxHeight: '400px', 
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
                      <span style={{ background: 'var(--cu-navy)', color: '#ffffff', fontSize: '0.74rem', padding: '6px 14px', borderRadius: '20px', fontWeight: 700, boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>Click to Zoom</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '40px 20px', background: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed #cbd5e1', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <ImageIcon size={32} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Standard Department Briefing Session</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
        
        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 900px) {
            .detail-view-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}} />
      </motion.div>
    );
  };

  // Progress calculations
  const totalSlotsCount = sessionsData.length;
  const attendedCount = attendedSessions.length;
  const progressPercentage = Math.round((attendedCount / totalSlotsCount) * 100) || 0;

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
          
          {/* Logo brand matching Landing Page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <img 
              src="/christ_logo.png" 
              alt="Christ University Logo" 
              style={{ height: '52px', objectFit: 'contain' }} 
            />
            <div style={{ borderLeft: '1.5px solid rgba(12, 35, 64, 0.15)', paddingLeft: '14px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--cu-navy)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, lineHeight: 1.3 }}>
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
                  <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.15)', paddingLeft: '28px' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', display: 'block', fontWeight: 700 }}>MY ATTENDANCE</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--cu-gold-bright)', fontWeight: 800 }}>{attendedCount} / {totalSlotsCount}</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* Main 2-Column Academic Planner Workspace */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              {/* Search & Program Filter container */}
              <div className="container" style={{ width: '100%', padding: '30px 24px 12px' }}>
                <div className="academic-panel" style={{ padding: '20px 24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <CalendarCheck size={20} style={{ color: 'var(--cu-navy)' }} />
                      <strong style={{ fontSize: '1rem', color: 'var(--cu-navy-dark)', fontWeight: 800 }}>Academic Calendar Scheduler</strong>
                    </div>

                    {/* Attendance Completion Progress bar indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, maxWidth: '380px' }}>
                      <span style={{ fontSize: '0.76rem', fontWeight: 800, color: 'var(--text-muted)', width: '90px' }}>
                        Track: {progressPercentage}%
                      </span>
                      <div style={{ flex: 1, height: '8px', background: '#cbd5e1', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          style={{ height: '100%', background: 'var(--cu-gold-bright)' }}
                        />
                      </div>
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
                    <div style={{ position: 'relative', width: '260px' }}>
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

              {/* 2-Column layout container */}
              <div className="container" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '24px', padding: '12px 24px 50px', width: '100%' }}>
                
                {/* COLUMN 1: Day Index Selector Card Stack */}
                <div style={{ position: 'sticky', top: '104px', display: 'flex', flexDirection: 'column', gap: '10px', alignSelf: 'start' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '4px' }}>
                    Day Selector
                  </span>
                  
                  {daysMapping.map((day) => {
                    const isSelected = selectedDay === day.value;
                    const isAllDays = day.value === 'all';
                    
                    let dateNum = isAllDays ? 'ALL' : day.value;
                    let dateMonth = isAllDays ? 'MAY' : day.date.split(' ')[0] || 'MAY';
                    
                    return (
                      <motion.div
                        key={day.value}
                        onClick={() => setSelectedDay(day.value)}
                        className="academic-panel"
                        style={{
                          padding: '12px 14px',
                          cursor: 'pointer',
                          background: isSelected ? 'var(--cu-gold-light)' : '#ffffff',
                          border: isSelected ? '1.5px solid var(--cu-navy)' : '1.5px solid var(--card-border)',
                          position: 'relative',
                          transition: 'all 0.25s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          borderRadius: '12px'
                        }}
                        whileHover={{ x: 5 }}
                      >
                        {/* Mini physical calendar block */}
                        <div style={{
                          width: '42px',
                          height: '46px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column',
                          border: isSelected ? '1.5px solid var(--cu-navy)' : '1px solid #cbd5e1',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.04)'
                        }}>
                          <div style={{
                            background: isSelected ? 'var(--cu-navy)' : 'var(--bg-secondary)',
                            color: isSelected ? '#ffffff' : 'var(--text-muted)',
                            fontSize: '0.55rem',
                            fontWeight: 800,
                            textAlign: 'center',
                            padding: '2px 0',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            {dateMonth}
                          </div>
                          <div style={{
                            flex: 1,
                            background: '#ffffff',
                            color: 'var(--cu-navy-dark)',
                            fontSize: '0.95rem',
                            fontWeight: 800,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {dateNum}
                          </div>
                        </div>

                        {/* Calendar block label metadata */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--cu-navy-dark)' }}>
                            {day.label}
                          </span>
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                            {day.date.split(' ')[0]} {day.date.split(' ')[1] || ''}
                          </span>
                        </div>

                        {isSelected && (
                          <motion.div 
                            layoutId="active-day-selector"
                            style={{ position: 'absolute', right: '10px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cu-navy)' }} 
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* COLUMN 2: Target Schedules List Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '4px' }}>
                    Scheduled Interactive Sessions ({filteredSessions.length})
                  </span>

                  {filteredSessions.length === 0 ? (
                    <div className="academic-panel" style={{ padding: '60px 20px', textAlign: 'center', background: '#ffffff' }}>
                      <CalendarCheck size={36} style={{ color: 'var(--text-muted)', marginBottom: '12px', opacity: 0.5 }} />
                      <h4 style={{ fontSize: '0.94rem', color: 'var(--cu-navy-dark)', fontWeight: 800, marginBottom: '4px' }}>No Sessions Match Filters</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Try resetting the query string or batch criteria filters.</p>
                    </div>
                  ) : (
                    selectedDay === 'all' ? (
                      // RENDER GROUPED TIMELINES (All Days view)
                      (() => {
                        const dayGroups = [1, 2, 3, 4, 5, 6, 7].map(dNum => {
                          const items = filteredSessions.filter(s => s.day === dNum);
                          const mappingObj = daysMapping.find(dm => dm.value === dNum);
                          return {
                            dayNumber: dNum,
                            dateLabel: mappingObj ? mappingObj.date : '',
                            items
                          };
                        }).filter(group => group.items.length > 0);

                        return (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                            {dayGroups.map(group => (
                              <div key={group.dayNumber} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {/* Group subheader indicator block */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid rgba(12, 35, 64, 0.08)', paddingBottom: '8px', marginTop: '6px' }}>
                                  <span style={{ fontSize: '0.8rem', color: 'var(--cu-navy)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Clock size={13} style={{ color: 'var(--cu-gold)' }} />
                                    Day {group.dayNumber} Timeline
                                  </span>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                    {group.dateLabel}
                                  </span>
                                </div>

                                {/* Day Group Items */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                  {group.items.map(session => {
                                    const isAttended = attendedSessions.includes(session.id);
                                    const { checkedCount } = getSyllabusProgress(session);
                                    return (
                                      <motion.div
                                        key={session.id}
                                        onClick={() => setDetailSessionId(session.id)}
                                        className="academic-panel"
                                        style={{
                                          padding: '18px 24px',
                                          cursor: 'pointer',
                                          border: '1.5px solid var(--card-border)',
                                          background: '#ffffff',
                                          position: 'relative',
                                          display: 'flex',
                                          gap: '16px',
                                          alignItems: 'start',
                                          borderRadius: '14px'
                                        }}
                                        whileHover={{ scale: 1.012, border: '1.5px solid var(--cu-gold)', boxShadow: 'var(--card-shadow-hover)' }}
                                      >
                                        <div 
                                          onClick={(e) => { e.stopPropagation(); toggleAttended(session.id); }} 
                                          style={{ 
                                            padding: '2px', 
                                            background: '#ffffff', 
                                            borderRadius: '50%', 
                                            cursor: 'pointer', 
                                            border: '1.5px solid #cbd5e1', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            justifyContent: 'center',
                                            marginTop: '2px'
                                          }}
                                        >
                                          <CheckCircle size={18} style={{ color: isAttended ? '#10b981' : '#cbd5e1', display: 'block' }} />
                                        </div>
                                        
                                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ 
                                              fontSize: '0.65rem', 
                                              fontWeight: 800, 
                                              color: getCategoryStyles(session.category).text,
                                              textTransform: 'uppercase',
                                              letterSpacing: '0.04em'
                                            }}>
                                              {session.category}
                                            </span>

                                            {/* Checklist count display if items are checked */}
                                            {checkedCount > 0 && (
                                              <span style={{ fontSize: '0.68rem', background: '#f0fdf4', border: '1px solid rgba(21,128,61,0.15)', color: '#15803d', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                                Syllabus: {checkedCount}/{session.topics.length} Done
                                              </span>
                                            )}
                                          </div>

                                          <h3 style={{ fontSize: '0.94rem', color: 'var(--cu-navy-dark)', fontWeight: 800, lineHeight: 1.35 }}>
                                            {session.title}
                                          </h3>

                                          <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                            by {session.speaker}
                                          </div>

                                          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                              <Clock size={12} style={{ color: 'var(--cu-navy)' }} /> {session.time}
                                            </span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                              <MapPin size={12} style={{ color: 'var(--cu-navy)' }} /> {session.venue.split(',')[0]}
                                            </span>
                                          </div>
                                        </div>
                                      </motion.div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()
                    ) : (
                      // RENDER FLAT TIMELINE (Single day filter view)
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {filteredSessions.map(session => {
                          const isAttended = attendedSessions.includes(session.id);
                          const { checkedCount } = getSyllabusProgress(session);
                          
                          return (
                            <motion.div
                              key={session.id}
                              onClick={() => setDetailSessionId(session.id)}
                              className="academic-panel"
                              style={{
                                padding: '18px 24px',
                                cursor: 'pointer',
                                border: '1.5px solid var(--card-border)',
                                background: '#ffffff',
                                position: 'relative',
                                display: 'flex',
                                gap: '16px',
                                alignItems: 'start',
                                borderRadius: '14px'
                              }}
                              whileHover={{ scale: 1.012, border: '1.5px solid var(--cu-gold)', boxShadow: 'var(--card-shadow-hover)' }}
                            >
                              <div 
                                onClick={(e) => { e.stopPropagation(); toggleAttended(session.id); }} 
                                style={{ 
                                  padding: '2px', 
                                  background: '#ffffff', 
                                  borderRadius: '50%', 
                                  cursor: 'pointer', 
                                  border: '1.5px solid #cbd5e1', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  marginTop: '2px'
                                }}
                              >
                                <CheckCircle size={18} style={{ color: isAttended ? '#10b981' : '#cbd5e1', display: 'block' }} />
                              </div>
                              
                              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <span style={{ 
                                    fontSize: '0.65rem', 
                                    fontWeight: 800, 
                                    color: getCategoryStyles(session.category).text,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.04em'
                                  }}>
                                    {session.category}
                                  </span>
                                  
                                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                    {checkedCount > 0 && (
                                      <span style={{ fontSize: '0.68rem', background: '#f0fdf4', border: '1px solid rgba(21,128,61,0.15)', color: '#15803d', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                        Syllabus: {checkedCount}/{session.topics.length} Done
                                      </span>
                                    )}
                                    <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                                      Day {session.day} Schedule
                                    </span>
                                  </div>
                                </div>

                                <h3 style={{ fontSize: '0.94rem', color: 'var(--cu-navy-dark)', fontWeight: 800, lineHeight: 1.35 }}>
                                  {session.title}
                                </h3>

                                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                  by {session.speaker}
                                </div>

                                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <Clock size={12} style={{ color: 'var(--cu-navy)' }} /> {session.time}
                                  </span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <MapPin size={12} style={{ color: 'var(--cu-navy)' }} /> {session.venue.split(',')[0]}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </div>

            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer matching Landing Page */}
      <footer style={{ background: 'var(--cu-navy-dark)', color: '#ffffff', padding: '75px 0 35px', borderTop: '1.5px solid rgba(255,255,255,0.04)', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '50px', marginBottom: '45px' }}>
          
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

    </div>
  );
}
