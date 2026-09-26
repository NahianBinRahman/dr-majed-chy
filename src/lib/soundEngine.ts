// High-Tech Web Audio API Procedural Sound Engine
// Zero external assets, zero network latency, ultra-crisp audio synthesis

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isEnabled: boolean = true;
  private volume: number = 0.18; // Soft, luxury, non-intrusive volume
  private listeners: ((enabled: boolean) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('dr_majed_sound_enabled');
      this.isEnabled = stored !== null ? stored === 'true' : true;
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getSoundEnabled(): boolean {
    return this.isEnabled;
  }

  public setSoundEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('dr_majed_sound_enabled', enabled ? 'true' : 'false');
    }
    this.listeners.forEach((cb) => cb(this.isEnabled));
  }

  public toggleSound(): boolean {
    this.setSoundEnabled(!this.isEnabled);
    if (this.isEnabled) {
      this.playHapticClick();
    }
    return this.isEnabled;
  }

  public subscribe(cb: (enabled: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }

  // Soft tactile click for buttons and tabs
  public playHapticClick() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.04);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.7, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Gentle harmonic micro-chime on card / node hover
  public playHoverChime() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.08); // A5 -> D6 harmonic

      gain.gain.setValueAtTime(this.volume * 0.28, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // AudioContext safe fallback
    }
  }

  // High-Tech C-Arm / Ultrasound Telemetry Scanner pulse
  public playScanPulse() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1280, ctx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.22);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.Q.setValueAtTime(4.0, ctx.currentTime);

      gain.gain.setValueAtTime(this.volume * 0.45, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.26);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Medical Sub-Bass Biometric Heartbeat (lub-dub)
  public playHeartbeat() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      // Lub
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, ctx.currentTime);
      osc1.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.09);
      gain1.gain.setValueAtTime(this.volume * 0.6, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.11);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.12);

      // Dub (140ms later)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(95, ctx.currentTime + 0.14);
      osc2.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.25);
      gain2.gain.setValueAtTime(this.volume * 0.8, ctx.currentTime + 0.14);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.27);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.14);
      osc2.stop(ctx.currentTime + 0.28);
    } catch {
      // AudioContext safe fallback
    }
  }

  // WebXR / 3D Hologram Spatial Initialization sound
  public playXRModeSound() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(240, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(960, ctx.currentTime + 0.18);
      osc.frequency.exponentialRampToValueAtTime(1440, ctx.currentTime + 0.35);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(this.volume * 0.5, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.46);
    } catch {
      // AudioContext safe fallback
    }
  }

  // Laser Needle Lock sound (C-Arm target confirmed)
  public playLaserLock() {
    if (!this.isEnabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const freqs = [784, 987.77, 1318.51]; // G5, B5, E6 Major triad
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(this.volume * 0.35, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.15);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.16);
      });
    } catch {
      // AudioContext safe fallback
    }
  }
}

export const soundEngine = typeof window !== 'undefined' ? new SoundEngine() : ({} as SoundEngine);
