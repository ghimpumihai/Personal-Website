export type Project = {
	slug: string;
	plateCode: string;
	domain: string;
	title: string;
	description: string;
	longDescription: string;
	image: string;
	imageColor: string;
	tags: string[];
	githubUrl: string;
	demoUrl?: string;
};

export const projects: Project[] = [
	{
		slug: 'neon-rain',
		plateCode: 'FIG 01',
		domain: 'Real-Time Multiplayer',
		title: 'Neon Rain',
		description:
			'A fast-paced 2D neon arena game focused on competitive PvP, with local or room-based online matches, responsive controls, and polished visual effects.',
		longDescription:
			'Neon Rain is a TypeScript game built with Vite and rendered on HTML5 Canvas. It combines local head-to-head gameplay with online multiplayer using a custom WebSocket protocol, room codes, ready states, and host/client state synchronization. The gameplay loop includes dashing, bombs, projectiles, powerups, particle effects, and mobile-friendly controls, while a Node.js server handles matchmaking and real-time message forwarding.',
		image: '/images/projects/neon-rain.svg',
		imageColor: 'bg-cyan-500',
		tags: ['TypeScript', 'Vite', 'HTML5 Canvas', 'WebSocket', 'Node.js', 'Vitest'],
		githubUrl: 'https://github.com/ghimpumihai/Neon-Rain'
	},
	{
		slug: 'jobscanr',
		plateCode: 'FIG 02',
		domain: 'Automated Job Radar & Pipeline',
		title: 'JobScanr',
		description:
			'Automated job radar that scans 3,600+ European tech company career boards daily across 7 ATS platforms, filtering for early-career software roles and delivering a zero-cost daily email digest.',
		longDescription:
			'JobScanr is a zero-cost automated job discovery and self-healing triage pipeline running on Python 3.12, GitHub Actions, and Supabase (PostgreSQL). Every day at 06:00 UTC it scrapes 50,000+ live postings across Greenhouse, Ashby, Lever, Workday, SmartRecruiters, and Teamtailor, enriches missing job descriptions, and applies strict multi-stage filters for internship, junior, and graduate software engineering roles across Europe. It also includes an AI-assisted link repair pipeline powered by Groq LLM and DuckDuckGo search that automatically repairs broken ATS feeds via isolated Pull Requests.',
		image: '',
		imageColor: 'bg-amber-600',
		tags: ['Python', 'PostgreSQL', 'Supabase', 'GitHub Actions', 'Groq LLM', 'REST & GraphQL'],
		githubUrl: 'https://github.com/ghimpumihai/JobScanr'
	},
	{
		slug: 'seebump',
		plateCode: 'FIG 03',
		domain: 'Computer Vision & IoT',
		title: 'SeeBump',
		description:
			'Addresses aggressive driving using computer vision to monitor vehicle speed and adjust smart speed bumps dynamically. Built at Polihack 2025 to reward law-abiding drivers while calming traffic.',
		longDescription:
			'SeeBump is an innovative smart traffic control system that uses computer vision and machine learning to detect vehicle speeds in real-time. Built at Polihack 2025, it dynamically adjusts smart speed bumps to encourage safe driving while rewarding compliant drivers. The system combines Python and OpenCV for real-time processing with a Next.js dashboard for traffic management.',
		image: '/images/projects/seebump.png',
		imageColor: 'bg-orange-500',
		tags: ['Python', 'OpenCV', 'Next.js', 'TypeScript', 'Supabase', 'ESP32', 'C++'],
		githubUrl: 'https://github.com/ghimpumihai/PoliHack2025'
	},
	{
		slug: 'skywind',
		plateCode: 'FIG 04',
		domain: 'Satellite Geospatial Analytics',
		title: 'SkyWind',
		description:
			'Identifies optimal wind farm locations by computing turbine efficiency metrics using satellite imagery. Analyzes environmental data via Google Earth Engine to guide renewable energy planning.',
		longDescription:
			'SkyWind leverages satellite imagery and the Google Earth Engine API to identify ideal locations for wind farms. The platform analyzes environmental data and computes turbine efficiency metrics to support renewable energy planning. Built with Django and React, it provides an interactive interface for visualizing optimal wind farm sites globally.',
		image: '/images/projects/skywind.png',
		imageColor: 'bg-blue-600',
		tags: ['Django', 'Python', 'React', 'Google Earth Engine API', 'Docker'],
		githubUrl: 'https://github.com/bbeatricecretu/RoSpin',
		demoUrl: 'https://www.youtube.com/watch?v=GKJL2bXBgK8&t=5s'
	},
	{
		slug: 'kickcollect',
		plateCode: 'FIG 05',
		domain: 'Full-Stack Web Platform',
		title: 'KickCollect',
		description:
			'KickCollect is a Next.js/React web app for tracking a digital football trading-card collection, with client-side CRUD, filtering/search, and card detail/edit flows.',
		longDescription:
			'KickCollect is a gamified football card collection platform built with Next.js and React. Users can open packs, browse and manage their card inventory, edit card details, and monitor collection progress through dashboard views. The app uses a modern TypeScript frontend stack with Tailwind/Radix-based UI patterns and test tooling for component and app-level reliability.',
		image: '',
		imageColor: 'bg-emerald-500',
		tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Radix UI', 'Vitest'],
		githubUrl: 'https://github.com/ghimpumihai/KickCollect'
	},
	{
		slug: 'quotation-service',
		plateCode: 'FIG 06',
		domain: 'Event-Driven Microservices',
		title: 'Quotation Service',
		description:
			'An event-driven microservices backend built with Quarkus that orchestrates proposal management, USD→BRL quotation monitoring, and opportunity reporting via REST APIs, Kafka events, PostgreSQL, and Keycloak-secured endpoints.',
		longDescription:
			'Quotation Service is a multi-module backend composed of gateway, proposal, quotation, and report services. It combines synchronous REST orchestration with asynchronous Kafka messaging to process proposals, poll external currency data, detect quotation high-water marks, and generate report-ready opportunity records. The platform runs on Java/Quarkus with PostgreSQL persistence, Maven build workflows, and OIDC authentication via Keycloak.',
		image: '',
		imageColor: 'bg-indigo-600',
		tags: ['Quarkus', 'Java', 'Kafka', 'PostgreSQL', 'Keycloak', 'Docker', 'Maven'],
		githubUrl: 'https://github.com/ghimpumihai/Quarkus-Quotation-Service'
	}
];
