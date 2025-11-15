import React, { useState } from 'react';
import {
  HomeScreen,
  OnboardingWizard,
  EvalSizeScreen,
  TradeEvalScreen
} from './screens/index.js';
import { TopNav } from './components/TopNav.jsx';
import { StatusBar } from './components/StatusBar.jsx';

// Enumerated views for clarity.
const VIEWS = {
  HOME: 'HOME',
  ONBOARD: 'ONBOARD',
  EVAL_SIZE: 'EVAL_SIZE',
  TRADE_EVAL: 'TRADE_EVAL'
};

// Main application orchestrating the flow between screens and holding global state.
export default function App() {
  const [view, setView] = useState(VIEWS.HOME);

  // Persistent state across screens. In a real app this would likely live
  // in a context or state management library.
  const [walletConnected, setWalletConnected] = useState(false);
  const [socialLinked, setSocialLinked] = useState(false);
  const [evalSize, setEvalSize] = useState(null);
  const [evalStatus, setEvalStatus] = useState('idle'); // idle | active | passed | breached
  const [hasPermit, setHasPermit] = useState(false);
  const [licensePurchased, setLicensePurchased] = useState(false);

  // Reset evaluation parameters on returning home.
  const goHome = () => {
    setView(VIEWS.HOME);
    setEvalStatus('idle');
    setEvalSize(null);
    setHasPermit(false);
    setLicensePurchased(false);
  };

  const sharedState = {
    walletConnected,
    socialLinked,
    evalSize,
    evalStatus,
    hasPermit,
    licensePurchased
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* background gradient glows for glass effect */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-lfgPink blur-3xl rounded-full mix-blend-screen" />
        <div className="absolute top-20 -right-40 w-96 h-96 bg-lfgTeal blur-3xl rounded-full mix-blend-screen" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-lfgYellow blur-3xl rounded-full mix-blend-screen opacity-40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-5">
        <TopNav onLogoClick={goHome} />
        <StatusBar sharedState={sharedState} />
        <main className="mt-6">
          {view === VIEWS.HOME && (
            <HomeScreen onEnter={() => setView(VIEWS.ONBOARD)} />
          )}
          {view === VIEWS.ONBOARD && (
            <OnboardingWizard
              walletConnected={walletConnected}
              socialLinked={socialLinked}
              onWalletConnect={() => setWalletConnected(true)}
              onSocialConnect={() => setSocialLinked(true)}
              onNext={() => setView(VIEWS.EVAL_SIZE)}
              onBack={goHome}
            />
          )}
          {view === VIEWS.EVAL_SIZE && (
            <EvalSizeScreen
              evalSize={evalSize}
              onSelectSize={(size) => setEvalSize(size)}
              onBack={() => setView(VIEWS.ONBOARD)}
              onContinue={() => setView(VIEWS.TRADE_EVAL)}
            />
          )}
          {view === VIEWS.TRADE_EVAL && (
            <TradeEvalScreen
              evalSize={evalSize}
              evalStatus={evalStatus}
              hasPermit={hasPermit}
              licensePurchased={licensePurchased}
              onBack={() => setView(VIEWS.EVAL_SIZE)}
              onStartEval={() => setEvalStatus('active')}
              onSimPass={() => {
                setEvalStatus('passed');
                setHasPermit(true);
              }}
              onSimBreach={() => {
                setEvalStatus('breached');
                setHasPermit(false);
              }}
              onResetEval={() => {
                // simulate fee paid and restart evaluation
                setEvalStatus('idle');
                setHasPermit(false);
              }}
              onPurchaseLicense={() => setLicensePurchased(true)}
            />
          )}
        </main>
      </div>
    </div>
  );
}