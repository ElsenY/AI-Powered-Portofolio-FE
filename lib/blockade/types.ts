export type GamePhase = "idle" | "playing" | "paused" | "game-over"

export type Direction = 1 | 2

export type Ball = {
  id: string
  x: number
  y: number
  direction: Direction
}

export type Paddle = {
  x: number
  y: number
}

export type LocalEffect = {
  id: string
  kind: "block" | "miss"
  x: number
  y: number
  startedAt: number
  duration: number
}

export type EngineState = {
  paddle: Paddle
  balls: Map<string, Ball>
  effects: LocalEffect[]
  score: number
  lives: number
  multiplier: number
}

export type PlayfieldSize = {
  width: number
  height: number
}

export type StepResult = {
  scoreChanged: boolean
  livesChanged: boolean
  gameOver: boolean
}
