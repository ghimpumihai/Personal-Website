"use client";

import React from "react";
import { Container } from "./Container";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-primary-900 dark:text-white font-bold text-xl" href="/">
              Portfolio
            </a>
          </div>

          <div className="md:flex md:items-center md:gap-8">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      className="text-slate-500 transition hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 font-medium"
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="rounded-full p-2 text-slate-500 transition hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 bg-slate-100 dark:bg-slate-800"
                aria-label="Toggle dark mode"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}