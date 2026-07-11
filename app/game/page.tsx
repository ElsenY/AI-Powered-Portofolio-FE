import Link from "next/link"
import { ArrowRight, Shield, Terminal } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

const games = [
  {
    title: "Blockade",
    description:
      "Move your firewall, intercept incoming packets, and defend the network for as long as you can.",
    href: "/game/blockade",
    category: "Arcade · Reflex",
    details: "10 integrity",
    icon: Shield,
  },
  {
    title: "Terminal Hacker",
    description:
      "Race against the clock and type terminal commands accurately to breach each target system.",
    href: "/game/terminal-hacker",
    category: "Typing · Speed",
    details: "20 commands",
    icon: Terminal,
  },
]

export default function GamesPage() {
  return (
    <div className="px-6 pb-20 pt-24">
      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mb-12 text-center">
          <p className="mb-4 font-mono text-sm uppercase tracking-wider text-primary">
            Take a break
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">Game Lab</h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Pick a challenge, sharpen your reflexes, and see how far you can go.
          </p>
        </AnimatedSection>

        <section aria-labelledby="available-games-heading">
          <AnimatedSection delay={150}>
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="mb-1 font-mono text-xs uppercase tracking-wider text-primary">
                  Select a program
                </p>
                <h2 id="available-games-heading" className="text-2xl font-semibold">
                  Available games
                </h2>
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {games.length} {games.length === 1 ? "game" : "games"}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {games.map((game, index) => {
              const Icon = game.icon

              return (
                <AnimatedSection key={game.href} delay={250 + index * 100} className="h-full">
                  <Link
                    href={game.href}
                    className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <div className="mb-8 flex items-start justify-between gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
                        {game.category}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="mb-3 text-xl font-semibold transition-colors group-hover:text-primary">
                        {game.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">{game.description}</p>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border pt-4">
                      <span className="font-mono text-xs text-muted-foreground">{game.details}</span>
                      <span className="flex items-center gap-2 text-sm font-medium text-primary">
                        Play now
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
