"use client";

import { useEffect, useState } from "react";

const codeLines = [
  { text: "$ elsen.go", delay: 0 },
  { text: "loading impacts...", delay: 500, isOutput: true },
  {
    text: "✓ Memory usage dropped by 97.4%",
    delay: 1000,
    isOutput: true,
    isSuccess: true,
  },
  {
    text: "✓ Critical issues fixed",
    delay: 1500,
    isOutput: true,
    isSuccess: true,
  },
  {
    text: "✓ Automations improved productivity by 70%",
    delay: 2000,
    isOutput: true,
    isSuccess: true,
  },
  {
    text: "✓ Cost saved by $7506/month",
    delay: 2500,
    isOutput: true,
    isSuccess: true,
  },
  {
    text: "→ Waiting to build positive impact on your business...",
    delay: 3000,
    isOutput: true,
    isHighlight: true,
  },
  { text: "", delay: 3500 },
  { text: "$ curl localhost:3000/availability", delay: 400 },
  {
    text: '{ "status": "available", "contact": "elsenyacub@yahoo.co.id" }',
    delay: 4500,
    isOutput: true,
    isJson: true,
  },
];

export function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    codeLines.forEach((_, index) => {
      const timer = setTimeout(() => {
        setVisibleLines(index + 1);
      }, codeLines[index].delay);
      timers.push(timer);
    });

    // Loop animation
    return () => timers.forEach(clearTimeout);
  }, [visibleLines === 0]);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
        <div className="h-3 w-3 rounded-full bg-red-500/80" />
        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
        <div className="h-3 w-3 rounded-full bg-green-500/80" />
        <span className="ml-4 text-xs text-muted-foreground font-mono">
          terminal
        </span>
      </div>

      {/* Terminal Body */}
      <div className="p-6 font-mono text-sm space-y-1 min-h-[280px]">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className={`
              ${line.isOutput ? "pl-0" : "text-foreground"}
              ${line.isSuccess ? "text-green-400" : ""}
              ${line.isHighlight ? "text-primary" : ""}
              ${line.isJson ? "text-cyan-400" : ""}
              ${!line.isOutput && !line.isSuccess && !line.isHighlight && !line.isJson ? "text-muted-foreground" : ""}
            `}
          >
            {line.text}
          </div>
        ))}
        <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
      </div>
    </div>
  );
}
