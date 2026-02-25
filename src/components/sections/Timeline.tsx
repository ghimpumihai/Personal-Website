"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Building2, Calendar, GraduationCap } from "lucide-react";

interface ExperienceItem {
  id: string;
  type: "work" | "education";
  title: string;
  companyOrSchool: string;
  period: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    type: "work",
    title: "Software Engineer Intern",
    companyOrSchool: "BMW TechWorks",
    period: "November 2024 - Present",
    description: [
      "Engineered and validated RESTful APIs using Java 17+ and Quarkus for high-performance enterprise systems.",
      "Collaborated with senior engineers to implement scalable, cloud-native solutions and refine complex business logic."
    ]
  },
  {
    id: "exp-2",
    type: "work",
    title: "Full-Stack Developer",
    companyOrSchool: "ROSPIN Satellite Data Processing",
    period: "October - December 2025",
    description: [
      "Engineered a Django backend integrating Google Earth Engine for efficient satellite imagery processing.",
      "Developed interactive React dashboards to provide real-time data visualizations and actionable insights."
    ]
  },
  {
    id: "exp-3",
    type: "education",
    title: "Bachelor of Computer Science",
    companyOrSchool: "Babes-Bolyai University",
    period: "2024 - 2027",
    description: [
      "Pursuing a comprehensive Computer Science curriculum with a focus on modern software engineering.",
      "Specializing in advanced algorithms, system architecture, and high-performance data structures."
    ]
  }
];

const getDotColor = (index: number, total: number) => {
  if (index === 0) return "bg-blue-500 dark:bg-blue-400";
  if (index === total - 1) return "bg-emerald-400 dark:bg-emerald-500";
  return "bg-teal-400 dark:bg-teal-500";
};
export function Timeline() {
  return (
    <Section id="experience" title="Experience" subtitle="My professional journey and education.">
      <div className="relative mx-auto max-w-4xl pb-12">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-emerald-400 to-transparent md:left-1/2 md:-ml-0.5 rounded-full" />

        <div className="space-y-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className={`relative flex flex-col md:flex-row ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                className={`absolute left-8 -ml-3 mt-6 flex h-6 w-6 items-center justify-center rounded-full border-4 border-white shadow-md dark:border-slate-950 md:left-1/2 md:ml-[-12px] z-10 ${getDotColor(index, experiences.length)}`}
              >
              </motion.div>

              {/* Content Spacer for Desktop */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card Content */}
              <div className="ml-20 mr-4 md:ml-0 md:mr-0 md:w-1/2 md:px-8">
                <Card className={`relative overflow-hidden border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}>
                  <div className={`absolute top-0 left-0 h-full w-1 ${experience.type === 'work' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                  <CardHeader className="pb-3 pt-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 justify-start">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          experience.type === 'work' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                        }`}>
                          {experience.type === 'work' ? 'Work' : 'Education'}
                        </span>
                        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                          <Calendar className="mr-1 h-3 w-3" />
                          {experience.period}
                        </div>
                      </div>
                      <CardTitle className="text-lg font-bold">
                        {experience.title}
                      </CardTitle>
                      {experience.companyOrSchool && (
                        <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 justify-start">
                        {experience.type === 'work' ? (
                          <Building2 className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                        ) : (
                          <GraduationCap className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                        )}
                          {experience.companyOrSchool}
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-5 text-m text-slate-600 dark:text-slate-400">
                    <ul className="space-y-1.5 marker:text-slate-300 dark:marker:text-slate-600 list-disc pl-4 text-left">
                      {experience.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
