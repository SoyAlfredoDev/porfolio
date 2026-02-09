"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
         <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse" />
         <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 relative w-32 h-32 mx-auto"
        >
           <div className="absolute inset-0 bg-gradient-to-tr from-primary to-purple-500 rounded-full blur-lg opacity-50 animate-pulse" />
           <div className="relative w-full h-full rounded-full border-2 border-white/10 overflow-hidden bg-secondary">
             {/* Replace with /public/profile.jpg */}
             <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-xs text-muted-foreground">
                Photo
             </div>
             {/* <Image src="/profile.jpg" alt="Alfredo Hurtado" fill className="object-cover" /> */}
           </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-secondary/50 border border-white/5 text-sm text-muted-foreground mb-6 backdrop-blur-sm">
            Available for freelance work
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Hi, I'm <span className="text-foreground">Alfredo</span>.<br />
          Building digital <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
            experiences
          </span>
          {" "}that matter.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Senior Frontend Engineer & Creative Developer crafting modern, 
          accessible, and high-performance web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <Link href="#projects">
            <Button size="lg" className="group">
              View Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-6 text-muted-foreground"
        >
          <Link href="https://github.com" target="_blank" className="hover:text-foreground transition-colors">
            <Github className="w-6 h-6" />
          </Link>
          <Link href="https://instagram.com/soyalfredo.dev" target="_blank" className="hover:text-foreground transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-foreground transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link href="mailto:soyalfredo.dev@gmail.com" className="hover:text-foreground transition-colors">
             <div className="w-6 h-6 flex items-center justify-center">
                <span className="text-xl">@</span>
             </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
