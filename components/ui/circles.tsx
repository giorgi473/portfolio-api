"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface BackgroundCirclesProps {
  className?: string
}

export function BackgroundCircles({ className }: BackgroundCirclesProps) {
  return (
    <div
      className={cn(
        "inset-0 flex absolute items-center justify-center overflow-hidden bg-[#030303]",
        className,
      )}
    >
      {/* Center glow - scales with viewport */}
      <div
        className="absolute rounded-full bg-purple-500/10 blur-[120px]"
        style={{
          width: "min(60vw, 60vh)",
          height: "min(60vw, 60vh)",
        }}
      />

      {/* Circles container - scales with viewport */}
      <div className="relative h-full w-full">
        {/* Circle 1 - smallest with gradient arc */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            width: "min(20vw, 20vh)",
            height: "min(20vw, 20vh)",
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(154, 31, 242, 0.5) 60deg, transparent 120deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          }}
        />

        {/* Circle 2 with dashed effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            width: "min(35vw, 35vh)",
            height: "min(35vw, 35vh)",
            background:
              "conic-gradient(from 180deg, rgba(105, 6, 212, 0.4) 0deg, transparent 40deg, transparent 90deg, rgba(105, 6, 212, 0.3) 130deg, transparent 170deg, transparent 270deg, rgba(123, 6, 212, 0.2) 310deg, transparent 350deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          }}
        />

        {/* Circle 3 with arc */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            width: "min(50vw, 50vh)",
            height: "min(50vw, 50vh)",
            background:
              "conic-gradient(from 90deg, transparent 0deg, rgba(102, 20, 184, 0.4) 30deg, rgba(129, 20, 184, 0.6) 60deg, transparent 90deg, transparent 180deg, rgba(108, 20, 184, 0.3) 210deg, transparent 240deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 2px))",
          }}
        />

        {/* Circle 4 */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            width: "min(65vw, 65vh)",
            height: "min(65vw, 65vh)",
            background:
              "conic-gradient(from 270deg, rgba(156, 45, 212, 0.3) 0deg, transparent 50deg, transparent 120deg, rgba(184, 45, 212, 0.2) 150deg, transparent 200deg, transparent 300deg, rgba(140, 45, 212, 0.25) 330deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
          }}
        />

        {/* Circle 5 - largest with subtle arc */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          style={{
            width: "min(80vw, 80vh)",
            height: "min(80vw, 80vh)",
            background:
              "conic-gradient(from 0deg, rgba(125, 100, 139, 0.2) 0deg, transparent 30deg, transparent 180deg, rgba(102, 10, 183, 0.15) 200deg, transparent 230deg, transparent 360deg)",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
            WebkitMask:
              "radial-gradient(farthest-side, transparent calc(100% - 1px), black calc(100% - 1px))",
          }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, transparent 40%, rgba(3,3,3,0.8) 70%, rgba(3,3,3,1) 100%)",
        }}
      />
    </div>
  )
}

export default function BackgroundCirclesDemo() {
  return <BackgroundCircles />
}

export type { BackgroundCirclesProps }
