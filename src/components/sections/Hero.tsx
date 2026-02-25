"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";


import Image from "next/image";

export function Hero() {
  return (
    <Section 
      id="hero" 
      className="flex min-h-[85vh] items-center justify-center py-20 md:py-32"
    >
      <div className="flex flex-col-reverse items-center justify-between gap-12 md:flex-row md:gap-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-6 md:w-3/5"
        >
          <div className="flex flex-col gap-2">

            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">
              Building Robust Software Systems.
            </h1>
            
            <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 md:text-xl leading-relaxed mt-4">
              I&apos;m <span className="font-semibold text-slate-900 dark:text-slate-100">Ștefan Ghimpu</span>, a Software Engineer Intern with real-world experience at BMW TechWorks, specializing in Java and Quarkus.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="flex justify-center md:w-2/5 md:justify-end"
        >
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-1 shadow-2xl md:h-80 md:w-80">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
              <Image 
                src="/images/profile/profile.jpg" 
                alt="Profile Picture" 
                fill
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}