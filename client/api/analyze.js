import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const VT_API_KEY = process.env.VIRUSTOTAL_API_KEY;
  const VT_BASE = 'https://www.virustotal.com/api/v3';

  try {
    const encoded = Buffer.from(url).toString('base64').replace(/=+$/, '');

    const vtRes = await axios.get(`${VT_BASE}/urls/${encoded}`, {
      headers: { 'x-apikey': VT_API_KEY }
    });

    const data = vtRes.data.data.attributes;
    const stats = data.last_analysis_stats;
    const totalEngines = Object.values(stats).reduce((a, b) => a + b, 0);
    const maliciousCount = stats.malicious + stats.suspicious;
    const threatScore = Math.round((maliciousCount / totalEngines) * 100);

    const urlObj = new URL(url);
    const domain = urlObj.hostname;

    let whoisData = null;
    try {
      const whoisRes = await axios.get(`https://api.whois.vin/v1/${domain}`);
      whoisData = whoisRes.data;
    } catch {
      whoisData = null;
    }

    res.status(200).json({
      url,
      threatScore,
      stats,
      categories: data.categories || {},
      reputation: data.reputation,
      lastAnalysisDate: data.last_analysis_date,
      redirectChain: data.redirection_chain || [],
      ssl: data.last_https_certificate || null,
      domain,
      whois: whoisData,
      vendors: data.last_analysis_results || {}
    });

  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: 'Analysis failed. Check the URL and try again.' });
  }
}