import React from 'react';

/**
 * Top navigation bar displaying the logo and simple nav items.
 * Clicking the logo returns to the home screen. Links are placeholders.
 */
export function TopNav({ onLogoClick }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-2 group"
      >
        <div className="h-9 w-9 rounded-2xl bg-slate-900/70 border border-slate-700/80 shadow-glass flex items-center justify-center">
          <span className="text-xs font-semibold tracking-[.16em] text-lfgYellow group-hover:text-lfgTeal transition-colors">
            LFG
          </span>
        </div>
        <div className="text-left">
          <div className="text-sm text-slate-300 uppercase tracking-[.16em]">
            Modular Quant
          </div>
          <div className="text-xs text-slate-500">
            Evaluation Terminal
          </div>
        </div>
      </button>

      <div className="flex items-center gap-3">
        <button className="text-xs px-3 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-md hover:border-slate-500/80 transition">
          Docs
        </button>
        <button className="text-xs px-3 py-1.5 rounded-full border border-lfgYellow/70 bg-lfgYellow/10 text-lfgYellow hover:bg-lfgYellow/20 transition backdrop-blur">
          Sign In
        </button>
      </div>
    </header>
  );
}