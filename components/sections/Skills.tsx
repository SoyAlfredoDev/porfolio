"use client"

import { motion } from "framer-motion"

const skills = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"] },
  { name: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "GraphQL", "Serverless"] },
  { name: "Design", items: ["Figma", "Adobe XD", "UI/UX", "Prototyping"] },
  { name: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "CI/CD"] },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 relative bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="mb-16">
           <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">02. Skills</span>
           <h2 className="text-3xl md:text-4xl font-bold">Tech Stack & Tools</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:border-primary/20 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-6 text-foreground/90">{category.name}</h3>
              <ul className="space-y-3">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
