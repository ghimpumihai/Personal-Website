export type Project = {
  slug: string
  title: string
  description: string
  longDescription: string
  image: string
  imageColor: string
  tags: string[]
  githubUrl: string
  demoUrl?: string
}

export const projects: Project[] = [
  {
    slug: "healthcheck",
    title: "HealthCheck",
    description: "Solves delayed outage detection by continuously monitoring website uptime, HTTP status, and response metrics. Provides real-time analytics to ensure high availability for web services.",
    longDescription: "HealthCheck is a comprehensive uptime monitoring solution built with C# and .NET 8+. It continuously tracks website availability, HTTP status codes, and response metrics in real-time. The platform provides detailed analytics dashboards using Angular 17+ to help teams identify and respond to outages before they impact users.",
    image: "/images/projects/HealthCheck.jpg",
    imageColor: "bg-green-500",
    tags: ["C#", ".NET 8+", "Angular 17+", "TypeScript", "Swagger/OpenAPI"],
    githubUrl: "https://github.com/ghimpumihai/HealthCheck",
  },
  {
    slug: "seebump",
    title: "SeeBump",
    description: "Addresses aggressive driving using computer vision to monitor vehicle speed and adjust smart speed bumps dynamically. Built at Polihack 2025 to reward law-abiding drivers while calming traffic.",
    longDescription: "SeeBump is an innovative smart traffic control system that uses computer vision and machine learning to detect vehicle speeds in real-time. Built at Polihack 2025, it dynamically adjusts smart speed bumps to encourage safe driving while rewarding compliant drivers. The system combines Python and OpenCV for real-time processing with a Next.js dashboard for traffic management.",
    image: "/images/projects/seebump.png",
    imageColor: "bg-orange-500",
    tags: ["Python", "OpenCV", "Next.js", "TypeScript", "Supabase", "ESP32", "C++"],
    githubUrl: "https://github.com/ghimpumihai/PoliHack2025",
  },
  {
    slug: "skywind",
    title: "SkyWind",
    description: "Identifies optimal wind farm locations by computing turbine efficiency metrics using satellite imagery. Analyzes environmental data via Google Earth Engine to guide renewable energy planning.",
    longDescription: "SkyWind leverages satellite imagery and the Google Earth Engine API to identify ideal locations for wind farms. The platform analyzes environmental data and computes turbine efficiency metrics to support renewable energy planning. Built with Django and React, it provides an interactive interface for visualizing optimal wind farm sites globally.",
    image: "/images/projects/skywind.png",
    imageColor: "bg-blue-600",
    tags: ["Django", "Python", "React", "Google Earth Engine API", "Docker"],
    githubUrl: "https://github.com/bbeatricecretu/RoSpin",
    demoUrl: "https://www.youtube.com/watch?v=GKJL2bXBgK8&t=5s",
  },
  {
    slug: "kickcollect",
    title: "KickCollect",
    description:
      "KickCollect is a Next.js/React web app for tracking a digital football trading-card collection, with client-side CRUD, filtering/search, and card detail/edit flows.",
    longDescription:
      "KickCollect is a gamified football card collection platform built with Next.js and React. Users can open packs, browse and manage their card inventory, edit card details, and monitor collection progress through dashboard views. The app uses a modern TypeScript frontend stack with Tailwind/Radix-based UI patterns and test tooling for component and app-level reliability.",
    image: "",
    imageColor: "bg-emerald-500",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Vitest"],
    githubUrl: "https://github.com/ghimpumihai/KickCollect",
  },
  {
    slug: "quotation-service",
    title: "Quotation Service",
    description:
      "An event-driven microservices backend built with Quarkus that orchestrates proposal management, USD→BRL quotation monitoring, and opportunity reporting via REST APIs, Kafka events, PostgreSQL, and Keycloak-secured endpoints.",
    longDescription:
      "Quotation Service is a multi-module backend composed of gateway, proposal, quotation, and report services. It combines synchronous REST orchestration with asynchronous Kafka messaging to process proposals, poll external currency data, detect quotation high-water marks, and generate report-ready opportunity records. The platform runs on Java/Quarkus with PostgreSQL persistence, Maven build workflows, and OIDC authentication via Keycloak.",
    image: "",
    imageColor: "bg-indigo-600",
    tags: ["Quarkus", "Java", "Kafka", "PostgreSQL", "Keycloak", "Docker", "Maven"],
    githubUrl: "https://github.com/ghimpumihai/Quarkus-Quotation-Service",
  },
]
