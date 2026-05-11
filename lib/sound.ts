import { Howl } from 'howler';

// Preload sounds untuk performa lebih baik
const sounds: Record<string, Howl> = {
  correct: new Howl({ src: ['/sound_effect/yes.mp3'], volume: 1.0 }),
  wrong: new Howl({ src: ['/sound_effect/no.mp3'], volume: 1.0 }),
  success: new Howl({ src: ['/sound_effect/succses.mp3'], volume: 1.0 }),
};

export const playSound = (type: 'correct' | 'wrong' | 'pop' | 'hover' | 'success') => {
  try {
    if (sounds[type]) {
      sounds[type].play();
      return;
    }

    // Fallback synthesizer untuk pop dan hover
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
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

export const toggleBGM = () => {
  if (isBgmPlaying && bgmSound) {
    bgmSound.stop();
    isBgmPlaying = false;
    return false;
  } else {
    try {
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
      return true;
    } catch(e) {
      console.error(e);
      return false;
    }
  }
};
