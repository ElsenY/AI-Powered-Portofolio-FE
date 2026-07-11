"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react"
import { Pause, Play, RotateCcw, Shield } from "lucide-react"
import { INITIAL_LIVES, PADDLE_HEIGHT, PADDLE_WIDTH, SPAWN_INTERVAL_MS } from "@/lib/blockade/constants"
import { createInitialState, movePaddle, spawnWave, stepEngine } from "@/lib/blockade/engine"
import { drawScene } from "@/lib/blockade/renderer"
import type { EngineState, GamePhase, PlayfieldSize } from "@/lib/blockade/types"
import { cn } from "@/lib/utils"

const DEFAULT_SIZE: PlayfieldSize = { width: 820, height: 540 }

export function BlockadeGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const playfieldRef = useRef<HTMLDivElement | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const spawnIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const sizeRef = useRef<PlayfieldSize>(DEFAULT_SIZE)
  const engineRef = useRef<EngineState>(createInitialState(DEFAULT_SIZE))
  const phaseRef = useRef<GamePhase>("idle")
  const reducedMotionRef = useRef(false)

  const [phase, setPhase] = useState<GamePhase>("idle")
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(INITIAL_LIVES)

  const setGamePhase = useCallback((nextPhase: GamePhase) => {
    phaseRef.current = nextPhase
    setPhase(nextPhase)
  }, [])

  const stopLoops = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (spawnIntervalRef.current !== null) {
      clearInterval(spawnIntervalRef.current)
      spawnIntervalRef.current = null
    }
  }, [])

  const renderCurrentScene = useCallback((timestamp = performance.now()) => {
    const context = canvasRef.current?.getContext("2d")
    if (!context) return

    drawScene(context, engineRef.current, sizeRef.current, timestamp)
  }, [])

  const startLoops = useCallback(() => {
    stopLoops()

    const frame = (timestamp: number) => {
      if (phaseRef.current !== "playing") return

      const engine = engineRef.current
      const result = stepEngine(engine, sizeRef.current, timestamp)

      if (reducedMotionRef.current) {
        engine.effects = []
      }

      renderCurrentScene(timestamp)

      if (result.scoreChanged) setScore(engine.score)
      if (result.livesChanged) setLives(Math.max(0, engine.lives))

      if (result.gameOver) {
        if (spawnIntervalRef.current !== null) {
          clearInterval(spawnIntervalRef.current)
          spawnIntervalRef.current = null
        }

        animationFrameRef.current = null
        setGamePhase("game-over")
        return
      }

      animationFrameRef.current = requestAnimationFrame(frame)
    }

    animationFrameRef.current = requestAnimationFrame(frame)
    spawnIntervalRef.current = setInterval(() => {
      if (phaseRef.current === "playing") {
        spawnWave(engineRef.current, sizeRef.current)
      }
    }, SPAWN_INTERVAL_MS)
  }, [renderCurrentScene, setGamePhase, stopLoops])

  const startGame = useCallback(() => {
    stopLoops()
    engineRef.current = createInitialState(sizeRef.current)
    setScore(0)
    setLives(INITIAL_LIVES)
    setGamePhase("playing")
    renderCurrentScene()
    startLoops()
  }, [renderCurrentScene, setGamePhase, startLoops, stopLoops])

  const pauseGame = useCallback(() => {
    if (phaseRef.current !== "playing") return

    stopLoops()
    setGamePhase("paused")
    renderCurrentScene()
  }, [renderCurrentScene, setGamePhase, stopLoops])

  const resumeGame = useCallback(() => {
    if (phaseRef.current !== "paused") return

    setGamePhase("playing")
    startLoops()
  }, [setGamePhase, startLoops])

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (phaseRef.current !== "playing") return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    movePaddle(engineRef.current, event.clientX - rect.left, event.clientY - rect.top, sizeRef.current)
  }, [])

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const playfield = playfieldRef.current
    const canvas = canvasRef.current
    if (!playfield || !canvas) return

    const resizeCanvas = () => {
      const rect = playfield.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      const context = canvas.getContext("2d")

      sizeRef.current = { width, height }
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context?.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

      const engine = engineRef.current
      engine.paddle.x = Math.max(0, Math.min(engine.paddle.x, width - PADDLE_WIDTH))
      engine.paddle.y = Math.max(0, Math.min(engine.paddle.y, height - PADDLE_HEIGHT))
      renderCurrentScene()
    }

    const resizeObserver = new ResizeObserver(resizeCanvas)
    resizeObserver.observe(playfield)
    resizeCanvas()

    return () => resizeObserver.disconnect()
  }, [renderCurrentScene])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && phaseRef.current === "playing") {
        pauseGame()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [pauseGame])

  useEffect(() => {
    return () => {
      stopLoops()
      engineRef.current.balls.clear()
      engineRef.current.effects = []
    }
  }, [stopLoops])

  const phaseLabel = {
    idle: "STANDBY",
    playing: "DEFENDING",
    paused: "PAUSED",
    "game-over": "BREACHED",
  }[phase]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-secondary/50 px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex gap-2" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-2 truncate font-mono text-xs text-muted-foreground sm:ml-4">
            blockade-defense
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs sm:gap-6">
          <span className="text-muted-foreground">
            Blocked: <span className="text-primary">{score}</span>
          </span>
          <span className="text-muted-foreground">
            Integrity: <span className={cn(lives <= 3 ? "text-red-400" : "text-primary")}>{lives}</span>
          </span>
        </div>
      </div>

      <div
        ref={playfieldRef}
        className="relative h-[clamp(420px,65vh,640px)] overflow-hidden bg-[#111827]"
      >
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          className="block h-full w-full touch-none select-none"
          aria-label="Blockade game playfield. Move your pointer to control the firewall and block incoming packets."
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/85 p-6 text-center backdrop-blur-sm">
            {phase === "idle" && (
              <div className="max-w-md">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <Shield className="h-7 w-7" aria-hidden="true" />
                </div>
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">System ready</p>
                <h2 className="mb-3 text-2xl font-semibold">Defend the network</h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Move the firewall with your pointer. Block incoming packets before they cross the left edge.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Start Defense
                </button>
              </div>
            )}

            {phase === "paused" && (
              <div className="max-w-sm">
                <Pause className="mx-auto mb-4 h-9 w-9 text-primary" aria-hidden="true" />
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">System paused</p>
                <p className="mb-6 text-muted-foreground">Your current run is frozen and ready when you are.</p>
                <button
                  type="button"
                  onClick={resumeGame}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Play className="h-4 w-4" aria-hidden="true" />
                  Resume
                </button>
              </div>
            )}

            {phase === "game-over" && (
              <div className="max-w-sm" aria-live="polite">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-red-400">System breached</p>
                <h2 className="mb-3 text-3xl font-bold">Defense offline</h2>
                <p className="mb-6 text-muted-foreground">
                  You blocked <span className="font-mono font-bold text-primary">{score}</span>{" "}
                  {score === 1 ? "packet" : "packets"} this run.
                </p>
                <button
                  type="button"
                  onClick={startGame}
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        {phase === "playing" && (
          <button
            type="button"
            onClick={pauseGame}
            className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background/80 text-muted-foreground backdrop-blur-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Pause game"
          >
            <Pause className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-secondary/30 px-4 py-3 font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
        <span>Move pointer to intercept incoming packets</span>
        <span className={cn(phase === "game-over" ? "text-red-400" : "text-primary")}>{phaseLabel}</span>
      </div>
    </div>
  )
}
