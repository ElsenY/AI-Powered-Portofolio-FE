import { TerminalGame } from "@/components/terminal-game"
import { AnimatedSection } from "@/components/animated-section"

export default function GamePage() {
  const instructions = [
    { step: "1", title: "Start the game", description: 'Click "Start Hack" to begin the sequence' },
    { step: "2", title: "Type the commands", description: "Type each command exactly as shown before time runs out" },
    { step: "3", title: "Beat your score", description: "Complete more hacks to increase your score and level" },
  ]

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <AnimatedSection className="mb-8 text-center">
          <p className="text-primary font-mono text-sm tracking-wider uppercase mb-4">
            Take a break
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terminal Hacker
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A fun typing game where you &quot;hack&quot; into systems by typing commands 
            as fast as you can. How many servers can you breach?
          </p>
        </AnimatedSection>

        {/* Game Component */}
        <AnimatedSection delay={200}>
          <TerminalGame />
        </AnimatedSection>

        {/* Instructions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {instructions.map((item, index) => (
            <AnimatedSection
              key={item.step}
              delay={400 + index * 100}
              className="bg-card border border-border rounded-xl p-5 text-center"
            >
              <p className="font-mono text-primary text-2xl mb-2">{item.step}</p>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  )
}
