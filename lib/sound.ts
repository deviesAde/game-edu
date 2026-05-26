import { Howl, Howler } from 'howler';

// Paths to sound effects
const soundPaths: Record<string, string> = {
  correct: '/sound_effect/yes.mp3',
  wrong: '/sound_effect/no.mp3',
  success: '/sound_effect/succses.mp3',
};

// Store instantiated HTML5 Audio objects to guarantee 100% reliable playbacks bypassing Web Audio limitations
const html5Sounds: Record<string, HTMLAudioElement> = {};

// Single global AudioContext for pop and hover to prevent reaching the browser AudioContext head limit
let sharedSyntheticAudioContext: AudioContext | null = null;

export const playSound = (type: 'correct' | 'wrong' | 'pop' | 'hover' | 'success') => {
  try {
    if (typeof window === 'undefined') return;

    if (type === 'correct' || type === 'wrong' || type === 'success') {
      if (!html5Sounds[type]) {
        console.log(`[Sound] Initializing HTML5 Audio for ${type} with path ${soundPaths[type]}`);
        html5Sounds[type] = new Audio(soundPaths[type]);
        html5Sounds[type].volume = 1.0;
      }
      console.log(`[Sound] Playing HTML5 Audio ${type}`);
      html5Sounds[type].currentTime = 0;
      html5Sounds[type].play().catch(err => {
        console.warn(`[Sound] HTML5 Audio play failed for ${type}:`, err);
      });
      return;
    }

    // 1. Explicitly resume Howler context if it has been suspended by browser auto-play policy
    if (Howler && Howler.ctx && Howler.ctx.state === 'suspended') {
      console.log('[Sound] Howler AudioContext is suspended. Resuming...');
      Howler.ctx.resume().catch(err => console.warn('[Sound] Failed to resume Howler context:', err));
    }

    // 2. Playback for Pop/Hover using a shared single global AudioContext
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!sharedSyntheticAudioContext) {
      sharedSyntheticAudioContext = new AudioContextClass();
    }
    const ctx = sharedSyntheticAudioContext;
    
    if (ctx.state === 'suspended') {
      ctx.resume().catch(err => console.warn('[Sound] Failed to resume shared synthetic AudioContext:', err));
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'hover') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  } catch(e) {
    console.error("Audio playback failed", e);
  }
};

// --- BACKGROUND MUSIC (MP3 VIA HOWLER) ---
let bgmSound: Howl | null = null;
let isBgmPlaying = false;

export const getBGMState = (): boolean => {
  if (typeof window === 'undefined') return false;
  const stored = localStorage.getItem('bgm_active');
  return stored !== 'false'; // Default to true if not set
};

export const initBGM = () => {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem('bgm_active') === null) {
    localStorage.setItem('bgm_active', 'true');
  }
};

export const playBGMIfEnabled = () => {
  if (typeof window === 'undefined') return;
  const active = getBGMState();
  if (active && !isBgmPlaying) {
    try {
      if (Howler && Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().catch(e => console.warn("Failed to resume Howler context:", e));
      }
      if (!bgmSound) {
        bgmSound = new Howl({
          src: ['/music/videoplayback.m4a'], 
          loop: true,
          volume: 0.3, 
          html5: true // Gunakan HTML5 audio untuk file besar agar tidak macet
        });
      }
      if (!bgmSound.playing()) {
        bgmSound.play();
        isBgmPlaying = true;
      }
    } catch(e) {
      console.error("Failed to autoplay BGM:", e);
    }
  }
};

export const toggleBGM = () => {
  if (isBgmPlaying && bgmSound) {
    bgmSound.stop();
    isBgmPlaying = false;
    if (typeof window !== 'undefined') localStorage.setItem('bgm_active', 'false');
    return false;
  } else {
    try {
      if (Howler && Howler.ctx && Howler.ctx.state === 'suspended') {
        Howler.ctx.resume().catch(e => console.warn("Failed to resume Howler context:", e));
      }
      if (!bgmSound) {
        bgmSound = new Howl({
          src: ['/music/videoplayback.m4a'], 
          loop: true,
          volume: 0.3, 
          html5: true // Gunakan HTML5 audio untuk file besar agar tidak macet
        });
      }
      bgmSound.play();
      isBgmPlaying = true;
      if (typeof window !== 'undefined') localStorage.setItem('bgm_active', 'true');
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
};
