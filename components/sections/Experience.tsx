"use client"

import { motion } from "framer-motion"

const experience = [
  {
    company: "Tech Corp Inc.",
    role: "Senior Frontend Engineer",
    period: "2021 - Present",
    description: "Leading the frontend team in rebuilding the core product dashboard. Improved performance by 40% and established a new design system."
  },
  {
    company: "Creative Agency",
    role: "Creative Developer",
    period: "2019 - 2021",
    description: "Developed award-winning immersive web experiences for global brands. Specialized in WebGL and complex animations."
  },
  {
    company: "Startup X",
    role: "Full Stack Developer",
    period: "2017 - 2019",
    description: "Early employee building the MVP. Handled both React frontend and Node.js backend services."
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-16">
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">04. Experience</span>
          <h2 className="text-3xl md:text-5xl font-bold">Where I've Worked</h2>
        </div>

        <div className="space-y-12">
          {experience.map((job, index) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8 md:pl-0 border-l md:border-l-0 border-white/10 md:grid md:grid-cols-[1fr_2px_1fr] md:gap-12"
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block w-[2px] bg-white/10 relative h-full mx-auto">
                 <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary" />
              </div>

              {/* Left Content (Date for layout variation or standard) */}
              <div className="md:text-right md:pr-12 mb-2 md:mb-0">
                 <span className="font-mono text-sm text-primary">{job.period}</span>
                 <h3 className="text-xl font-bold mt-1">{job.company}</h3>
              </div>

              {/* Right Content (Description) */}
              <div className="md:pl-2 relative">
                 {/* Mobile Dot */}
                 <div className="md:hidden absolute top-2 -left-[37px] w-3 h-3 rounded-full bg-primary" />
                 
                 <h4 className="text-lg font-medium text-foreground/90 mb-2">{job.role}</h4>
                 <p className="text-muted-foreground">{job.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
