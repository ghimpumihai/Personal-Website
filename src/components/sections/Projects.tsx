"use client"

import * as React from "react"
import { Section } from "@/components/ui/Section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "HealthCheck",
    description: "Full-stack website uptime monitoring application with real-time site availability checks, HTTP status tracking, and response time metrics.",
    image: "/images/projects/HealthCheck.jpg",
    imageColor: "bg-green-500",
    tags: ["C#", ".NET 8+", "Angular 17+", "TypeScript", "RxJS", "Swagger/OpenAPI"],
    githubUrl: "https://github.com/ghimpumihai/HealthCheck",
  },
  {
    title: "SeeBump",
    description: "Adaptive traffic calming system using computer vision to detect vehicle speed and automatically flatten bumps for law-abiding drivers. Built at Polihack 2025.",
    image: "/images/projects/seebump.png",
    imageColor: "bg-orange-500",
    tags: ["Python", "OpenCV", "Next.js", "TypeScript", "Supabase", "ESP32", "C++"],
    githubUrl: "https://github.com/ghimpumihai/PoliHack2025",
  },
  {
    title: "Skywind",
    description: "Django backend processing satellite imagery from Google Earth Engine API to compute wind turbine efficiency metrics for specific zones.",
    image: "/images/projects/skywind.png",
    imageColor: "bg-blue-600",
    tags: ["Django", "Python", "React", "Google Earth Engine API", "Docker"],
    githubUrl: "https://github.com/bbeatricecretu/RoSpin",
    demoUrl: "https://www.youtube.com/watch?v=GKJL2bXBgK8&t=5s"
  }
]

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="A selection of my recent work and side projects.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300 dark:bg-slate-900/50">
              <div className={`h-48 w-full ${project.imageColor} relative overflow-hidden`}>
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback to color if image fails to load
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center text-white/50 text-4xl font-bold opacity-20 select-none pointer-events-none">
                  {project.title.substring(0, 2)}
                </div>
              </div>
              
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-md font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-2")}
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
                {project.demoUrl && (
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-2")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
