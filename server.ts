/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const sanitizeEnvValue = (val: string | undefined): string | undefined => {
  if (!val) return undefined;
  let trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.substring(1, trimmed.length - 1).trim();
  }
  return trimmed;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use raw parser for Supabase API requests to preserve exact binary/JSON payloads
  app.use('/api/supabase', express.raw({ type: '*/*', limit: '50mb' }));

  // API Proxy for Supabase requests
  app.all('/api/supabase/*', async (req, res) => {
    const rawUrl = process.env.VITE_SUPABASE_URL || 'https://wmgzhqtqmnddfjykaykm.supabase.co';
    const supabaseUrl = sanitizeEnvValue(rawUrl);

    if (!supabaseUrl) {
      console.error('[Supabase Proxy] VITE_SUPABASE_URL environment variable is missing.');
      return res.status(500).json({ error: 'Supabase URL is not configured on the server.' });
    }

    // Extract the relative path and query parameters
    const pathAndQuery = req.url.slice('/api/supabase'.length);
    const targetUrl = `${supabaseUrl}${pathAndQuery}`;

    try {
      const headers: Record<string, string> = {};
      
      // Forward incoming client request headers safely
      for (const [key, value] of Object.entries(req.headers)) {
        if (
          typeof value === 'string' &&
          !['host', 'connection', 'content-length', 'accept-encoding', 'origin', 'referer'].includes(key.toLowerCase())
        ) {
          headers[key] = value;
        }
      }

      // Explicitly set content-type if it was supplied
      if (req.headers['content-type']) {
        headers['content-type'] = req.headers['content-type'] as string;
      }

      // Explicitly calculate and set content-length to prevent 411 Length Required / chunked upload failures on Supabase
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        if (req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
          headers['content-length'] = String(req.body.length);
        } else if (req.headers['content-length']) {
          headers['content-length'] = req.headers['content-length'] as string;
        }
      }

      const fetchOptions: RequestInit = {
        method: req.method,
        headers,
      };

      // Set the body for payload methods only if we have a valid non-empty Buffer
      if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method) && req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
        fetchOptions.body = req.body;
      }

      console.log(`[Supabase Proxy] Forwarding ${req.method} request to: ${targetUrl}`);
      const response = await fetch(targetUrl, fetchOptions);

      // Copy response headers to the client
      response.headers.forEach((value, name) => {
        if (!['content-encoding', 'transfer-encoding', 'content-length'].includes(name.toLowerCase())) {
          res.setHeader(name, value);
        }
      });

      res.status(response.status);

      // Stream the response back as an ArrayBuffer
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    } catch (err: any) {
      console.error('[Supabase Proxy Error] Failed to proxy request:', err);
      res.status(500).json({
        error: 'Failed to proxy request to Supabase',
        message: err.message,
      });
    }
  });



  // Health check route
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log('[Server] Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Server] Serving production assets from dist/');
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Startup Error]', err);
  process.exit(1);
});
