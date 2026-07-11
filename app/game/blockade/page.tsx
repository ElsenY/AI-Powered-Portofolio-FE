import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import { BlockadeGame } from "@/components/blockade-game"

const instructions = [
  {
    step: "1",
    title: "Start defense",
    description: "Select Start Defense to begin with ten integrity points.",
  },
  {
    step: "2",
    title: "Move the firewall",
    description: "Use your mouse or finger to intercept packets arriving from the right.",
  },
  {
    step: "3",
    title: "Survive the traffic",
    description: "Every block adds one point; every missed packet costs one integrity point.",
  },
]

export default function BlockadePage() {
  return (
    <div className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mb-8">
          <Link
            href="/game"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All games
          </Link>

          <div className="text-center">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-primary">Take a break</p>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Blockade</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Defend the left edge by intercepting incoming packets. Move the firewall with your pointer and survive
              as long as you can.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <BlockadeGame />
        </AnimatedSection>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instructions.map((item, index) => (
            <AnimatedSection
              key={item.step}
              delay={400 + index * 100}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <p className="mb-2 font-mono text-2xl text-primary">{item.step}</p>
              <h2 className="mb-2 font-semibold">{item.title}</h2>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
