"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "fade"
  rootMargin?: string
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  rootMargin = "100px",
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  const getTransform = () => {
    switch (direction) {
      case "up": return "translateY(40px)"
      case "down": return "translateY(-40px)"
      case "left": return "translateX(40px)"
      case "right": return "translateX(-40px)"
      case "fade": return "translateY(0)"
      default: return "translateY(40px)"
    }
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0)" : getTransform(),
        transition: `opacity 0.4s ease-out, transform 0.4s ease-out`,
      }}
    >
      {children}
    </div>
  )
}
