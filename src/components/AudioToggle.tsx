'use client';

import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '@/lib/soundEngine';

export const AudioToggle: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(true);

  useEffect(() => {
    setIsEnabled(soundEngine.getSoundEnabled ? soundEngine.getSoundEnabled() : true);
    if (soundEngine.subscribe) {
      const unsubscribe = soundEngine.subscribe((val) => {
        setIsEnabled(val);
      });
      return unsubscribe;
    }
  }, []);

  const handleToggle = () => {
    if (soundEngine.toggleSound) {
      const next = soundEngine.toggleSound();
      setIsEnabled(next);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold backdrop-blur-md transition-all ${
        isEnabled
          ? 'bg-teal-500/10 text-teal-300 border-teal-500/30 hover:border-teal-500/60 shadow-[0_0_12px_rgba(20,184,166,0.15)]'
          : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-white'
      }`}
      title={isEnabled ? 'Mute Interface Sound Effects' : 'Enable Medical Sound Effects'}
    >
      {isEnabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-teal-400" />
          {/* Animated Equalizer Frequency Bars */}
          <span className="flex items-end gap-[2px] h-3 w-3">
            <span className="w-[2px] bg-teal-400 rounded-full animate-[soundWave1_0.8s_ease-in-out_infinite]" />
            <span className="w-[2px] bg-teal-400 rounded-full animate-[soundWave2_0.6s_ease-in-out_infinite]" />
            <span className="w-[2px] bg-teal-400 rounded-full animate-[soundWave3_0.9s_ease-in-out_infinite]" />
          </span>
          <span className="hidden xl:inline text-[11px] font-bold text-teal-300">SFX</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden xl:inline text-[11px] text-slate-500">Muted</span>
        </>
      )}
    </button>
  );
};
