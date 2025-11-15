import React from 'react';

// Colour tokens for different evaluation states
const statusColors = {
  idle: 'bg-slate-800/70 text-slate-200 border-slate-700/80',
  active: 'bg-emerald-900/50 text-emerald-200 border-emerald-500/40',
  passed: 'bg-lfgTeal/15 text-lfgTeal border-lfgTeal/60',
  breached: 'bg-rose-900/60 text-rose-200 border-rose-500/60'
};

/**
 * StatusBar displays current evaluation status, selected size, permit and license state.
 * It provides quick information at a glance at the top of the terminal.
 */
export function StatusBar({ sharedState }) {
  const { evalSize, evalStatus, hasPermit, licensePurchased } = sharedState;

  let statusLabel;
  if (evalStatus === 'idle') {
    statusLabel = 'No active evaluation';
  } else if (evalStatus === 'active') {
    statusLabel = 'Evaluation in progress';
  } else if (evalStatus === 'passed') {
    statusLabel = 'Eval passed – vault permit unlocked';
  } else if (evalStatus === 'breached') {
    statusLabel = 'Risk rules breached – reset required';
  }

  const statusClass = statusColors[evalStatus] || statusColors.idle;

  return (
    <section className="mt-4">
      <div className="rounded-3xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-md shadow-glass px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-2xl bg-slate-800 flex items-center justify-center text-xs text-slate-300">
            ⚙️
          </div>
          <div className="text-xs">
            <div className="text-slate-300">
              {statusLabel}
            </div>
            <div className="text-[11px] text-slate-500">
              Evaluation mode only — all trades are simulated via the keeper engine.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-[11px] text-slate-400">
            <div>
              Eval size:{' '}
              <span className="text-slate-100 font-medium">
                {evalSize ? `$${evalSize.toLocaleString()}` : 'not selected'}
              </span>
            </div>
            <div>
              Permit status:{' '}
              <span className="font-semibold">
                {hasPermit ? 'Verified Trader' : 'Unverified'}
              </span>
            </div>
            <div>
              License:{' '}
              <span className="font-semibold">
                {licensePurchased ? 'Purchased' : 'Not purchased'}
              </span>
            </div>
          </div>
          <div
            className={`text-[11px] px-3 py-1 rounded-full border ${statusClass}`}
          >
            {evalStatus === 'passed'
              ? 'Vault permit ready'
              : evalStatus === 'breached'
              ? 'Breach – reset for fee'
              : evalStatus === 'active'
              ? 'Running eval'
              : 'Idle'}
          </div>
        </div>
      </div>
    </section>
  );
}