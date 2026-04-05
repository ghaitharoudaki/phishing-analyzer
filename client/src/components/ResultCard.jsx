import ThreatScore from './ThreatScore'
import VendorTable from './VendorTable'

export default function ResultCard({ result }) {
  const { url, threatScore, stats, categories, reputation, domain, redirectChain, vendors, lastAnalysisDate } = result

  const date = lastAnalysisDate
    ? new Date(lastAnalysisDate * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'N/A'

  const cats = [...new Set(Object.values(categories))].slice(0, 3)
  const totalEngines = Object.values(stats).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-4">
      {/* URL strip */}
      <div className="card px-4 py-3 flex items-center justify-between fade-in-up">
        <div className="flex items-center gap-3 min-w-0">
          <span className="stat-label shrink-0">Target</span>
          <span className="font-mono text-sm text-green-400 truncate">{url}</span>
        </div>
        <span className="badge badge-blue shrink-0 ml-4">{totalEngines} engines</span>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 fade-in-up-1">
        <ThreatScore score={threatScore} stats={stats} />

        {/* Domain card */}
        <div className="card p-6">
          <div className="stat-label mb-5">Domain Intelligence</div>
          <div className="space-y-0">
            {[
              { label: 'Domain', value: domain, mono: true },
              { label: 'Reputation Score', value: reputation > 0 ? `+${reputation}` : reputation, color: reputation > 0 ? 'text-green-400' : reputation < 0 ? 'text-red-400' : 'text-slate-400' },
              { label: 'Last Analysis', value: date },
              { label: 'Redirect Chain', value: `${redirectChain.length} hop${redirectChain.length !== 1 ? 's' : ''}` },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <span className="text-xs text-slate-500 font-mono">{row.label}</span>
                <span className={`text-sm font-medium ${row.color || 'text-slate-200'} ${row.mono ? 'font-mono text-xs' : ''}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {cats.length > 0 && (
            <div className="mt-4">
              <div className="stat-label mb-2">Categories</div>
              <div className="flex flex-wrap gap-2">
                {cats.map((c, i) => (
                  <span key={i} className="badge badge-slate">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vendor table */}
      <div className="fade-in-up-2">
        <VendorTable vendors={vendors} />
      </div>
    </div>
  )
}