"use client"

import { motion, type Variants, type HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

// Animation variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } 
  },
}

// Card hover animation
export const cardHover: Variants = {
  rest: { 
    scale: 1, 
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" 
  },
  hover: { 
    scale: 1.02, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: { duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }
  },
}

// Page transition
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

// Motion wrapper components
interface MotionDivProps extends HTMLMotionProps<"div"> {
  className?: string
  children: React.ReactNode
}

export function FadeIn({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeIn}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function FadeInUp({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInLeft({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={slideInLeft}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function SlideInRight({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={slideInRight}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div variants={staggerItem} className={className} {...props}>
      {children}
    </motion.div>
  )
}

export function AnimatedCard({ children, className, ...props }: MotionDivProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardHover}
      className={cn("rounded-xl", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Floating background circles
export function FloatingCircles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "-10%", left: "20%" }}
      />
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ bottom: "-20%", right: "-5%" }}
      />
      <motion.div
        className="absolute w-[350px] h-[350px] rounded-full bg-primary/3 blur-3xl"
        animate={{
          x: [0, 20, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "40%", right: "25%" }}
      />
    </div>
  )
}

// Pulse glow effect for elements
export function PulseGlow({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        boxShadow: [
          "0 0 20px rgba(250, 204, 21, 0.2)",
          "0 0 40px rgba(250, 204, 21, 0.4)",
          "0 0 20px rgba(250, 204, 21, 0.2)",
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  )
}
