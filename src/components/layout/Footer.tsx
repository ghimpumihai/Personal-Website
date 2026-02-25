import React from "react";
import { Container } from "./Container";
import { Github,Linkedin, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name : "GitHub", icon: Github, href: "https://github.com/ghimpumihai"},
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/stefan-ghimpu-8a6532332/" },
    { name: "Email", icon: Mail, href: "mailto:stefanghimpu2005@yahoo.com" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <Container>
        <div className="py-12 md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start gap-6 mb-6 md:mb-0">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              &copy; {currentYear} Ghimpu Mihai-Stefan. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}