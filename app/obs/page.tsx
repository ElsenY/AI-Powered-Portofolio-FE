import { Suspense } from "react"
import ObsOverlayClient from "./obs-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "OBS Port Bridge | Localhost Proxy",
  description: "Seamless 1:1 bridge for local port overlays with auto-reconnect fallback monitoring for OBS.",
}

export default function ObsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            Loading bridge parameters...
          </div>
        </div>
      }
    >
      <ObsOverlayClient />
    </Suspense>
  )
}
