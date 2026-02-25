import * as React from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/layout/Container"

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  title?: string;
  subtitle?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  title,
  subtitle,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32", className)} {...props}>
      <Container className={cn("flex flex-col gap-8", containerClassName)}>
        {(title || subtitle) && (
          <div className="flex flex-col gap-4 max-w-3xl">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-slate-600 dark:text-slate-400">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}