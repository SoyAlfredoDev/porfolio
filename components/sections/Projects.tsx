"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ExternalLink, Github, Folder } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "AI Analytics Dashboard",
    description: "A comprehensive dashboard for visualizing AI model performance metrics in real-time. Built with Next.js and Tremor.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    links: { demo: "https://example.com", repo: "https://github.com" }
  },
  {
    title: "E-Commerce Platform",
    description: "A headless e-commerce solution with Shopify integration, featuring a custom cart and checkout flow.",
    tags: ["React", "Redux", "Shopify API", "Stripe"],
    links: { demo: "https://example.com", repo: "https://github.com" }
  },
  {
    title: "Social Media App",
    description: "A real-time social platform with features like live chat, notifications, and media sharing.",
    tags: ["Vue.js", "Firebase", "Node.js", "Socket.io"],
    links: { demo: "https://example.com", repo: "https://github.com" }
  },
  {
    title: "Portfolio v1",
    description: "My previous portfolio site built with Gatsby and Styled Components. showcasing early design work.",
    tags: ["Gatsby", "Styled Components", "GraphQL"],
    links: { demo: "https://example.com", repo: "https://github.com" }
  }
]

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">03. Work</span>
          <h2 className="text-3xl md:text-5xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:-translate-y-2 transition-transform duration-300 bg-secondary/20 border-white/5">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <Folder className="w-10 h-10 text-primary" />
                    <div className="flex gap-4">
                      <Link href={project.links.repo} target="_blank" className="hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                      </Link>
                      <Link href={project.links.demo} target="_blank" className="hover:text-primary transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-base line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                   <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
                      {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                   </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <Link href="https://github.com" target="_blank">
                <Button variant="outline" size="lg">View Full Project Archive</Button>
             </Link>
        </div>
      </div>
    </section>
  )
}
