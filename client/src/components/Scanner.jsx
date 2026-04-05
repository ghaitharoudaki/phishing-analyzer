import { useState } from 'react'

const QUICK = [
  { label: 'google.com', url: 'https://google.com' },
  { label: 'github.com', url: 'https://github.com' },
  { label: 'paypal.com', url: 'https://paypal.com' },
]

export default function Scanner({ onAnalyze, loading }) {
  const [url, setUrl] = useState('')

  const handleSubmit = () => { if (url.trim()) onAnalyze(url.trim()) }
  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit() }

  return (
    <div className="card p-5 mb-8 fade-in-up-1">
      <div className="stat-label mb-3">URL Analysis</div>
      <div className="flex gap-3">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          onKeyDown={handleKey}
          placeholder="https://suspicious-domain.com/login"
          className="input-field flex-1"
        />
        <button onClick={handleSubmit} disabled={loading || !url.trim()} className="btn-primary">
          {loading ? 'Scanning...' : 'Analyze →'}
        </button>
      </div>

      <div className="flex items-center gap-3 mt-3">
        <span className="text-xs text-slate-600 font-mono">Quick scan:</span>
        {QUICK.map(q => (
          <button
            key={q.url}
            onClick={() => setUrl(q.url)}
            className="text-xs font-mono text-slate-500 hover:text-green-400 transition-colors"
          >
            {q.label}
          </button>
        ))}
      </div>
    </div>
  )
}