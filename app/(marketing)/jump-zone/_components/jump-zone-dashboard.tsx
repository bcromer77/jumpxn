'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ALL_LESSONS, BMX_LESSONS, MTB_LESSONS, SKATE_LESSONS, SCOOTER_LESSONS } from '@/lib/constants';
import { GraduationCap, Bookmark, Trophy, Star, User, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

type Discipline = 'All' | 'BMX' | 'MTB' | 'Skateboarding' | 'Scooter';

export function JumpZoneDashboard({ userId, userName }: { userId: string; userName: string }) {
  const [activeDiscipline, setActiveDiscipline] = useState<Discipline>('All');
  const [savedLessons, setSavedLessons] = useState<Set<string>>(new Set());

  const disciplines: Discipline[] = ['All', 'BMX', 'MTB', 'Skateboarding', 'Scooter'];
  const filteredLessons = activeDiscipline === 'All' ? ALL_LESSONS : ALL_LESSONS.filter((l) => l.discipline === activeDiscipline);

  const toggleSave = (lessonId: string) => {
    setSavedLessons((prev) => {
      const n = new Set(prev);
      if (n.has(lessonId)) { n.delete(lessonId); toast.info('Lesson removed'); } else { n.add(lessonId); toast.success('Lesson saved!'); }
      return n;
    });
  };

  const levelColor = (level: string) => {
    if (level === 'Beginner') return 'text-copper';
    if (level === 'Intermediate') return 'text-gold';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-obsidian">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12">
        {/* Profile Card */}
        <div className="bg-carbon border border-white/5 p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ borderRadius: '12px' }}>
          <div className="w-14 h-14 bg-copper/10 flex items-center justify-center rounded-full"><User size={28} className="text-copper" /></div>
          <div className="flex-1">
            <h2 className="text-alabaster font-bold text-lg">{userName}</h2>
            <p className="text-titanium text-sm">Jump Zone Member</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-obsidian px-3 py-1 text-xs text-copper font-bold uppercase" style={{ borderRadius: '12px' }}>Founding Rider</div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Lessons', val: ALL_LESSONS.length, icon: GraduationCap }, { label: 'Saved', val: savedLessons.size, icon: Bookmark }, { label: 'Achievements', val: 3, icon: Trophy }, { label: 'Streak', val: '7 days', icon: Star }].map((s) => (
            <div key={s.label} className="bg-carbon border border-white/5 p-4" style={{ borderRadius: '12px' }}>
              <s.icon size={18} className="text-copper mb-2" />
              <p className="text-xl font-bold text-alabaster">{s.val}</p>
              <p className="text-xs text-titanium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Coaching Library */}
        <h2 className="text-alabaster text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>COACHING LIBRARY</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {disciplines.map((d) => (
            <button key={d} onClick={() => setActiveDiscipline(d)} className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors ${activeDiscipline === d ? 'bg-copper text-white' : 'border border-white/10 text-titanium hover:text-alabaster'}`} style={{ borderRadius: '12px' }}>{d}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {filteredLessons.map((lesson, i) => (
            <motion.div key={lesson.id} className="bg-carbon border border-white/5 p-5 hover:border-copper/20 transition-colors group" style={{ borderRadius: '12px' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-titanium">{lesson.discipline}</span>
                <button onClick={() => toggleSave(lesson.id)} className="text-titanium hover:text-copper transition-colors">
                  <Bookmark size={16} className={savedLessons.has(lesson.id) ? 'fill-copper text-copper' : ''} />
                </button>
              </div>
              <h3 className="text-alabaster font-bold text-sm mb-2">{lesson.title}</h3>
              <div className="flex items-center gap-3 text-xs">
                <span className="text-titanium">{lesson.duration}</span>
                <span className={levelColor(lesson.level)}>{lesson.level}</span>
              </div>
              <button className="mt-4 w-full bg-copper/10 text-copper py-2 text-xs font-bold uppercase tracking-wider hover:bg-copper/20 transition-colors flex items-center justify-center gap-1" style={{ borderRadius: '12px' }}>Start Lesson <ChevronRight size={14} /></button>
            </motion.div>
          ))}
        </div>

        {/* Progression Tracker */}
        <h2 className="text-alabaster text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>TRICK PROGRESSION</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {['Beginner', 'Intermediate', 'Advanced'].map((level, i) => (
            <div key={level} className="bg-carbon border border-white/5 p-5" style={{ borderRadius: '12px' }}>
              <h3 className={`font-bold text-sm mb-2 ${i === 0 ? 'text-copper' : i === 1 ? 'text-gold' : 'text-red-400'}`}>{level}</h3>
              <div className="w-full bg-obsidian h-2 rounded-full overflow-hidden"><div className="h-full bg-copper" style={{ width: i === 0 ? '60%' : i === 1 ? '25%' : '5%' }} /></div>
              <p className="text-xs text-titanium mt-2">{i === 0 ? '6/10' : i === 1 ? '2/8' : '0/6'} lessons completed</p>
            </div>
          ))}
        </div>

        {/* Achievement Badges */}
        <h2 className="text-alabaster text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>ACHIEVEMENTS</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[{ name: 'First Flight', emoji: '\uD83D\uDE80', unlocked: true }, { name: 'Week Streak', emoji: '\uD83D\uDD25', unlocked: true }, { name: 'Pump Master', emoji: '\uD83D\uDCAA', unlocked: true }, { name: '180 Club', emoji: '\uD83D\uDD04', unlocked: false }].map((a) => (
            <div key={a.name} className={`bg-carbon border border-white/5 p-4 text-center ${!a.unlocked ? 'opacity-40' : ''}`} style={{ borderRadius: '12px' }}>
              <span className="text-2xl block mb-2">{a.emoji}</span>
              <p className="text-xs font-bold text-alabaster">{a.name}</p>
              <p className="text-xs text-titanium">{a.unlocked ? 'Unlocked' : 'Locked'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
