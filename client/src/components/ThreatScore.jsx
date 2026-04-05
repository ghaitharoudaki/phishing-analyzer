export default function ThreatScore({ score, stats }) {
  const getStatus = () => {
    if (score === 0) return { label: 'Clean', color: '#4ade80', badgeClass: 'badge-green' }
    if (score < 20) return { label: 'Low Risk', color: '#fbbf24', badgeClass: 'badge-yellow' }
    if (score < 50) return { label: 'Suspicious', color: '#fb923c', badgeClass: 'badge-yellow' }
    return { label: 'Dangerous', color: '#f87171', badgeClass: 'badge-red' }
  }

  const status = getStatus()
  const total = Object.values(stats).reduce((a, b) => a + b, 0)

  // Build bar segments (20 total)
  const segments = Array.from({ length: 20 }, (_, i) => {
    const pct = (i + 1) / 20
    const filled = score / 100 >= pct
    let color = '#1e3a2f'
    if (filled) {
      if (pct <= 0.4) color = '#4ade80'
      else if (pct <= 0.7) color = '#fbbf24'
      else color = '#f87171'
    }
    return { color, height: 16 + (i * 1.2) }
  })

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="stat-label mb-2">Risk Score</div>
          <div className="stat-value text-white">{score}</div>
          <div className="text-xs text-slate-500 font-mono mt-1">out of 100</div>
        </div>
        <span className={`badge ${status.badgeClass}`}>● {status.label}</span>
      </div>

      {/* Score bar */}
      <div className="score-bar mb-6">
        {segments.map((seg, i) => (
          <div
            key={i}
            className="score-segment"
            style={{
              height: seg.height,
              background: seg.color,
              transition: `background 0.3s ease ${i * 30}ms, height 0.4s ease ${i * 20}ms`
            }}
          />
        ))}
      </div>

      <div className="divider mb-4" />

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Malicious', value: stats.malicious, cls: 'text-red-400' },
          { label: 'Suspicious', value: stats.suspicious, cls: 'text-yellow-400' },
          { label: 'Harmless', value: stats.harmless, cls: 'text-green-400' },
          { label: 'Undetected', value: stats.undetected, cls: 'text-slate-400' },
        ].map(s => (
          <div key={s.label} className="card-inner p-3">
            <div className={`text-xl font-bold ${s.cls}`} style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-500 font-mono mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}