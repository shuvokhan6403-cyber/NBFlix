# NBFlix for Vercel

## Upload structure
- `index.html` (replace the repository's current index.html)
- `api/tmdb.js` (new Vercel API route)
- `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png` (keep/add these if you use the PWA assets)

## Vercel setup
1. Project Settings → Build and Deployment:
   - Framework Preset: Other
   - Root Directory: empty (repository root)
   - Build Command: empty / disabled
   - Output Directory: `.` (or leave the default if Vercel serves the root static files)
2. Project Settings → Environment Variables:
   - Name: `TMDB_API_KEY`
   - Value: your own TMDB API key
   - Select Production (and Preview if needed), then Save.
3. Redeploy after adding the environment variable.

The TMDB key is deliberately not embedded in browser code. Do not commit it to GitHub.
