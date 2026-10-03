// Vercel serverless function: /api/tmdb
// Add TMDB_API_KEY in Vercel > Project Settings > Environment Variables.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'TMDB_API_KEY is not configured in Vercel.' });

  const endpoint = typeof req.query.endpoint === 'string' ? req.query.endpoint : '/trending/all/week';
  // Only allow TMDB API paths; reject absolute URLs and path traversal.
  if (!endpoint.startsWith('/') || endpoint.startsWith('//') || endpoint.includes('..')) {
    return res.status(400).json({ error: 'Invalid TMDB endpoint.' });
  }

  try {
    const url = new URL('https://api.themoviedb.org/3' + endpoint);
    url.searchParams.set('api_key', apiKey);
    const response = await fetch(url.toString());
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'TMDB request failed.' });
  }
}
