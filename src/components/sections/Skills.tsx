"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/Section"
import { Code, Database, Wrench } from "lucide-react"

const categories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["C/C++", "Python", "Java", "C#", "TypeScript", "HTML/CSS", "SQL"],
  },
  {
    title: "Frameworks & Tools",
    icon: Database,
    skills: ["Quarkus", ".NET", "Angular", "Git", "Qt", "React", "Next.js"],
  },
  {
    title: "Other Skills",
    icon: Wrench,
    skills: ["RESTful APIs", "Swagger/OpenAPI", "RxJS", "SCSS", "Docker", "Google Earth Engine", "Supabase"],
  },
]

export function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="My technical toolkit">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                <category.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm font-medium rounded-full bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
