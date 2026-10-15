var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_fs = __toESM(require("fs"), 1);
import_dotenv.default.config();
var sanitizeEnvValue = (val) => {
  if (!val) return void 0;
  let trimmed = val.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') || trimmed.startsWith("'") && trimmed.endsWith("'")) {
    trimmed = trimmed.substring(1, trimmed.length - 1).trim();
  }
  return trimmed;
};
process.on("uncaughtException", (err) => {
  console.error("[Server UncaughtException]", err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[Server UnhandledRejection]", reason);
});
async function startServer() {
  const app = (0, import_express.default)();
  const portArgIndex = process.argv.indexOf("--port");
  const portFromArgs = portArgIndex !== -1 ? Number(process.argv[portArgIndex + 1]) : null;
  const PORT = Number(process.env.PORT) || portFromArgs || 3e3;
  const hostArgIndex = process.argv.indexOf("--host");
  const hostFromArgs = hostArgIndex !== -1 ? process.argv[hostArgIndex + 1] : null;
  const HOST = process.env.HOST || hostFromArgs || "0.0.0.0";
  app.use("/api/supabase", import_express.default.raw({ type: "*/*", limit: "50mb" }));
  app.all("/api/supabase/*", async (req, res) => {
    if (req.method === "OPTIONS") {
      const origin = req.headers.origin || "*";
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
      res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "authorization, apikey, content-type, x-client-info, x-supabase-auth");
      return res.status(204).end();
    }
    const rawUrl = process.env.VITE_SUPABASE_URL || "https://wmgzhqtqmnddfjykaykm.supabase.co";
    const supabaseUrl = sanitizeEnvValue(rawUrl);
    if (!supabaseUrl) {
      console.error("[Supabase Proxy] VITE_SUPABASE_URL environment variable is missing.");
      return res.status(500).json({ error: "Supabase URL is not configured on the server." });
    }
    const pathAndQuery = req.url.slice("/api/supabase".length);
    const targetUrl = `${supabaseUrl}${pathAndQuery}`;
    try {
      const headers = {};
      for (const [key, value] of Object.entries(req.headers)) {
        if (typeof value === "string" && !["host", "connection", "content-length", "accept-encoding", "origin", "referer"].includes(key.toLowerCase())) {
          if (key.toLowerCase() === "authorization") {
            headers["Authorization"] = value;
          } else {
            headers[key] = value;
          }
        }
      }
      if (req.headers["content-type"]) {
        headers["content-type"] = req.headers["content-type"];
      }
      if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
        if (req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
          headers["content-length"] = String(req.body.length);
        } else if (req.headers["content-length"]) {
          headers["content-length"] = req.headers["content-length"];
        }
      }
      const fetchOptions = {
        method: req.method,
        headers
      };
      if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && req.body && Buffer.isBuffer(req.body) && req.body.length > 0) {
        fetchOptions.body = req.body;
      }
      console.log(`[Supabase Proxy] Forwarding ${req.method} request to: ${targetUrl}`);
      const response = await fetch(targetUrl, fetchOptions);
      if (res.headersSent || res.writableEnded) {
        return;
      }
      response.headers.forEach((value, name) => {
        const lowerName = name.toLowerCase();
        if (!["content-encoding", "transfer-encoding", "content-length"].includes(lowerName) && !lowerName.startsWith("access-control-")) {
          try {
            res.setHeader(name, value);
          } catch (_) {
          }
        }
      });
      const origin = req.headers.origin || "*";
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Credentials", "true");
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD");
      res.setHeader("Access-Control-Allow-Headers", req.headers["access-control-request-headers"] || "authorization, apikey, content-type, x-client-info, x-supabase-auth");
      res.status(response.status);
      const buffer = await response.arrayBuffer();
      if (!res.writableEnded) {
        res.send(Buffer.from(buffer));
      }
    } catch (err) {
      console.error("[Supabase Proxy Error] Failed to proxy request:", err);
      if (!res.headersSent && !res.writableEnded) {
        res.status(500).json({
          error: "Failed to proxy request to Supabase",
          message: err?.message || String(err)
        });
      }
    }
  });
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  app.get(["/about", "/about/"], (req, res) => {
    res.redirect(301, "/doctors/");
  });
  const assetRedirectMap = {
    "/1,-1.webp": "/1-1.webp",
    "/1730717115_Statue_of_Unity.jpg": "/1730717115-statue-of-unity.jpg",
    "/2,-1.webp": "/2-1.webp",
    "/3,-1.webp": "/3-1.webp",
    "/4,-1.webp": "/4-1.webp",
    "/5,-1.webp": "/5-1.webp",
    "/Aligners svg.svg": "/aligners-svg.svg",
    "/Aligners.webp": "/aligners.webp",
    "/Best Dntal Hospital Rajkot.PNG": "/best-dental-hospital-rajkot.png",
    "/Dental Implant svg.svg": "/dental-implant-svg.svg",
    "/Dental Implants.webp": "/dental-implants.webp",
    "/Digital Dental Experts.webp": "/digital-dental-experts.webp",
    "/Dr. Kinjal Patel.JPG": "/dr-kinjal-patel.jpg",
    "/Dr. Vipul Patel.jpg": "/dr-vipul-patel.jpg",
    "/Full Mouth.webp": "/full-mouth.webp",
    "/Gir-National-Park-and-Santuary.jpg": "/gir-national-park-and-sanctuary.jpg",
    "/Great Rann Of Kutch (14).jpg": "/great-rann-of-kutch-14.jpg",
    "/Gujarat-Dwarkadhish-Temple.jpg": "/gujarat-dwarkadhish-temple.jpg",
    "/IMG_20190521_190345.jpg": "/img-20190521-190345.jpg",
    "/IMG_20200313_130221.jpg": "/img-20200313-130221.jpg",
    "/IMG_3610.webp": "/img-3610.webp",
    "/LOGO 3D FULL NAME WHITE (3)-1.png": "/logo-3d-full-name-white-3-1.png",
    "/MG_3249.webp": "/mg-3249.webp",
    "/NRI.webp": "/nri.webp",
    "/Oral & Maxillofacial Surgeries svg.svg": "/oral-and-maxillofacial-surgeries-svg.svg",
    "/Oral & Maxillofacial Surgery.png": "/oral-and-maxillofacial-surgery.png",
    "/Root Canal Treatments.svg.svg": "/root-canal-treatments.svg",
    "/Root Canal.webp": "/root-canal.webp",
    "/Smile Designing.webp": "/smile-designing.webp",
    "/Teblate hero image-1.webp": "/tablet-hero-image-1.webp",
    "/cline aliner in rajkot.jpg": "/clear-aligner-in-rajkot.jpg",
    "/dental implant in rajkot.jpg": "/dental-implant-in-rajkot.jpg",
    "/dr. patel.png": "/dr-patel.png",
    "/dr. vipul patel.webp": "/dr-vipul-patel.webp",
    "/sounds/notification.wav.mp3": "/sounds/notification.mp3",
    "/white teeth in rajkot.jpg": "/white-teeth-in-rajkot.jpg"
  };
  app.use((req, res, next) => {
    let decodedPath = req.path;
    try {
      decodedPath = decodeURIComponent(req.path);
    } catch (_) {
    }
    const destination = assetRedirectMap[decodedPath] || assetRedirectMap[req.path];
    if (destination) {
      return res.redirect(301, destination);
    }
    next();
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true, hmr: false },
      appType: "spa"
    });
    app.use(vite.middlewares);
    console.log("[Server] Vite middleware mounted in development mode");
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      const requestedPath = req.path;
      const cleanPath = requestedPath.endsWith("/") && requestedPath !== "/" ? requestedPath.slice(0, -1) : requestedPath;
      const htmlFile = cleanPath === "/" ? "index.html" : import_path.default.join(cleanPath, "index.html");
      const fullPath = import_path.default.join(distPath, htmlFile);
      if (import_fs.default.existsSync(fullPath)) {
        return res.sendFile(fullPath);
      }
      if (cleanPath === "/admin" || cleanPath.startsWith("/admin/") || cleanPath === "/admin-login" || cleanPath === "/supabase-test") {
        return res.sendFile(import_path.default.join(distPath, "index.html"));
      }
      const notFoundPath = import_path.default.join(distPath, "404.html");
      if (import_fs.default.existsSync(notFoundPath)) {
        return res.status(404).sendFile(notFoundPath);
      }
      return res.status(404).send("404 Not Found");
    });
    console.log("[Server] Serving production assets from dist/");
  }
  const server = app.listen(PORT, HOST, () => {
    console.log(`[Server] Listening on http://${HOST}:${PORT}`);
  });
  server.on("error", (err) => {
    console.error("[Server Error]", err);
  });
}
startServer().catch((err) => {
  console.error("[Server Startup Error]", err);
  process.exit(1);
});
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
//# sourceMappingURL=server.cjs.map
