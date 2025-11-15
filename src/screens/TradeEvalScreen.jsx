import React, { useState, useEffect } from 'react';

/**
 * SwapField renders a labelled token input for the swap widget. When readOnly is
 * true it prevents editing, used for the "to" field.
 */
function SwapField({ label, value, onChange, token, readOnly = false }) {
  return (
    <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        <span className="text-slate-300">{token}</span>
      </div>
      <input
        type="number"
        value={value}
        onChange={(e) => !readOnly && onChange(e.target.value)}
        placeholder="0.00"
        readOnly={readOnly}
        className="bg-transparent outline-none text-sm text-slate-50 placeholder:text-slate-600"
      />
    </div>
  );
}

/**
 * Main trading evaluation screen. This contains a simplified swap widget
 * controlling simulated trades and evaluation state. Users can reset after
 * breaches, start new evaluations, and purchase licenses upon passing.
 */
export function TradeEvalScreen({
  evalSize,
  evalStatus,
  hasPermit,
  licensePurchased,
  onBack,
  onStartEval,
  onSimPass,
  onSimBreach,
  onResetEval,
  onPurchaseLicense
}) {
  // local form state for the swap inputs
  const [fromToken] = useState('USDC');
  const [toToken] = useState('BTC-PERP');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [direction, setDirection] = useState('long'); // 'long' or 'short'

  // update quoted toAmount whenever fromAmount changes (dummy pricing: 30k)
  useEffect(() => {
    const qty = parseFloat(fromAmount);
    if (isNaN(qty) || qty <= 0) {
      setToAmount('');
    } else {
      const price = 30000; // fake BTC price for demonstration
      const amount = qty / price;
      setToAmount(amount.toFixed(6));
    }
  }, [fromAmount]);

  // Determine if we should show the swap widget or call-to-action based on eval state
  const isIdle = evalStatus === 'idle';
  const isActive = evalStatus === 'active';
  const isPassed = evalStatus === 'passed';
  const isBreached = evalStatus === 'breached';

  // handle trade simulation: start eval if not started, then determine random outcome
  const handleSimTrade = () => {
    // require non-empty fromAmount
    if (!fromAmount) return;
    // ensure evaluation is started
    if (isIdle) {
      onStartEval();
    }
    // rudimentary random simulation: 20% breach, 30% pass, remainder continue
    const r = Math.random();
    if (r < 0.2) {
      onSimBreach();
    } else if (r < 0.5) {
      onSimPass();
    } else {
      // keep active
    }
  };

  return (
    <section className="mt-8">
      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6">
        {/* LEFT COLUMN: Swap / Trade widget and evaluation actions */}
        <div className="rounded-[32px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-glass p-6 md:p-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-[.18em] text-slate-500 mb-1">
                Evaluation Trading
              </div>
              <h2 className="text-sm font-semibold text-slate-50">
                Trade from the agentic swap interface
              </h2>
              <p className="text-[11px] text-slate-500 max-w-md">
                This simulates how your keeper-gated swap widget will route orders
                through the Hyperliquid connector. Select direction, input amount,
                and simulate trades. Passing the evaluation unlocks a vault
                permit. Breaching the drawdown rules resets the evaluation.
              </p>
            </div>
            <button
              onClick={onBack}
              className="text-[11px] text-slate-400 hover:text-slate-200"
            >
              ← Back
            </button>
          </div>
          {/* content depends on evaluation status */}
          {isIdle && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-slate-400 mb-4 text-center max-w-md">
                You're about to start a simulated prop evaluation with an account
                size of{' '}
                <span className="text-slate-200 font-medium">
                  ${evalSize?.toLocaleString()}
                </span>
                . When ready, click the button below and begin trading. Your
                trades will be checked against drawdown limits using live
                Hyperliquid market data.
              </p>
              <button
                onClick={onStartEval}
                className="px-6 py-2.5 rounded-full bg-lfgYellow text-slate-950 text-sm font-semibold shadow-lg shadow-yellow-500/20 hover:bg-amber-300 transition"
              >
                Start Evaluation
              </button>
            </div>
          )}
          {(isActive || isPassed) && (
            <div>
              <div className="mb-4 grid grid-cols-2 gap-3">
                <SwapField
                  label="From"
                  value={fromAmount}
                  onChange={setFromAmount}
                  token={fromToken}
                />
                <SwapField
                  label="To"
                  value={toAmount}
                  onChange={() => {}}
                  token={toToken}
                  readOnly
                />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 text-[13px] text-slate-300">
                  <label>Direction:</label>
                  <select
                    value={direction}
                    onChange={(e) => setDirection(e.target.value)}
                    className="bg-slate-800/60 border border-slate-700/70 text-slate-100 text-xs rounded-full px-3 py-1 outline-none"
                  >
                    <option value="long">Long</option>
                    <option value="short">Short</option>
                  </select>
                </div>
                <button
                  onClick={handleSimTrade}
                  className="flex-1 text-center px-5 py-2 rounded-full bg-lfgTeal/70 border border-lfgTeal/60 text-slate-950 font-semibold text-sm hover:bg-lfgTeal/80 transition"
                  disabled={!fromAmount}
                >
                  Simulate Trade
                </button>
              </div>
              <div className="text-[11px] text-slate-500 mb-4">
                Order size relative to evaluation account will influence drawdown.
                In this demo a random outcome determines pass, breach, or
                continuation.
              </div>
            </div>
          )}
          {isBreached && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-sm text-rose-200 mb-3 text-center">
                Oh no! Your evaluation breached the risk limits.
              </p>
              <p className="text-xs text-rose-300 mb-5 text-center max-w-md">
                The simulated account exceeded its maximum drawdown. You can
                reset the evaluation for a demo fee and try again.
              </p>
              <button
                onClick={onResetEval}
                className="px-6 py-2.5 rounded-full bg-lfgPink text-slate-950 text-sm font-semibold shadow-lg shadow-pink-500/20 hover:bg-pink-400 transition"
              >
                Reset Evaluation (demo fee)
              </button>
            </div>
          )}
          {isPassed && (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-sm text-emerald-200 mb-2 text-center">
                Congratulations!
              </p>
              <p className="text-xs text-emerald-300 mb-5 text-center max-w-md">
                You have passed the evaluation. Your vault permit has been
                unlocked. Permit holders are considered verified traders.
              </p>
              {!licensePurchased ? (
                <button
                  onClick={onPurchaseLicense}
                  className="px-6 py-2.5 rounded-full bg-lfgTeal text-slate-950 text-sm font-semibold shadow-lg shadow-teal-500/20 hover:bg-teal-300 transition"
                >
                  Purchase Vault License (demo)
                </button>
              ) : (
                <div className="text-xs text-slate-400">
                  Vault license purchased. You're ready to deploy capital-backed
                  strategies once available.
                </div>
              )}
            </div>
          )}
        </div>
        {/* RIGHT COLUMN: evaluation progress card */}
        <div className="rounded-[32px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-glass p-6 md:p-7 flex flex-col gap-4">
          <h3 className="text-sm font-semibold text-slate-50 mb-2">Evaluation Progress</h3>
          <p className="text-xs text-slate-400">
            Track your evaluation metrics in real time. In a full implementation
            this panel would show equity curves, drawdown statistics and open
            positions. For this demo it displays textual status.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex justify-between text-[13px] text-slate-300">
              <span>Status:</span>
              <span
                className={`font-semibold ${
                  isPassed
                    ? 'text-lfgTeal'
                    : isBreached
                    ? 'text-lfgPink'
                    : isActive
                    ? 'text-emerald-300'
                    : 'text-slate-400'
                }`}
              >
                {isPassed
                  ? 'Passed'
                  : isBreached
                  ? 'Breached'
                  : isActive
                  ? 'In Progress'
                  : 'Not Started'}
              </span>
            </div>
            <div className="flex justify-between text-[13px] text-slate-300">
              <span>Evaluation Size:</span>
              <span className="font-semibold text-slate-200">
                ${evalSize?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-[13px] text-slate-300">
              <span>Permit:</span>
              <span className="font-semibold text-slate-200">
                {hasPermit ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between text-[13px] text-slate-300">
              <span>License:</span>
              <span className="font-semibold text-slate-200">
                {licensePurchased ? 'Purchased' : '—'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}