'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, Upload, Layers, GitCompare, Save, Activity, Cpu, Gauge, AlertTriangle } from 'lucide-react';

const steps = [
  { icon: Upload, label: 'Upload footage', num: 1 },
  { icon: Layers, label: 'Select discipline', num: 2 },
  { icon: Eye, label: 'Frame review', num: 3 },
  { icon: Activity, label: 'Movement overlays', num: 4 },
  { icon: GitCompare, label: 'Compare attempts', num: 5 },
  { icon: Save, label: 'Save progress', num: 6 },
];

export function LabClient() {
  const [demoActive, setDemoActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-32 sm:py-40 bg-obsidian text-center">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-copper text-xs font-bold uppercase tracking-[0.3em] mb-4">JUMPXN LAB</p>
          <h1 className="hero-headline text-[clamp(2rem,6vw,4rem)] text-alabaster mb-4" style={{ fontFamily: 'var(--font-display)' }}>FUTURE TECHNOLOGY PREVIEW</h1>
          <p className="text-titanium text-lg max-w-2xl mx-auto">Where riding meets data. Explore tools and concepts in development for JumpPack 2.0 riders.</p>
        </div>
      </section>

      {/* Real2See */}
      <section className="py-20 bg-carbon">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye size={24} className="text-copper" />
            <h2 className="text-alabaster text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>REAL2SEE — INTERACTIVE RIDER SIMULATION</h2>
          </div>
          <div className="bg-gold/10 border border-gold/30 px-4 py-3 mb-8 text-sm text-gold" style={{ borderRadius: '12px' }}>
            <AlertTriangle size={16} className="inline mr-2" />DEVELOPMENT PROTOTYPE — Illustrative simulation using sample data. Not a certified motion-analysis system.
          </div>
          <p className="text-titanium text-base mb-8 max-w-3xl">Watch the trick. Explore the movement. Understand what happened. Learn what to improve.</p>

          {/* Steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {steps.map((s, i) => (
              <button key={s.num} onClick={() => { setActiveStep(i); setDemoActive(true); }} className={`bg-obsidian border p-4 text-center transition-colors ${activeStep === i && demoActive ? 'border-copper bg-copper/5' : 'border-white/5 hover:border-white/10'}`} style={{ borderRadius: '12px' }}>
                <s.icon size={20} className={`mx-auto mb-2 ${activeStep === i && demoActive ? 'text-copper' : 'text-titanium'}`} />
                <p className="text-xs text-alabaster font-medium">{s.num}. {s.label}</p>
              </button>
            ))}
          </div>

          {/* Demo Area */}
          <div className="bg-obsidian border border-white/5 p-8 mb-8" style={{ borderRadius: '12px' }}>
            {!demoActive ? (
              <div className="text-center py-12">
                <Cpu size={48} className="text-titanium/30 mx-auto mb-4" />
                <p className="text-titanium mb-4">Click a step above or toggle the sample data demo to explore</p>
                <button onClick={() => setDemoActive(true)} className="bg-copper text-white px-6 py-3 text-sm font-bold uppercase tracking-wider hover:bg-copperHover transition-colors" style={{ borderRadius: '12px' }}>LAUNCH SAMPLE DATA DEMO</button>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-copper font-bold uppercase">Sample Data Demo Active</span>
                  <button onClick={() => setDemoActive(false)} className="text-xs text-titanium hover:text-alabaster">Close Demo</button>
                </div>
                <div className="aspect-video bg-carbon border border-white/5 flex items-center justify-center mb-4" style={{ borderRadius: '12px' }}>
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 border-2 border-copper/30 rounded-full flex items-center justify-center">
                      <motion.div className="w-4 h-4 bg-copper rounded-full" animate={{ y: [0, -20, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
                    </div>
                    <p className="text-sm text-titanium">Step {activeStep + 1}: {steps[activeStep]?.label ?? ''}</p>
                    <p className="text-xs text-titanium/60 mt-1">Illustrative visualisation — sample data</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ l: 'Airtime', v: '1.4s' }, { l: 'Peak Height', v: '0.9m' }, { l: 'Rotation', v: '180°' }].map((m) => (
                    <div key={m.l} className="bg-carbon p-3 text-center" style={{ borderRadius: '12px' }}>
                      <p className="text-lg font-bold text-copper">{m.v}</p>
                      <p className="text-xs text-titanium">{m.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sensor Preview */}
          <div className="bg-obsidian border border-white/5 p-8" style={{ borderRadius: '12px' }}>
            <div className="flex items-center gap-3 mb-4">
              <Gauge size={20} className="text-copper" />
              <h3 className="text-alabaster font-bold">SENSOR INTEGRATION PREVIEW</h3>
              <span className="text-xs bg-copper/10 text-copper px-2 py-0.5 font-bold" style={{ borderRadius: '12px' }}>COMING IN A FUTURE UPDATE</span>
            </div>
            <p className="text-titanium text-sm leading-relaxed">Ramp-mounted sensors and IMU data integration for real-time airtime measurement, height estimation, and session analytics. Data feeds directly into Real2See for comprehensive rider analysis.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
