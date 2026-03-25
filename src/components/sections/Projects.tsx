"use client"
import { Section } from "@/components/ui/Section"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { buttonVariants } from "@/components/ui/Button"
import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { projects } from "@/lib/projects"

export function Projects() {
  return (
    <Section id="projects" title="Featured Projects" subtitle="A selection of my recent work and side projects.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
          >
            <Card className="h-full flex flex-col overflow-hidden group hover:shadow-xl transition-all duration-300 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <Link href={`/projects/${project.slug}`} className="flex-grow flex flex-col">
                <div className={`aspect-video w-full ${project.imageColor} relative overflow-hidden`}>
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
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
              </Link>
              
              <CardFooter className="flex justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 relative z-10">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full gap-2")}
                  onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
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
