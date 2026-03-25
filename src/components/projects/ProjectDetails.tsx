"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Github, Globe } from "lucide-react";
import type { Project } from "@/lib/projects";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
interface ProjectDetailsProps {
  project: Project;
}

export function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 mb-8 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {project.demoUrl ? (
            <div className="mb-4">
              <VideoPlayer url={project.demoUrl} />
            </div>
          ) : (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800 shadow-2xl ring-1 ring-slate-900/5 dark:ring-slate-50/10">
              <div className={cn("absolute inset-0 opacity-10", project.imageColor)} />
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <p className="text-lg font-semibold text-slate-500 dark:text-slate-400">No preview image for this project</p>
                </div>
              )}
            </div>
          )}

          <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:gap-16">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="prose prose-slate dark:prose-invert max-w-none">
                <p className="text-lg text-slate-700 dark:text-slate-300 leading-loose">
                  {project.longDescription}
                </p>
              </div>
            </div>

            <div className="space-y-8 lg:border-l lg:border-slate-200 lg:dark:border-slate-800 lg:pl-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Links
                </h3>
                <div className="flex flex-col gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
                    >
                      <Github className="h-5 w-5" />
                      <span>View Source Code</span>
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
