# Phase 6: Production Deployment & Cloud Operations Curriculum

## 1. Overview & Cloud Architecture

Deploying software is not simply pushing code to a repository; it is the discipline of architecting, configuring, running, and maintaining secure, reliable, and performant systems in public cloud environments. Course 15 (**Production Deployment & Cloud Operations**) bridges the gap between running an application on `localhost` and operating it in production.

The curriculum covers modern decoupled full-stack hosting architectures: static frontend SPAs on global Edge CDNs, containerized backend REST APIs on elastic cloud services, and fully managed cloud databases with automated backups and network firewalls.

---

## 2. Course Structure & Lesson Breakdown

### Lesson 1: Development vs. Production & Modern Build Pipelines (`development-vs-production-and-builds`)
- **Core Topics:**
  - Runtime differences: Local development servers (Vite HMR, unminified bundles, development error overlays, local SQLite/Docker databases) versus Production distributions (tree-shaken ES modules, minified CSS/JS, content-hashed filenames, production logging).
  - Modern frontend build pipelines: Code splitting, dead code elimination, dynamic `import()`, bundle size analysis, and asset cache-busting.
  - Client-side routing single-page app (SPA) fallback: Configuring HTTP 200 rewrites (`/* -> /index.html`) on static servers (Nginx, Vercel, Netlify) so that deep URLs like `/courses/course-13` do not return 404 Not Found errors on page refresh.
  - HTTP Caching Headers: Long-term immutable caching (`Cache-Control: public, max-age=31536000, immutable`) for hashed assets versus zero-cache revalidation (`Cache-Control: no-cache`) for `index.html`.
- **Hands-on Exercise:** Configuring a production `vercel.json` and static rewrite rules enforcing clean URL routing and asset caching.

### Lesson 2: Environment Variables, Secrets & Cloud Configuration (`environment-secrets-and-cloud-config`)
- **Core Topics:**
  - Public Client Variables vs. Private Backend Secrets:
    - *Client Variables:* Embedded at build time into client JavaScript bundle (`VITE_API_URL`, `VITE_PUBLIC_ANALYTICS_ID`). Exposed to anyone viewing page source in browser DevTools.
    - *Backend Secrets:* Loaded at server runtime into memory (`process.env.MONGODB_URI`, `JWT_SECRET`, `STRIPE_SECRET_KEY`). Never transmitted to the client.
  - Secrets Hygiene: Adding `.env*` to `.gitignore`, creating documented `.env.example` templates, avoiding accidental Git history leaks, and rotating compromised keys.
  - Platform Environment Configuration: Setting environment variables in cloud dashboards (Vercel, Render, Railway, GitHub Actions).
  - Cross-Origin Resource Sharing (CORS): The browser Same-Origin Policy (SOP), CORS preflight `OPTIONS` requests, `Access-Control-Allow-Origin`, whitelisting specific origins, and the critical security rule: never combine `Access-Control-Allow-Origin: *` with `credentials: true`.
- **Interactive Exercise:** Authoring a client-side environment resolver function `getApiBaseUrl()` that detects production environments safely with graceful localhost fallbacks.

### Lesson 3: Cloud Hosting Architectures: Static, APIs & Databases (`hosting-static-apis-and-databases`)
- **Core Topics:**
  - Multi-tier decoupled cloud topology:
    - **Tier 1 (Frontend):** Vercel / Netlify / Cloudflare Pages. Fast edge distribution, automatic SSL, instant preview deployments.
    - **Tier 2 (Backend API):** Render / Railway / Fly.io / AWS ECS. Node.js containerized execution, auto-restarts, zero-downtime rolling deploys.
    - **Tier 3 (Database):** MongoDB Atlas / AWS RDS PostgreSQL / Supabase. Automated backups, point-in-time recovery, IP whitelisting, encrypted storage at rest.
  - Domain Names, DNS & SSL/TLS:
    - DNS record types: `A` records (IPv4 mapping), `CNAME` records (canonical domain alias), `TXT` records (domain ownership verification).
    - SSL/TLS handshakes, automatic certificate generation (Let's Encrypt), and HTTP-to-HTTPS redirect enforcement.
  - Provider-agnostic deployment principles: Dockerfiles, health check endpoints, environment variable contracts, and CI/CD pipelines.
- **Hands-on Exercise:** Writing a complete Express production `/health` endpoint validating MongoDB connectivity status, uptime, and memory consumption.

### Lesson 4: Production Monitoring, Reliability & Incident Response (`production-monitoring-and-reliability`)
- **Core Topics:**
  - Observability triad: Metrics (system health, request rates, error rates), Logs (structured JSON event logs), Traces (request propagation timing).
  - Health checks & automated healing: Liveness probes (is process alive?) vs Readiness probes (is process ready to accept traffic?).
  - Automated alerting and uptime monitors: Configuring Pingdom, Better Uptime, or UptimeRobot to ping `/health` every 60 seconds.
  - The Rollback Protocol: Triggering one-click rollbacks to previous immutable build snapshots when new deployments introduce critical regressions.
  - Site Reliability Engineering (SRE) Incident Management:
    1. Acknowledge and assess severity.
    2. Mitigate immediately (rollback or scale).
    3. Communicate status to stakeholders.
    4. Investigate root cause with logs.
    5. Fix with regression test.
    6. Conduct blameless post-mortem.
- **Capstone Exercise:** Writing a production Incident Response Runbook covering triage, rollback mitigation, communication, and post-mortems.

---

## 3. Production Deployment Architecture Diagram

```
+-------------------------------------------------------------+
|                     CLIENT BROWSER                          |
+-------------------------------------------------------------+
       |                                              |
       | 1. HTTPS / Assets Request                    | 3. REST API / Auth
       v                                              v
+-------------------------------+       +-----------------------------+
|    VERCEL / NETLIFY / CDN     |       |    RENDER / RAILWAY API     |
|  - Edge Distributed Cache     |       |  - Node.js Express Server   |
|  - SPA Rewrites (/* -> index) |       |  - CORS Whitelist Check     |
|  - Immutable Hashed Bundles   |       |  - JWT Cookie Verification  |
+-------------------------------+       +-----------------------------+
                                                       |
                                                       | 4. TLS DB Connection
                                                       v
                                        +-----------------------------+
                                        |      MONGODB ATLAS / RDS    |
                                        |  - IP Whitelisted Network   |
                                        |  - Automated Hourly Backups |
                                        |  - Encrypted at Rest (AES)  |
                                        +-----------------------------+
```
