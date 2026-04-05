# 🛡️ ThreatLens — URL Threat Analyzer

A full-stack cybersecurity tool that analyzes any URL for phishing, malware, and malicious behavior using real-time threat intelligence from 90+ security engines.

**🔗 Live Demo: [ThreatLens.vercel.app](https://threatlens-io.vercel.app)**

![PhishGuard Screenshot](https://og-image.vercel.app/PhishGuard.png)

---

## ✨ Features

- 🔍 **Real-time URL scanning** powered by VirusTotal API
- 🧠 **90+ security engines** — Kaspersky, Sophos, BitDefender, ESET and more
- 📊 **Threat score** with visual risk indicator
- 🌐 **Domain intelligence** — reputation, redirect chain, categories
- 🕒 **Scan history** — last 5 scans with rescan support
- ⚡ **URL autocomplete** — smart suggestions as you type
- 🎨 **Modern glassmorphism UI** with smooth animations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Vercel Serverless Functions |
| Threat Intelligence | VirusTotal API |
| Deployment | Vercel |

---

## 🚀 Run Locally

### 1. Clone the repo
```bash
git clone https://github.com/ghaitharoudaki/phishing-analyzer.git
cd phishing-analyzer
```

### 2. Install dependencies
```bash
cd client
npm install
```

### 3. Set up environment variables
Create a `.env` file inside `client/`:
VITE_API_URL=http://localhost:5000
VIRUSTOTAL_API_KEY=your_api_key_here
Get your free API key at [virustotal.com](https://www.virustotal.com)

### 4. Start the dev server
```bash
npm run dev
```

---

## 📡 API

The backend runs as a Vercel Serverless Function at `/api/analyze`.

**POST** `/api/analyze`
```json
{
  "url": "https://suspicious-site.com"
}
```

**Response:**
```json
{
  "url": "https://suspicious-site.com",
  "threatScore": 85,
  "stats": { "malicious": 12, "suspicious": 3, "harmless": 70, "undetected": 10 },
  "domain": "suspicious-site.com",
  "reputation": -50,
  "categories": {},
  "vendors": { ... }
}
```

---

## 🔒 How It Works

1. User enters a URL
2. The serverless function sends it to VirusTotal's API
3. VirusTotal scans it across 90+ security engines
4. Results are parsed into a clean threat report
5. Frontend displays the risk score, vendor breakdown, and domain info

---

## 👨‍💻 Author

**Ghaith Aroudaki**
- GitHub: [@ghaitharoudaki](https://github.com/ghaitharoudaki)
- LinkedIn: [linkedin.com/in/ghaitharoudaki](https://linkedin.com/in/ghaitharoudaki)

---

## 📄 License

MIT License — feel free to use and build on this project.
