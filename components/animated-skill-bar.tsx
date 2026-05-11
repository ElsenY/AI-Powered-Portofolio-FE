"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedSkillBarProps {
  name: string
  level: number
  delay?: number
}

export function AnimatedSkillBar({ name, level, delay = 0 }: AnimatedSkillBarProps) {
  const [width, setWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setWidth(level), delay + 100)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [level, delay])

  return (
    <div 
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-20px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="flex justify-between mb-1">
        <span className="font-mono text-sm">{name}</span>
        <span className="text-muted-foreground text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ 
            width: `${width}%`,
            transition: "width 1s ease-out",
          }}
        />
      </div>
    </div>
  )
}
