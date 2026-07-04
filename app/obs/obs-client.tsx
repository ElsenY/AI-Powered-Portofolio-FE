"use client"

import * as React from "react"
import { useState, useEffect, useRef, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  ExternalLink, 
  Settings, 
  Terminal, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  SlidersHorizontal,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export default function ObsOverlayClient({ defaultPath = "#" }: { defaultPath?: string }) {
  const searchParams = useSearchParams()

  // Base state configurations, matching defaults
  const [protocol, setProtocol] = useState("http")
  const [host, setHost] = useState("localhost")
  const [port, setPort] = useState("9527")
  const [path, setPath] = useState(defaultPath)
  const [intervalMs, setIntervalMs] = useState(2000)

  // Operational states
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking")
  const [attempts, setAttempts] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const logEndRef = useRef<HTMLDivElement>(null)

  // Construct target URL
  const pathClean = path.startsWith("/") || path.startsWith("#") || !path ? path : `/${path}`
  const targetUrl = `${protocol}://${host}:${port}${pathClean}`

  // Log function helper
  const logMessage = useCallback((msg: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev.slice(-99), `[${timestamp}] ${msg}`])
  }, [])

  // Initialize from search parameters
  useEffect(() => {
    const pProto = searchParams.get("protocol")
    const pHost = searchParams.get("host")
    const pPort = searchParams.get("port")
    const pPath = searchParams.get("path")
    const pInterval = searchParams.get("interval")

    if (pProto) setProtocol(pProto)
    if (pHost) setHost(pHost)
    if (pPort) setPort(pPort)
    if (pPath !== null) setPath(pPath)
    else setPath(defaultPath)
    
    if (pInterval) {
      const val = parseInt(pInterval, 10)
      if (!isNaN(val) && val >= 500) setIntervalMs(val)
    }

    logMessage("Config loaded from parameters.")
  }, [searchParams, logMessage, defaultPath])

  // Sync state back to window URL query params without reloading the page
  const updateQueryParams = useCallback((
    newProto: string,
    newHost: string,
    newPort: string,
    newPath: string,
    newInterval: number
  ) => {
    if (typeof window === "undefined") return

    const params = new URLSearchParams()
    if (newProto !== "http") params.set("protocol", newProto)
    if (newHost !== "localhost") params.set("host", newHost)
    if (newPort !== "9527") params.set("port", newPort)
    if (newPath !== defaultPath && newPath !== "") params.set("path", newPath)
    if (newInterval !== 2000) params.set("interval", newInterval.toString())

    const queryStr = params.toString()
    const urlSuffix = queryStr ? `?${queryStr}` : ""
    window.history.replaceState(null, "", `${window.location.pathname}${urlSuffix}`)
  }, [defaultPath])

  // Auto-scroll logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs])

  // Primary connectivity check handler
  const checkConnection = useCallback(async (testUrl: string): Promise<boolean> => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), Math.min(intervalMs, 3000))

      // Clean the url for fetch (fetch strip fragments naturally, but let's clean hashes manually just in case)
      const fetchUrl = testUrl.split("#")[0]

      await fetch(fetchUrl, {
        mode: "no-cors",
        cache: "no-store",
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      return true
    } catch (error) {
      return false
    }
  }, [intervalMs])

  // React connection polling loop
  useEffect(() => {
    let active = true
    let timerId: NodeJS.Timeout
    let consecutiveSuccess = 0
    let consecutiveFailure = 0

    // Construct the clean test URL for fetch (always fetch without hash/fragment)
    const testUrl = `${protocol}://${host}:${port}/`

    const runPoll = async () => {
      if (!active) return

      const isUp = await checkConnection(testUrl)
      if (!active) return

      if (isUp) {
        consecutiveFailure = 0
        consecutiveSuccess++
        
        setStatus(prev => {
          if (prev !== "connected") {
            logMessage(`✓ Connected to ${testUrl}. Transitioning to overlay...`)
            setIsTransitioning(true)
            // Fade out overlay UI after 1.2s to allow iframe to boot
            setTimeout(() => {
              if (active) setIsTransitioning(false)
            }, 1200)
            return "connected"
          }
          return "connected"
        })
        setAttempts(0)
        
        // When connected, check less frequently (every 5 seconds) to prevent spamming localhost
        timerId = setTimeout(runPoll, 5000)
      } else {
        consecutiveSuccess = 0
        consecutiveFailure++

        setStatus(prev => {
          if (prev === "connected") {
            logMessage(`✗ Connection lost to ${testUrl}!`)
            return "disconnected"
          }
          
          // Log a retry failure every 5 failed attempts to prevent logs cluttering
          setAttempts(current => {
            const nextAttempts = current + 1
            if (nextAttempts === 1 || nextAttempts % 5 === 0) {
              logMessage(`✗ Offline: Unable to reach ${testUrl} (Attempt ${nextAttempts})`)
            }
            return nextAttempts
          })
          
          return "disconnected"
        })

        // When offline, poll at the specified interval
        timerId = setTimeout(runPoll, intervalMs)
      }
    }

    setStatus("checking")
    logMessage(`Initializing connection monitor targeting: ${testUrl}`)
    runPoll()

    return () => {
      active = false
      clearTimeout(timerId)
    }
  }, [protocol, host, port, intervalMs, checkConnection, logMessage])

  // Copy shareable link
  const handleCopyLink = () => {
    if (typeof window === "undefined") return
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Clear log display
  const handleClearLogs = () => {
    setLogs([])
    logMessage("Logs cleared.")
  }

  // Handle configuration changes
  const handleProtoChange = (val: string) => {
    setProtocol(val)
    updateQueryParams(val, host, port, path, intervalMs)
    logMessage(`Protocol updated to: ${val}`)
  }

  const handleHostChange = (val: string) => {
    setHost(val)
    updateQueryParams(protocol, val, port, path, intervalMs)
  }

  const handlePortChange = (val: string) => {
    setPort(val)
    updateQueryParams(protocol, host, val, path, intervalMs)
  }

  const handlePathChange = (val: string) => {
    setPath(val)
    updateQueryParams(protocol, host, port, val, intervalMs)
  }

  const handleIntervalChange = (val: number) => {
    setIntervalMs(val)
    updateQueryParams(protocol, host, port, path, val)
    logMessage(`Retry interval set to: ${val}ms`)
  }

  return (
    <div className={cn(
      "relative w-screen h-screen overflow-hidden transition-colors duration-1000 select-none",
      status === "connected" ? "bg-transparent" : "bg-zinc-950"
    )}>
      
      {/* Styles Injection for Custom Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes radar-ripple {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes sweep-radar {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-radar-ripple {
          animation: radar-ripple 3.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
        }
        .animate-sweep-radar {
          animation: sweep-radar 8s linear infinite;
          transform-origin: 50% 50%;
        }
        .grid-cyber {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(16, 185, 129, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(16, 185, 129, 0.02) 1px, transparent 1px);
        }
        .grid-cyber-error {
          background-size: 40px 40px;
          background-image: 
            linear-gradient(to right, rgba(239, 68, 68, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(239, 68, 68, 0.02) 1px, transparent 1px);
        }
      `}} />

      {/* Embedded Iframe copying localhost 1-to-1 */}
      {status === "connected" && (
        <iframe
          src={targetUrl}
          className={cn(
            "absolute inset-0 w-full h-full border-none z-10 transition-opacity duration-1000 bg-transparent",
            isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100"
          )}
          title="OBS Port Bridge 1:1"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      )}

      {/* Sleek Overlay UI Layer */}
      {(status !== "connected" || isTransitioning) && (
        <div className={cn(
          "absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-zinc-950 font-sans transition-opacity duration-1000",
          status === "connected" && !isTransitioning ? "opacity-0 pointer-events-none" : "opacity-100",
          status === "disconnected" ? "grid-cyber-error" : "grid-cyber"
        )}>
          
          {/* Main Container Card */}
          <div className="w-full max-w-lg bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden transition-all duration-300">
            
            {/* Top Scanning Laser Bar */}
            <div className={cn(
              "absolute top-0 left-0 right-0 h-[2px] transition-all duration-500",
              status === "connected" ? "bg-emerald-500 shadow-[0_0_10px_#10b981]" :
              status === "checking" ? "bg-amber-500 shadow-[0_0_10px_#f59e0b]" :
              "bg-red-500 shadow-[0_0_10px_#ef4444]"
            )} />

            {/* Header Area */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "p-2 rounded-xl border transition-colors",
                  status === "connected" ? "bg-emerald-950/40 border-emerald-800 text-emerald-400" :
                  status === "checking" ? "bg-amber-950/40 border-amber-800 text-amber-400" :
                  "bg-red-950/40 border-red-800/60 text-red-400"
                )}>
                  {status === "connected" ? (
                    <Wifi className="h-5 w-5 animate-pulse" />
                  ) : (
                    <WifiOff className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h1 className="text-base font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                    OBS Port Bridge
                  </h1>
                  <p className="text-xs text-zinc-500 font-mono">
                    Proxying localhost:9527
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-mono font-medium border flex items-center gap-1.5 shadow-sm",
                status === "connected" ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/50" :
                status === "checking" ? "bg-amber-950/40 text-amber-400 border-amber-800/50 animate-pulse" :
                "bg-red-950/40 text-red-400 border-red-800/50"
              )}>
                <span className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  status === "connected" ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" :
                  status === "checking" ? "bg-amber-400 shadow-[0_0_8px_#fbbf24]" :
                  "bg-red-400 shadow-[0_0_8px_#f87171]"
                )} />
                {status.toUpperCase()}
              </div>
            </div>

            {/* Radar Animation Area */}
            <div className="flex justify-center my-8">
              <div className="relative w-36 h-36 flex items-center justify-center rounded-full border border-zinc-800/40 bg-zinc-950/30">
                {/* Ripples */}
                {status !== "connected" && (
                  <>
                    <div className={cn(
                      "absolute inset-0 rounded-full border opacity-0 animate-radar-ripple",
                      status === "checking" ? "border-amber-500/20" : "border-red-500/20"
                    )} />
                    <div className={cn(
                      "absolute inset-0 rounded-full border opacity-0 animate-radar-ripple [animation-delay:1.5s]",
                      status === "checking" ? "border-amber-500/10" : "border-red-500/10"
                    )} />
                  </>
                )}

                {/* Radar Lines */}
                <div className="absolute inset-2 rounded-full border border-dashed border-zinc-800/30" />
                <div className="absolute inset-8 rounded-full border border-zinc-800/20" />
                <div className="absolute inset-16 rounded-full border border-zinc-800/10" />

                {/* Rotating Sweep Arm */}
                {status === "checking" && (
                  <div className="absolute inset-0 rounded-full animate-sweep-radar pointer-events-none opacity-20">
                    <div className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-t from-transparent to-amber-400" />
                  </div>
                )}

                {/* Center Node */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center z-10 border transition-all duration-500",
                  status === "connected" ? "bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-emerald-400" :
                  status === "checking" ? "bg-amber-500/10 border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] text-amber-400 animate-pulse" :
                  "bg-red-500/10 border-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.2)] text-red-400"
                )}>
                  {status === "connected" ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : status === "checking" ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <ShieldAlert className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>

            {/* Target Address Info Card */}
            <div className="bg-zinc-950/65 border border-zinc-800/50 rounded-xl p-4 mb-5 flex flex-col gap-2">
              <div className="flex justify-between items-center text-xs text-zinc-500">
                <span className="font-medium uppercase tracking-wider text-[10px]">Target Overlay URL</span>
                <span className="font-mono">Port: {port}</span>
              </div>
              <div className="flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800/40 rounded-lg px-3 py-2">
                <span className="font-mono text-xs text-zinc-300 truncate selection:bg-emerald-800">
                  {targetUrl}
                </span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={handleCopyLink} 
                    className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Copy bridge URL to Clipboard"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                  <a 
                    href={targetUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-zinc-200 transition-colors"
                    title="Open port directly in browser"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="text-[11px] text-zinc-500 text-center leading-relaxed mt-1">
                {status === "disconnected" && "Aggregator offline. Start your local server at port 9527."}
                {status === "checking" && "Listening for TCP handshake on localhost..."}
                {status === "connected" && "Injecting stream overlay page..."}
              </div>
            </div>

            {/* Terminal Console Logs */}
            <div className="border border-zinc-800/80 rounded-xl overflow-hidden mb-5">
              {/* Terminal Title Bar */}
              <div className="bg-zinc-950 border-b border-zinc-800/60 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[11px] font-mono font-medium text-zinc-400">Terminal Log Monitor</span>
                </div>
                <button
                  onClick={handleClearLogs}
                  className="text-[10px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors hover:underline"
                >
                  Clear
                </button>
              </div>

              {/* Logs Feed */}
              <div className="bg-zinc-950/80 p-3 h-28 overflow-y-auto font-mono text-[10px] leading-relaxed flex flex-col gap-1 select-text scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-800">
                {logs.length === 0 ? (
                  <div className="text-zinc-600 italic">No output logs yet...</div>
                ) : (
                  logs.map((log, idx) => (
                    <div key={idx} className={cn(
                      "whitespace-pre-wrap break-all",
                      log.includes("✓") ? "text-emerald-400" :
                      log.includes("✗") ? "text-red-400" :
                      "text-zinc-400"
                    )}>
                      {log}
                    </div>
                  ))
                )}
                <div ref={logEndRef} />
              </div>
            </div>

            {/* Accordion Settings Toggle */}
            <div className="border-t border-zinc-800/50 pt-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between h-8 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 text-xs px-2"
                onClick={() => setShowSettings(!showSettings)}
              >
                <span className="flex items-center gap-1.5 font-medium">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Advanced Bridge Settings
                </span>
                <span className="text-zinc-500">
                  {showSettings ? "Hide" : "Configure"}
                </span>
              </Button>

              {/* Advanced Inputs Drawer */}
              {showSettings && (
                <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-zinc-800/30">
                  
                  {/* Protocol selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-zinc-500 font-mono">Protocol</label>
                    <div className="flex gap-1 bg-zinc-950 p-0.5 rounded-lg border border-zinc-800/60">
                      {["http", "https"].map(p => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => handleProtoChange(p)}
                          className={cn(
                            "flex-1 text-[10px] font-mono py-1 rounded-md transition-colors",
                            protocol === p 
                              ? "bg-zinc-800 text-zinc-200 font-bold" 
                              : "text-zinc-500 hover:text-zinc-300"
                          )}
                        >
                          {p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Host selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-zinc-500 font-mono">Host Address</label>
                    <Input
                      value={host}
                      onChange={(e) => {
                        handleHostChange(e.target.value)
                        updateQueryParams(protocol, e.target.value, port, path, intervalMs)
                      }}
                      placeholder="localhost"
                      className="h-7 text-xs font-mono bg-zinc-950 border-zinc-800 text-zinc-200"
                    />
                  </div>

                  {/* Port Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-zinc-500 font-mono">Port</label>
                    <Input
                      value={port}
                      onChange={(e) => {
                        handlePortChange(e.target.value)
                        updateQueryParams(protocol, host, e.target.value, path, intervalMs)
                      }}
                      placeholder="9527"
                      className="h-7 text-xs font-mono bg-zinc-950 border-zinc-800 text-zinc-200"
                    />
                  </div>

                  {/* Path Selection */}
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-semibold text-zinc-500 font-mono">Path / Fragment</label>
                    <Input
                      value={path}
                      onChange={(e) => {
                        handlePathChange(e.target.value)
                        updateQueryParams(protocol, host, port, e.target.value, intervalMs)
                      }}
                      placeholder="#"
                      className="h-7 text-xs font-mono bg-zinc-950 border-zinc-800 text-zinc-200"
                    />
                  </div>

                  {/* Interval Selection */}
                  <div className="col-span-2 space-y-1 mt-1">
                    <div className="flex justify-between text-[10px] uppercase font-semibold text-zinc-500 font-mono">
                      <span>Poll Interval</span>
                      <span>{intervalMs}ms</span>
                    </div>
                    <input
                      type="range"
                      min={500}
                      max={5000}
                      step={250}
                      value={intervalMs}
                      onChange={(e) => handleIntervalChange(parseInt(e.target.value))}
                      className="w-full accent-amber-500 h-1 rounded-lg bg-zinc-850 appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
          
          {/* Footer OBS Tag */}
          <div className="mt-8 flex items-center gap-1.5 text-zinc-600 text-xs font-mono">
            <Globe className="h-3.5 w-3.5" />
            <span>Copy this page's URL to OBS as a Browser Source</span>
          </div>

        </div>
      )}
    </div>
  )
}
