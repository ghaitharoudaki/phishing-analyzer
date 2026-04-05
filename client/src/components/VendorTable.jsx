import { useState } from 'react'

const TABS = ['all', 'malicious', 'suspicious', 'harmless', 'undetected']

const badgeClass = (cat) => {
  if (cat === 'malicious') return 'badge-red'
  if (cat === 'suspicious') return 'badge-yellow'
  if (cat === 'harmless') return 'badge-green'
  return 'badge-slate'
}

export default function VendorTable({ vendors }) {
  const [filter, setFilter] = useState('all')
  const entries = Object.values(vendors)
  const filtered = filter === 'all' ? entries : entries.filter(v => v.category === filter)
  const count = (tab) => tab === 'all' ? entries.length : entries.filter(v => v.category === tab).length

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="stat-label">Vendor Results</div>
        <span className="text-xs font-mono text-slate-500">{filtered.length} vendors</span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-4">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`text-xs font-mono px-3 py-1.5 rounded-md border transition-all ${
              filter === tab
                ? 'bg-green-400/10 border-green-400/30 text-green-400'
                : 'border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10'
            }`}
          >
            {tab} <span className="opacity-60">({count(tab)})</span>
          </button>
        ))}
      </div>

      <div className="divider mb-4" />

      {/* Vendor list */}
      <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
        {filtered.map(vendor => (
          <div
            key={vendor.engine_name}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.02] transition-colors group"
          >
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{vendor.engine_name}</span>
            <span className={`badge ${badgeClass(vendor.category)}`}>{vendor.result}</span>
          </div>
        ))}
      </div>
    </div>
  )
}