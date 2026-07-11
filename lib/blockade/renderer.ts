import {
  BALL_RADIUS,
  PADDLE_HEIGHT,
  PADDLE_RADIUS,
  PADDLE_WIDTH,
} from "@/lib/blockade/constants"
import type { Ball, EngineState, LocalEffect, Paddle, PlayfieldSize } from "@/lib/blockade/types"

const COLORS = {
  background: "#111827",
  grid: "rgba(148, 163, 184, 0.055)",
  primary: "#5eead4",
  primaryBright: "#99f6e4",
  primaryDeep: "#0f766e",
  packet: "#e2e8f0",
  danger: "#f87171",
}

export function drawBackground(context: CanvasRenderingContext2D, size: PlayfieldSize) {
  context.clearRect(0, 0, size.width, size.height)
  context.fillStyle = COLORS.background
  context.fillRect(0, 0, size.width, size.height)

  const defenseGlow = context.createLinearGradient(0, 0, 150, 0)
  defenseGlow.addColorStop(0, "rgba(94, 234, 212, 0.11)")
  defenseGlow.addColorStop(1, "rgba(94, 234, 212, 0)")
  context.fillStyle = defenseGlow
  context.fillRect(0, 0, 150, size.height)

  context.beginPath()
  context.strokeStyle = COLORS.grid
  context.lineWidth = 1

  for (let x = 40.5; x < size.width; x += 40) {
    context.moveTo(x, 0)
    context.lineTo(x, size.height)
  }

  for (let y = 40.5; y < size.height; y += 40) {
    context.moveTo(0, y)
    context.lineTo(size.width, y)
  }

  context.stroke()
}

export function drawPaddle(context: CanvasRenderingContext2D, paddle: Paddle) {
  const { x, y } = paddle
  const radius = PADDLE_RADIUS
  const gradient = context.createLinearGradient(x, y, x + PADDLE_WIDTH, y)
  gradient.addColorStop(0, COLORS.primaryDeep)
  gradient.addColorStop(0.5, COLORS.primaryBright)
  gradient.addColorStop(1, COLORS.primary)

  context.save()
  context.shadowColor = "rgba(94, 234, 212, 0.55)"
  context.shadowBlur = 18
  context.beginPath()
  context.moveTo(x + radius, y)
  context.lineTo(x + PADDLE_WIDTH - radius, y)
  context.quadraticCurveTo(x + PADDLE_WIDTH, y, x + PADDLE_WIDTH, y + radius)
  context.lineTo(x + PADDLE_WIDTH, y + PADDLE_HEIGHT - radius)
  context.quadraticCurveTo(
    x + PADDLE_WIDTH,
    y + PADDLE_HEIGHT,
    x + PADDLE_WIDTH - radius,
    y + PADDLE_HEIGHT,
  )
  context.lineTo(x + radius, y + PADDLE_HEIGHT)
  context.quadraticCurveTo(x, y + PADDLE_HEIGHT, x, y + PADDLE_HEIGHT - radius)
  context.lineTo(x, y + radius)
  context.quadraticCurveTo(x, y, x + radius, y)
  context.closePath()
  context.fillStyle = gradient
  context.fill()

  context.shadowBlur = 0
  context.strokeStyle = "rgba(15, 118, 110, 0.65)"
  context.lineWidth = 1
  for (let offset = 38; offset < PADDLE_HEIGHT; offset += 38) {
    context.beginPath()
    context.moveTo(x + 6, y + offset)
    context.lineTo(x + PADDLE_WIDTH - 6, y + offset)
    context.stroke()
  }
  context.restore()
}

export function drawBall(context: CanvasRenderingContext2D, ball: Ball) {
  context.save()
  context.shadowColor = "rgba(94, 234, 212, 0.8)"
  context.shadowBlur = 10
  context.beginPath()
  context.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2)
  context.fillStyle = COLORS.packet
  context.fill()
  context.restore()
}

export function drawEffect(context: CanvasRenderingContext2D, effect: LocalEffect, timestamp: number) {
  const progress = Math.min(1, (timestamp - effect.startedAt) / effect.duration)
  const alpha = 1 - progress

  context.save()
  context.globalAlpha = alpha

  if (effect.kind === "block") {
    context.beginPath()
    context.arc(effect.x, effect.y, 5 + progress * 20, 0, Math.PI * 2)
    context.strokeStyle = COLORS.primary
    context.lineWidth = 2
    context.stroke()
  } else {
    const glow = context.createLinearGradient(0, 0, 70, 0)
    glow.addColorStop(0, `rgba(248, 113, 113, ${0.45 * alpha})`)
    glow.addColorStop(1, "rgba(248, 113, 113, 0)")
    context.fillStyle = glow
    context.fillRect(0, Math.max(0, effect.y - 70), 70, 140)
  }

  context.restore()
}

export function drawScene(
  context: CanvasRenderingContext2D,
  engine: EngineState,
  size: PlayfieldSize,
  timestamp: number,
) {
  drawBackground(context, size)

  for (const ball of engine.balls.values()) {
    drawBall(context, ball)
  }

  for (const effect of engine.effects) {
    drawEffect(context, effect, timestamp)
  }

  drawPaddle(context, engine.paddle)
}
