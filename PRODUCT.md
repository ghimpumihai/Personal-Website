# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Engineering recruiters, hiring managers, and senior software engineers evaluating Ștefan Ghimpu for backend, systems, and cloud software engineering roles. They scan quickly for production experience, architectural rigor, verifiable code repositories, and technical communication clarity.

## Product Purpose

Personal engineering portfolio and technical blog for Ștefan Ghimpu (Working Student at Bosch, Computer Science student at Babeș-Bolyai University). It presents his professional timeline, technical toolkit, architectural case studies of featured projects, and long-form engineering articles to earn interviews and engineering opportunities.

## Positioning

Combines hands-on enterprise and scientific engineering experience (Rust and Svelte internal tooling at Bosch, Java 17+ and Quarkus enterprise APIs at BMW TechWorks, Django and Google Earth Engine satellite imagery pipelines at ROSPIN) with shipped systems projects spanning distributed microservices, computer vision hardware/software integration, real-time WebSocket multiplayer, and uptime telemetry.

## Operating Context

Reviewed primarily on desktop and mobile web browsers during candidate screening, technical interview preparation, and peer review of blog articles or GitHub repositories.

## Stack

SvelteKit (Svelte 5 runes) + TypeScript + Tailwind CSS (rewriting from the legacy Next.js 14 codebase while preserving all routes, projects, blog functionality, and Vercel Blob/API endpoints).

## Capabilities and Constraints

- Rewritten in SvelteKit (Svelte 5) + TypeScript + Tailwind CSS.
- Public surfaces in redesign scope: Home (`/`), Blog archive (`/blog`), Blog article reader (`/blog/[slug]`), and Project detail specifications (`/projects/[slug]`).
- Existing functional infrastructure to preserve in SvelteKit: Vercel Blob-backed blog storage and fallback cache, blog content parser, and authenticated admin publishing routes (`/admin`, `/admin/uploads`, `/api/admin/blog/posts`, `/api/admin/blog/posts/[slug]`, `/api/admin/blog/images`).
- Theme support (Warm Cream default + Soft Espresso Dark mode).

## Brand Commitments

- Identity: Ștefan Ghimpu (Ghimpu Mihai-Stefan).
- User-pinned aesthetic direction: Airy Architectural Drawing / Precision Engineering Blueprints—generous open warm-cream space, subtle architectural grid hairlines, editorial serif headings paired with monospace technical labels and revision/coordinate metadata.
- User-pinned color & theme direction:
  - Default Light Mode: Warm cream drafting-paper ground paired with deep espresso/graphite ink and Oxidized Copper / Terracotta accent ink (eye-friendly, low glare).
  - Soft Dark Mode toggle: Low-glare warm charcoal/espresso dark surfaces with warm parchment text and muted terracotta/copper accents.
- Workflow commitment: Preview and approve full page designs (Home, Blog, Project Details) across Desktop (`1440px`) and Mobile (`390px`) before implementing the SvelteKit (Svelte 5) codebase.

## Evidence on Hand

- Profile portrait: `/images/profile/profile.jpg`
- Confirmed timeline entries:
  - Bosch — Working Student (July 2026 – Present): internal efficiency tools in Rust and Svelte.
  - BMW TechWorks — Software Engineer Intern (Nov 2025 – June 2026): RESTful APIs in Java 17+ and Quarkus for cloud-native enterprise systems.
  - ROSPIN Satellite Data Processing — Full-Stack Developer (Oct – Dec 2025): Django backend with Google Earth Engine and React visualization dashboards.
  - Babeș-Bolyai University — Bachelor of Computer Science (2024 – 2027): algorithms, system architecture, high-performance data structures.
- Confirmed projects (`src/lib/projects.ts`):
  - Neon Rain (`/images/projects/neon-rain.svg`, TypeScript, Vite, HTML5 Canvas, WebSocket, Node.js, Vitest)
  - HealthCheck (`/images/projects/HealthCheck.jpg`, C#, .NET 8+, Angular 17+, TypeScript, OpenAPI)
  - SeeBump (`/images/projects/seebump.png`, Python, OpenCV, Next.js, TypeScript, Supabase, ESP32, C++)
  - SkyWind (`/images/projects/skywind.png` + YouTube demo, Django, Python, React, Google Earth Engine API, Docker)
  - KickCollect (Next.js, React, TypeScript, Tailwind CSS, Radix UI, Vitest)
  - Quotation Service (Quarkus, Java, Kafka, PostgreSQL, Keycloak, Docker, Maven)
- Contact & social links: GitHub (`https://github.com/ghimpumihai`), LinkedIn (`https://www.linkedin.com/in/stefan-ghimpu-8a6532332/`), Email (`mailto:stefanghimpu2005@yahoo.com`).
- Absence constraint: Do not fabricate metrics, testimonials, or unconfirmed employment/project claims.

## Product Principles

1. **Verifiable engineering substance:** Foreground real systems, stack architecture, and direct links to source code and demos over generic self-promotion.
2. **Schematic scanability:** Structure timeline, skills, and project specifications with tabular clarity so a hiring manager can parse technical depth in seconds.
3. **Unified specification language:** Treat the landing page, project case studies, and technical blog as chapters of one cohesive engineering manual.
