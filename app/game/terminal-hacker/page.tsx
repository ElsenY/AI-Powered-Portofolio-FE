import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { TerminalGame } from "@/components/terminal-game"
import { AnimatedSection } from "@/components/animated-section"

export default function TerminalHackerPage() {
  const instructions = [
    { step: "1", title: "Start the game", description: 'Click "Start Hack" to begin the sequence' },
    { step: "2", title: "Type the commands", description: "Type each command exactly as shown before time runs out" },
    { step: "3", title: "Beat your score", description: "Complete more hacks to increase your score and level" },
  ]

  return (
    <div className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mb-8">
          <Link
            href="/game"
            className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All games
          </Link>

          <div className="text-center">
            <p className="mb-4 font-mono text-sm uppercase tracking-wider text-primary">
              Take a break
            </p>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Terminal Hacker</h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              A fun typing game where you &quot;hack&quot; into systems by typing commands as fast as you can. How many
              servers can you breach?
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <TerminalGame />
        </AnimatedSection>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {instructions.map((item, index) => (
            <AnimatedSection
              key={item.step}
              delay={400 + index * 100}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <p className="mb-2 font-mono text-2xl text-primary">{item.step}</p>
              <h3 className="mb-2 font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
