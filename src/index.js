export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Serve index.html for root and SPA routes
    if (url.pathname === '/' || !url.pathname.includes('.')) {
      return fetch(new Request(new URL('/index.html', request.url), request));
    }
    
    // Serve static assets
    return fetch(request);
  },
};