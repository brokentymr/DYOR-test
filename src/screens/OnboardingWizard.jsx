import React from 'react';

/**
 * Step indicator pill used in the onboarding wizard to show progress.
 */
function StepPill({ active, completed, label }) {
  const base =
    'flex-1 h-8 rounded-full text-[11px] flex items-center justify-center gap-1 border';
  if (completed)
    return (
      <div
        className={`${base} bg-emerald-900/40 border-emerald-500/50 text-emerald-200`}
      >
        <span>✓</span>
        <span>{label}</span>
      </div>
    );
  if (active)
    return (
      <div
        className={`${base} bg-slate-800/80 border-slate-500/70 text-slate-100`}
      >
        <span>●</span>
        <span>{label}</span>
      </div>
    );
  return (
    <div
      className={`${base} bg-slate-900/60 border-slate-800/80 text-slate-500`}
    >
      <span>•</span>
      <span>{label}</span>
    </div>
  );
}

/**
 * Onboarding wizard guiding users through connecting a wallet and linking social profiles.
 */
export function OnboardingWizard({
  walletConnected,
  socialLinked,
  onWalletConnect,
  onSocialConnect,
  onNext,
  onBack
}) {
  const canContinue = walletConnected && socialLinked;

  return (
    <section className="mt-8">
      <div className="max-w-3xl mx-auto rounded-[32px] bg-slate-950/70 border border-slate-800/80 backdrop-blur-xl shadow-glass p-6 md:p-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-50">
              Account Setup
            </h2>
            <p className="text-xs text-slate-400">
              Connect your wallet and social profiles to start an evaluation test.
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-[11px] text-slate-400 hover:text-slate-200"
          >
            ← Back
          </button>
        </div>
        <div className="flex gap-2 mb-6">
          <StepPill
            active={!walletConnected}
            completed={walletConnected}
            label="Connect Wallet"
          />
          <StepPill
            active={walletConnected && !socialLinked}
            completed={socialLinked}
            label="Social Setup"
          />
          <StepPill
            active={walletConnected && socialLinked}
            completed={false}
            label="Select Eval Size"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[.18em] text-slate-500 mb-2">
                Step 1
              </div>
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                Connect Wallet
              </h3>
              <p className="text-[11px] text-slate-400">
                Connect your wallet to link on-chain identity with your evaluation
                profile. No live funds are used in this demo.
              </p>
            </div>
            <button
              onClick={onWalletConnect}
              className={`mt-4 text-xs px-3 py-2 rounded-full border transition flex items-center justify-center gap-1 ${
                walletConnected
                  ? 'bg-emerald-900/50 border-emerald-500/60 text-emerald-200'
                  : 'bg-slate-800/60 border-slate-600/80 text-slate-100 hover:border-lfgTeal/70 hover:text-lfgTeal'
              }`}
            >
              {walletConnected ? 'Wallet Connected' : 'Connect Demo Wallet'}
            </button>
          </div>
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800/80 p-4 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[.18em] text-slate-500 mb-2">
                Step 2
              </div>
              <h3 className="text-sm font-semibold text-slate-50 mb-1">
                Social Profiles
              </h3>
              <p className="text-[11px] text-slate-400">
                Link X (Twitter), Discord, and other handles so your passing eval
                results can be tied to a verifiable trader profile.
              </p>
            </div>
            <button
              onClick={onSocialConnect}
              className={`mt-4 text-xs px-3 py-2 rounded-full border transition flex items-center justify-center gap-1 ${
                socialLinked
                  ? 'bg-emerald-900/50 border-emerald-500/60 text-emerald-200'
                  : 'bg-slate-800/60 border-slate-600/80 text-slate-100 hover:border-lfgPink/70 hover:text-lfgPink'
              }`}
            >
              {socialLinked ? 'Socials Linked' : 'Connect Social Profiles'}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-slate-500">
            Evaluation mode only: no real keys, no real deposits. This flow just
            demonstrates how the keeper-gated onboarding will work.
          </div>
          <button
            disabled={!canContinue}
            onClick={onNext}
            className={`text-xs px-4 py-2 rounded-full border transition ${
              canContinue
                ? 'bg-lfgYellow text-slate-950 border-lfgYellow hover:bg-amber-300'
                : 'bg-slate-900/50 border-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            Continue to Eval Size →
          </button>
        </div>
      </div>
    </section>
  );
}