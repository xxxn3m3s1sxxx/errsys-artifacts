const ARTIFACT_PATHS = [
  '/llms.txt',
  '/llms-full.txt',
  '/public/wave.json',
  '/.well-known/ai-catalog.json',
  '/.well-known/mcp/server-card.json',
];

const ORIGIN = 'https://xxxn3m3s1sxxx.github.io';

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Strip /errsys-artifacts prefix if present (workers.dev serves under subpath)
    const canonicalPath = path.replace(/^\/errsys-artifacts/, '') || '/';

    const isArtifact = ARTIFACT_PATHS.some(p => canonicalPath.startsWith(p));

    if (isArtifact) {
      const ua = req.headers.get('user-agent') || 'unknown';
      const ts = new Date().toISOString();
      const date = ts.slice(0, 10);

      // Hash UA for deduplication (same UA, same day = one key)
      const uaHash = await hashString(ua);
      const key = `log:${date}:${uaHash.slice(0, 12)}`;

      // Async write — does not block response
      env.KV.put(key, JSON.stringify({
        ts,
        ua,
        path: canonicalPath,
      }), { expirationTtl: 86400 * 90 }); // 90 days retention
    }

    // Passthrough to GitHub Pages origin
    const originUrl = `${ORIGIN}${canonicalPath}${url.search}`;
    return fetch(originUrl, {
      method: req.method,
      headers: req.headers,
      redirect: 'follow',
    });
  },
};

async function hashString(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
