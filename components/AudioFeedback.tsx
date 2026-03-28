"use client";

import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

/**
 * High-quality UI sounds using Web Audio API
 */
type SoundType = "click" | "pop" | "success" | "toggle" | "error" | "hover";

interface AudioContextType {
  play: (type: SoundType) => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("useAudio must be used within an AudioProvider");
  return context;
};

export function AudioProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initializing on first interaction is best but we can store it
    const initCtx = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener("click", initCtx, { once: true });
    window.addEventListener("keydown", initCtx, { once: true });

    return () => {
      window.removeEventListener("click", initCtx);
      window.removeEventListener("keydown", initCtx);
    };
  }, []);

  const toggleMute = () => setIsMuted(prev => !prev);

  const getOscillator = (freq: number, type: OscillatorType = "sine", gValue = 0.1) => {
    const ctx = audioCtxRef.current;
    if (!ctx || isMuted) return null;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.connect(ctx.destination);
    osc.connect(gain);

    return { osc, gain, ctx };
  };

  const play = (type: SoundType) => {
    const ctx = audioCtxRef.current;
    if (!ctx || isMuted || ctx.state === "suspended") return;

    const v = volume * 0.2; // Keep it subtle and low volume

    switch (type) {
      case "click": {
        const { osc, gain } = getOscillator(1200, "sine")!; 
        gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        break;
      }
      case "pop": {
        const { osc, gain } = getOscillator(800, "sine")!;
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
        break;
      }
      case "hover": {
        const { osc, gain } = getOscillator(600, "sine")!;
        gain.gain.exponentialRampToValueAtTime(v * 0.3, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
        break;
      }
      case "success": {
        const { osc, gain } = getOscillator(880, "sine")!;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(v, ctx.currentTime + 0.02);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
        break;
      }
      case "toggle": {
        const { osc, gain } = getOscillator(440, "sine")!;
        osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(v, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        break;
      }
      case "error": {
        const { osc, gain } = getOscillator(150, "square")!;
        gain.gain.exponentialRampToValueAtTime(v * 0.5, ctx.currentTime + 0.01);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
        osc.start();
        osc.stop(ctx.currentTime + 0.2);
        break;
      }
    }
  };

  return (
    <AudioContext.Provider value={{ play, isMuted, toggleMute, volume, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
}
