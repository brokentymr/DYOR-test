import React from 'react';

/**
 * Landing page with simple marketing text and an entry button.
 */
export function HomeScreen({ onEnter }) {
  return (
    <section className="mt-10 flex flex-col items-center text-center">
      <div className="max-w-2xl rounded-[32px] border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl shadow-glass px-8 py-10">
        <div className="text-xs uppercase tracking-[.3em] text-slate-500 mb-2">
          LFG Modular Quant
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-50 mb-3">
          Invest in strategies,{' '}
          <span className="text-lfgYellow">not assets</span>.
        </h1>
        <p className="text-sm md:text-[15px] text-slate-400 mb-6">
          This evaluation terminal lets traders prove skill in a simulated prop
          environment. Pass the test, earn a vault permit, and later unlock
          capital-backed vault licenses.
        </p>
        <button
          onClick={onEnter}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-lfgYellow text-slate-950 text-sm font-semibold shadow-lg shadow-yellow-500/20 hover:bg-amber-300 transition"
        >
          Enter Evaluation Mode
          <span>↗</span>
        </button>
        <div className="mt-6 text-[11px] text-slate-500">
          Demo only. Evaluation, vault permits, and keeper routing are simulated
          for now.
        </div>
      </div>
    </section>
  );
}