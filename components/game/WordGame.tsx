"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Newsletter } from "./Newsletter"
import confetti from "canvas-confetti"
import { RefreshCw, Trophy, AlertCircle } from "lucide-react"

// ---------------------------------------------------------
// 🔐 CONFIGURA AQUÍ LA PALABRA SECRETA
// ---------------------------------------------------------
const SECRET_WORD = "REACT"; // Debe ser mayúsculas para simplificar lógica interna
const MAX_ATTEMPTS = 5;

// ---------------------------------------------------------

interface Feedback {
  word: string;
  matchedCount: number;
}

export function WordGame() {
  const [inputValue, setInputValue] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [history, setHistory] = useState<Feedback[]>([])
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')
  const [shake, setShake] = useState(false)
  
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (gameStatus !== 'playing') return

    const guess = inputValue.trim().toUpperCase()
    
    // Validations
    if (!guess) return
    if (guess.split(" ").length > 1) {
      triggerShake()
      // Optional: Show toast "Single word only"
      return
    }
    
    // Reset shake
    setShake(false)

    // Check Logic
    if (guess === SECRET_WORD) {
      handleWin(guess)
    } else {
      handleMiss(guess)
    }
  }

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const countMatches = (guess: string, secret: string) => {
    // Count how many characters from 'guess' appear in 'secret'
    // Logic: "Has acertado X letras"
    // Approach: Unique intersection count to avoid duplicate confusion? 
    // Or total frequency intersection?
    // Prompt says: "Has acertado X letras" -> usually implies quantity. 
    // Example: Secret "CASA", Guess "PALA". 
    // Matches: 'A' (appears twice in both, index 1 and 3). 'L' no, 'P' no.
    // If we count simply characters present: A is present. S is present? no.
    // Let's use: Number of characters in Guess that exist in Secret. 
    // Note: If guess has two 'A's and secret has one 'A', does it count 1 or 2?
    // Simpler and less confusing for this "blind" game: Unique letters matched.
    // e.g. Secret: "REACT", Guess: "TRAIN".
    // T (yes), R (yes), A (yes), I (no), N (no). -> 3 letters matched.
    
    const secretSet = new Set(secret.split(""))
    const guessSet = new Set(guess.split(""))
    
    let count = 0
    guessSet.forEach(char => {
      if (secretSet.has(char)) count++
    })
    return count
  }

  const handleWin = (guess: string) => {
    setHistory([...history, { word: guess, matchedCount: SECRET_WORD.length }])
    setGameStatus('won')
    setInputValue("")
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const handleMiss = (guess: string) => {
    const matches = countMatches(guess, SECRET_WORD)
    const newHistory = [...history, { word: guess, matchedCount: matches }]
    setHistory(newHistory)
    setInputValue("")
    
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    if (newAttempts >= MAX_ATTEMPTS) {
      setGameStatus('lost')
    } else {
      triggerShake() // Visual feedback for wrong guess
    }
  }

  const resetGame = () => {
    setInputValue("")
    setAttempts(0)
    setHistory([])
    setGameStatus('playing')
    inputRef.current?.focus()
  }

  return (
    <div className="word-game max-w-2xl mx-auto">
      <div className="lobby-card relative bg-card/90 border border-border/40 rounded-3xl p-6 md:p-12 overflow-hidden shadow-2xl">
        
        {/* Status Header */}
        <div className="text-center mb-8">
          <span
            className="retro-badge inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-mono mb-4 tracking-widest uppercase"
            data-retro-badge
          >
            Mini Game
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-2">Guess The Word</h1>
          <p className="text-muted-foreground">
            Guess the secret word in {MAX_ATTEMPTS} attempts.
          </p>
        </div>

        {/* Game Area */}
        <div className="relative min-h-[300px] flex flex-col items-center justify-center">
          
          <AnimatePresence mode="wait">
            {gameStatus === 'playing' ? (
              <motion.div
                key="playing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-sm space-y-8"
              >
                {/* Input Input */}
                <motion.form
                  onSubmit={handleGuess}
                  animate={{ x: shake ? [-10, 10, -10, 10, 0] : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative group"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a word..."
                    className="w-full bg-background border-2 border-border rounded-[var(--radius)] px-4 py-4 text-center text-2xl font-bold tracking-widest uppercase focus:outline-none focus:border-primary transition-all"
                    maxLength={10}
                    autoComplete="off"
                  />
                  <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground font-mono">
                     <span>Attempts remaining: <span className="text-foreground font-bold">{MAX_ATTEMPTS - attempts}</span></span>
                     <span className="opacity-50">Press Enter ✨</span>
                  </div>
                </motion.form>

                {/* History */}
                <div className="space-y-2">
                  {history.map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lobby-card flex justify-between items-center bg-muted/40 px-4 py-3 rounded-lg border border-border/30"
                     >
                        <span className="font-bold tracking-wider">{item.word}</span>
                        <span className="text-sm text-muted-foreground">
                           Matched letters: <span className="text-primary font-bold">{item.matchedCount}</span>
                        </span>
                     </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : gameStatus === 'won' ? (
              <motion.div
                key="won"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full"
              >
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Trophy className="w-12 h-12" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4">You Won! 🎉</h2>
                <p className="text-xl text-muted-foreground mb-2">
                  The word was <span className="text-primary font-bold tracking-widest">{SECRET_WORD}</span>
                </p>
                <p className="text-sm text-yellow-500/80 mb-8 border border-yellow-500/20 bg-yellow-500/5 inline-block px-4 py-2 rounded-full">
                  Symbolic Prize: $100 (Virtual Credits)
                </p>
                
                <Button onClick={resetGame} variant="outline" className="mr-4">
                   Play Again <RefreshCw className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="lost"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center w-full"
              >
                <div className="w-24 h-24 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <AlertCircle className="w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Game Over</h2>
                <p className="text-muted-foreground mb-8">
                  You ran out of attempts. The word was <span className="text-foreground font-bold">{SECRET_WORD}</span>.
                </p>
                
                <Button onClick={resetGame} variant="outline">
                   Try Again <RefreshCw className="ml-2 w-4 h-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Conversion Section - Adapts to game state */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
         <Newsletter variant={gameStatus === 'playing' ? 'default' : gameStatus} />
      </motion.div>
      
    </div>
  )
}
