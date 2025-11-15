import React from 'react';

// Predefined evaluation account sizes and corresponding max drawdowns.
const sizes = [10000, 25000, 50000, 100000];

/**
 * Screen to let users choose the simulated account size for their evaluation.
 */
export function EvalSizeScreen({ evalSize, onSelectSize, onBack, onContinue }) {
  return (
    <section className="mt-8">
      <div className="max-w-4xl mx-auto rounded-[32px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-glass p-6 md:p-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Choose your evaluation test size
            </h2>
            <p className="text-xs text-slate-400 max-w-xl">
              Pick a simulated account size. Drawdown rules and keeper risk
              parameters scale with this notional — just like a real prop test.
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-[11px] text-slate-400 hover:text-slate-200"
          >
            ← Back
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {sizes.map((size) => {
            const selected = evalSize === size;
            let maxDraw;
            if (size === 10000) maxDraw = '10%';
            else if (size === 25000) maxDraw = '8%';
            else if (size === 50000) maxDraw = '7%';
            else maxDraw = '6%';
            return (
              <button
                key={size}
                onClick={() => onSelectSize(size)}
                className={`relative rounded-2xl p-4 text-left border transition backdrop-blur-md ${
                  selected
                    ? 'border-lfgTeal/80 bg-lfgTeal/10 shadow-glass'
                    : 'border-slate-800/80 bg-slate-900/70 hover:border-slate-500/80'
                }`}
              >
                <div className="text-xs text-slate-400 mb-1">
                  Simulated balance
                </div>
                <div className="text-sm font-semibold text-slate-50 mb-1">
                  ${size.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500">
                  Max drawdown: {maxDraw}
                </div>
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-slate-500 max-w-md">
            Passed evaluation accounts earn a{' '}
            <span className="text-slate-200 font-medium">Vault Permit</span>.
            Permit holders are considered{' '}
            <span className="text-lfgTeal font-semibold">Verified Traders</span>{' '}
            and can purchase real vault licenses later.
          </div>
          <button
            disabled={!evalSize}
            onClick={onContinue}
            className={`text-xs px-4 py-2 rounded-full border transition ${
              evalSize
                ? 'bg-lfgYellow text-slate-950 border-lfgYellow hover:bg-amber-300'
                : 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Continue to Trade Eval →
          </button>
        </div>
      </div>
    </section>
  );
}