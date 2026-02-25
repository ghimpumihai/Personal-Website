"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

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
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-lg font-medium text-primary-600 dark:text-primary-400"
            >
              Hi, my name is
            </motion.span>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl">
              Ghimpu Mihai-Stefan
            </h1>
            
            <h2 className="text-3xl font-bold tracking-tight text-slate-500 dark:text-slate-400 sm:text-4xl md:text-5xl">
              Computer Science Student & Developer.
            </h2>
          </div>

          <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400 md:text-xl leading-relaxed">
            I&apos;m a Computer Science student at Babes-Bolyai University building high-performance, scalable software. Currently interning at BMW TechWorks, I specialize in full-stack engineering, cloud-native ecosystems, and IoT solutions.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="#projects">
              <Button size="lg" className="px-8 text-base">
                View Projects
              </Button>
            </Link>
            <a href="mailto:stefanghimpu2005@yahoo.com">
              <Button variant="outline" size="lg" className="px-8 text-base">
                Contact Me
              </Button>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="flex justify-center md:w-2/5 md:justify-end"
        >
          <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-1 shadow-2xl md:h-80 md:w-80">
            <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-100 dark:bg-slate-900">
              <img src="/images/profile/profile.jpg" alt="Profile Picture" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}