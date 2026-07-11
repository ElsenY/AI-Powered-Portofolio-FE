import {
  BLOCK_EFFECT_DURATION_MS,
  BOTTOM_BUFFER,
  INITIAL_LIVES,
  LEFT_BUFFER,
  MISS_EFFECT_DURATION_MS,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  RIGHT_BUFFER,
  TOP_BUFFER,
} from "@/lib/blockade/constants"
import type {
  Ball,
  Direction,
  EngineState,
  PlayfieldSize,
  StepResult,
} from "@/lib/blockade/types"

type RandomSource = () => number
type IdSource = () => string

const defaultIdSource: IdSource = () => crypto.randomUUID()

export function randomInteger(min: number, max: number, random: RandomSource = Math.random) {
  return Math.floor(random() * (max - min + 1)) + min
}

export function createInitialState(size: PlayfieldSize): EngineState {
  return {
    paddle: {
      x: Math.max(0, Math.min(48, size.width - PADDLE_WIDTH)),
      y: Math.max(0, (size.height - PADDLE_HEIGHT) / 2),
    },
    balls: new Map(),
    effects: [],
    score: 0,
    lives: INITIAL_LIVES,
    multiplier: 1,
  }
}

export function movePaddle(engine: EngineState, x: number, y: number, size: PlayfieldSize) {
  engine.paddle.x = Math.max(0, Math.min(x - 20, size.width - PADDLE_WIDTH))
  engine.paddle.y = Math.max(0, Math.min(y - 50, size.height - PADDLE_HEIGHT))
}

export function spawnBall(
  engine: EngineState,
  size: PlayfieldSize,
  random: RandomSource = Math.random,
  createId: IdSource = defaultIdSource,
) {
  const ball: Ball = {
    id: createId(),
    x: size.width - 20,
    y: randomInteger(0, Math.max(0, Math.floor(size.height) - 1), random),
    direction: randomInteger(1, 2, random) as Direction,
  }

  engine.balls.set(ball.id, ball)
  return ball
}

export function spawnWave(
  engine: EngineState,
  size: PlayfieldSize,
  random: RandomSource = Math.random,
  createId: IdSource = defaultIdSource,
) {
  for (let i = 0; i < engine.multiplier; i += 1) {
    spawnBall(engine, size, random, createId)
  }

  engine.multiplier += 0.1
}

export function updateBall(ball: Ball, playfieldHeight: number, random: RandomSource = Math.random) {
  const deltaX = randomInteger(1, 10, random)
  const deltaY = randomInteger(1, 20, random)

  ball.x -= deltaX

  if (ball.direction === 1) ball.y += deltaY
  if (ball.direction === 2) ball.y -= deltaY

  if (ball.y <= 0) ball.direction = 1
  if (ball.y >= playfieldHeight) ball.direction = 2
}

export function isBlocked(ball: Ball, engine: EngineState) {
  const { paddle } = engine

  return (
    ball.x > paddle.x - LEFT_BUFFER &&
    ball.x < paddle.x + RIGHT_BUFFER &&
    ball.y > paddle.y - TOP_BUFFER &&
    ball.y < paddle.y + BOTTOM_BUFFER
  )
}

export function stepEngine(
  engine: EngineState,
  size: PlayfieldSize,
  timestamp: number,
  random: RandomSource = Math.random,
): StepResult {
  let scoreChanged = false
  let livesChanged = false

  for (const ball of engine.balls.values()) {
    updateBall(ball, size.height, random)

    if (ball.x < 0) {
      engine.balls.delete(ball.id)
      engine.lives -= 1
      livesChanged = true
      engine.effects.push({
        id: `miss-${ball.id}`,
        kind: "miss",
        x: 0,
        y: ball.y,
        startedAt: timestamp,
        duration: MISS_EFFECT_DURATION_MS,
      })
      continue
    }

    if (isBlocked(ball, engine)) {
      engine.balls.delete(ball.id)
      engine.score += 1
      scoreChanged = true
      engine.effects.push({
        id: `block-${ball.id}`,
        kind: "block",
        x: ball.x,
        y: ball.y,
        startedAt: timestamp,
        duration: BLOCK_EFFECT_DURATION_MS,
      })
    }
  }

  engine.effects = engine.effects.filter((effect) => timestamp - effect.startedAt < effect.duration)

  return {
    scoreChanged,
    livesChanged,
    gameOver: engine.lives <= 0,
  }
}
