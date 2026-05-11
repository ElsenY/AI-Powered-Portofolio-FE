"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

const commands = [
  "ssh root@192.168.1.1",
  "sudo rm -rf /var/log/*",
  "nmap -sV localhost",
  "cat /etc/passwd",
  "chmod 777 backdoor.sh",
  "python3 exploit.py",
  "curl -X POST /api/auth",
  "docker exec -it db psql",
  "kubectl get pods -A",
  "grep -r 'password' .",
  "tar -xvf secrets.tar.gz",
  "nc -lvp 4444",
  "hashcat -m 0 hash.txt",
  "git push --force origin",
  "node server.js &",
  "systemctl restart nginx",
  "redis-cli FLUSHALL",
  "pg_dump -U admin production",
  "openssl genrsa -out key",
  "aws s3 cp s3://bucket .",
]

const targetSystems = [
  "MAINFRAME-01",
  "DATABASE-PROD",
  "AUTH-SERVER",
  "PAYMENT-GW",
  "API-GATEWAY",
  "REDIS-CACHE",
  "KUBERNETES",
  "AWS-LAMBDA",
  "FIREWALL-01",
  "VAULT-SECRET",
]

type GameState = "idle" | "playing" | "success" | "failed"

export function TerminalGame() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [currentCommand, setCurrentCommand] = useState("")
  const [userInput, setUserInput] = useState("")
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentTarget, setCurrentTarget] = useState("")
  const [logs, setLogs] = useState<string[]>([])
  const [highScore, setHighScore] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const getTimeForLevel = useCallback((lvl: number) => {
    return Math.max(3, 10 - Math.floor(lvl / 2))
  }, [])

  const startNewRound = useCallback(() => {
    const randomCommand = commands[Math.floor(Math.random() * commands.length)]
    const randomTarget = targetSystems[Math.floor(Math.random() * targetSystems.length)]
    
    setCurrentCommand(randomCommand)
    setCurrentTarget(randomTarget)
    setUserInput("")
    setTimeLeft(getTimeForLevel(level))
    setGameState("playing")
    setLogs(prev => [...prev.slice(-5), `> Initiating breach on ${randomTarget}...`])
    
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }, [level, getTimeForLevel])

  const startGame = useCallback(() => {
    setScore(0)
    setLevel(1)
    setLogs(["[SYSTEM] Terminal Hacker v2.0 initialized", "[SYSTEM] Target acquired. Begin sequence."])
    startNewRound()
  }, [startNewRound])

  const handleSuccess = useCallback(() => {
    const newScore = score + level * 10
    const newLevel = level + 1
    
    setScore(newScore)
    setLevel(newLevel)
    setLogs(prev => [...prev.slice(-5), `✓ ACCESS GRANTED - ${currentTarget} breached!`])
    setGameState("success")
    
    if (newScore > highScore) {
      setHighScore(newScore)
    }
    
    setTimeout(() => {
      startNewRound()
    }, 1000)
  }, [score, level, currentTarget, highScore, startNewRound])

  const handleFailure = useCallback(() => {
    setLogs(prev => [...prev.slice(-5), `✗ BREACH FAILED - Connection terminated`])
    setGameState("failed")
    
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return

    if (timeLeft <= 0) {
      handleFailure()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 0.1)
    }, 100)

    return () => clearInterval(timer)
  }, [gameState, timeLeft, handleFailure])

  // Check input
  useEffect(() => {
    if (gameState === "playing" && userInput === currentCommand) {
      handleSuccess()
    }
  }, [userInput, currentCommand, gameState, handleSuccess])

  const getCharClass = (index: number) => {
    if (index >= userInput.length) return "text-muted-foreground"
    return userInput[index] === currentCommand[index] 
      ? "text-green-400" 
      : "text-red-400"
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
          <span className="ml-4 text-xs text-muted-foreground font-mono">terminal-hacker</span>
        </div>
        <div className="flex items-center gap-6 text-xs font-mono">
          <span className="text-muted-foreground">
            Score: <span className="text-primary">{score}</span>
          </span>
          <span className="text-muted-foreground">
            Level: <span className="text-primary">{level}</span>
          </span>
          <span className="text-muted-foreground">
            Best: <span className="text-primary">{highScore}</span>
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm min-h-[400px] flex flex-col">
        {/* Logs */}
        <div className="flex-1 space-y-1 mb-6">
          {logs.map((log, i) => (
            <div 
              key={i} 
              className={cn(
                "text-xs",
                log.startsWith("✓") && "text-green-400",
                log.startsWith("✗") && "text-red-400",
                log.startsWith("[SYSTEM]") && "text-muted-foreground",
                log.startsWith(">") && "text-primary"
              )}
            >
              {log}
            </div>
          ))}
        </div>

        {gameState === "idle" && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-6">
              Ready to test your typing skills?<br />
              Type commands as fast as you can to hack into systems.
            </p>
            <button
              onClick={startGame}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Hack
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState === "success") && (
          <div className="space-y-4">
            {/* Target info */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Target: <span className="text-foreground">{currentTarget}</span>
              </span>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Time:</span>
                <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-100",
                      timeLeft > 3 ? "bg-primary" : "bg-red-500"
                    )}
                    style={{ width: `${(timeLeft / getTimeForLevel(level)) * 100}%` }}
                  />
                </div>
                <span className={cn(
                  "w-8",
                  timeLeft > 3 ? "text-muted-foreground" : "text-red-400"
                )}>
                  {timeLeft.toFixed(1)}s
                </span>
              </div>
            </div>

            {/* Command to type */}
            <div className="bg-secondary/30 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-2">Type this command:</p>
              <div className="text-lg tracking-wide">
                {currentCommand.split("").map((char, i) => (
                  <span key={i} className={getCharClass(i)}>
                    {char}
                  </span>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">$</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-lg pl-8 pr-4 py-3 font-mono focus:outline-none focus:border-primary transition-colors"
                placeholder="Start typing..."
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                disabled={gameState !== "playing"}
              />
            </div>
          </div>
        )}

        {gameState === "failed" && (
          <div className="text-center py-8">
            <p className="text-red-400 text-lg mb-2">Connection Lost!</p>
            <p className="text-muted-foreground mb-6">
              Final Score: <span className="text-primary font-bold">{score}</span>
              {" · "}
              Level Reached: <span className="text-primary font-bold">{level}</span>
            </p>
            <button
              onClick={startGame}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
