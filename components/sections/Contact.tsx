"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('submitting')
    // Simulate API call
    setTimeout(() => {
      setFormState('success')
    }, 1500)
  }

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden">
       {/* Background gradient */}
       <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-secondary/20 pointer-events-none" />

      <div className="container mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="mb-16 text-center max-w-2xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">05. What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get In Touch</h2>
          <p className="text-lg text-muted-foreground">
            Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
             <h3 className="text-2xl font-semibold">Let's talk about everything!</h3>
             <p className="text-muted-foreground">
               Don't like forms? Send me an email.
             </p>
             
             <div className="space-y-4">
                 <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                       <Mail className="w-5 h-5" />
                    </div>
                    <a href="mailto:soyalfredo.dev@gmail.com">soyalfredo.dev@gmail.com</a>
                 </div>
                  <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                       <Phone className="w-5 h-5" />
                    </div>
                    <a href="tel:+353838316917">+353 83 831 6917</a>
                 </div>
                 <div className="flex items-center space-x-4 text-muted-foreground hover:text-foreground transition-colors group">
                     <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <MapPin className="w-5 h-5" />
                     </div>
                     <span>Dublin, Ireland</span>
                 </div>
             </div>
          </div>
          
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/30 p-8 rounded-2xl border border-white/5">
             <div className="grid md:grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label htmlFor="name" className="text-sm font-medium">Name</label>
                 <input 
                   id="name"
                   type="text" 
                   required
                   className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                   placeholder="John Doe"
                 />
               </div>
               <div className="space-y-2">
                 <label htmlFor="email" className="text-sm font-medium">Email</label>
                 <input 
                   id="email"
                   type="email" 
                   required
                   className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                   placeholder="john@example.com"
                 />
               </div>
             </div>
             
             <div className="space-y-2">
               <label htmlFor="message" className="text-sm font-medium">Message</label>
               <textarea 
                 id="message"
                 required
                 rows={4}
                 className="w-full bg-background/50 border border-white/10 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                 placeholder="Your message here..."
               />
             </div>
             
             <Button 
               type="submit" 
               className={cn("w-full transition-all", formState === 'success' ? "bg-green-600 hover:bg-green-700" : "")}
               disabled={formState === 'submitting' || formState === 'success'}
             >
               {formState === 'submitting' ? (
                 "Sending..."
               ) : formState === 'success' ? (
                 "Message Sent!"
               ) : (
                 <>Send Message <Send className="ml-2 w-4 h-4" /></>
               )}
             </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
