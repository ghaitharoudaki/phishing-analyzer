export default function Hero() {
  return (
    <div className="mb-10 fade-in-up">
      {/* Nav bar */}
      <div className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-400 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#030712" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="font-display font-bold text-white text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>ThreatLens</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" />
          <span className="text-xs font-mono text-slate-500">Live threat intelligence</span>
        </div>
      </div>

      {/* Hero text */}
      <div className="max-w-2xl">
        <div className="badge badge-green mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
          90+ Security Engines
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif' }} className="text-5xl font-bold text-white leading-tight mb-4">
          Detect Phishing &<br />
          <span style={{ color: '#4ade80' }}>Malicious URLs</span> Instantly
        </h1>
        <p className="text-slate-400 text-base leading-relaxed max-w-lg">
          Analyze any URL against real-time threat intelligence from 90+ security vendors. Get a comprehensive risk report in seconds.
        </p>
      </div>
    </div>
  )
}