"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Check, Loader2, Mail } from "lucide-react"

interface NewsletterProps {
  variant?: 'default' | 'won' | 'lost'
}

export function Newsletter({ variant = 'default' }: NewsletterProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
    }, 1500)
  }

  const copy = {
    default: {
      title: "Unlock Hints & Tips",
      text: "Subscribe to my newsletter to get exclusive hints for the secret word, plus web development tips and tricks.",
      button: "Get Hints"
    },
    won: {
      title: "Keep the Streak Alive!",
      text: "You're sharp! Subscribe to receive new challenges, game updates, and advanced frontend techniques directly to your inbox.",
      button: "Join the Elite"
    },
    lost: {
      title: "Need a Clue?",
      text: "Don't give up! Subscribers get daily hints and exclusive guides on how to build games like this one.",
      button: "Get the Secret Clue"
    }
  }

  const content = copy[variant]

  return (
    <div className="w-full max-w-md mx-auto mt-12 bg-secondary/30 border border-white/5 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
           <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold mb-2">{content.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {content.text}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="enter@your.email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading' || status === 'success'}
            className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-3 text-center focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50"
          />
        </div>

        <Button
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="w-full relative overflow-hidden"
          size="lg"
        >
          <AnimatePresence mode="wait">
            {status === 'loading' ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center"
              >
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Subscribing...
              </motion.div>
            ) : status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center text-green-500 font-bold"
              >
                <Check className="w-4 h-4 mr-2" />
                You're in!
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {content.button}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </form>
      
      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-green-500 text-center mt-4"
        >
          Check your inbox for confirmation!
        </motion.p>
      )}
    </div>
  )
}
