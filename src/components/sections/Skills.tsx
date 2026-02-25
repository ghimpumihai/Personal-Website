"use client"

import { motion } from "framer-motion"
import { Section } from "@/components/ui/Section"
import { Code, Database, Wrench } from "lucide-react"

const categories = [
  {
    title: "Frontend",
    icon: Code,
    skills: [
      { name: "React", iconClass: "devicon-react-original colored" },
      { name: "Next.js", iconClass: "devicon-nextjs-plain dark:text-white" },
      { name: "Angular", iconClass: "devicon-angularjs-plain colored" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain colored" },
      { name: "HTML/CSS", iconClass: "devicon-html5-plain colored" },
      { name: "Tailwind CSS", iconClass: "devicon-tailwindcss-original colored" },
    ],
  },
  {
    title: "Backend & Systems",
    icon: Database,
    skills: [
      { name: "Java", iconClass: "devicon-java-plain colored" },
      { name: "C++", iconClass: "devicon-cplusplus-plain colored" },
      { name: "C#", iconClass: "devicon-csharp-plain colored" },
      { name: "Python", iconClass: "devicon-python-plain colored" },
      { name: ".NET", iconClass: "devicon-dot-net-plain colored" },
      { name: "SQL", iconClass: "devicon-azuresqldatabase-plain colored" },
      { name: "Quarkus", iconClass: "devicon-quarkus-plain colored" },
    ],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    skills: [
      { name: "Git", iconClass: "devicon-git-plain colored" },
      { name: "Docker", iconClass: "devicon-docker-plain colored" },
      { name: "Supabase", iconClass: "devicon-supabase-plain colored" },
      { name: "Swagger/OpenAPI", iconClass: "devicon-swagger-plain colored" },
      { name: "Qt", iconClass: "devicon-qt-original colored" },
      { name: "RESTful APIs", iconClass: "" },
    ],
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
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 shadow-sm">
                <category.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 transition-colors hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {skill.iconClass && <i className={`${skill.iconClass} text-lg`}></i>}
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
