'use client';

import { motion } from "framer-motion";
import { BriefcaseIcon, CalendarIcon, MapPinIcon } from "lucide-react";
import experienceData from "@/data/experience.json";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12"
        >
          Experience
        </motion.h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/40 before:via-primary/60 before:to-primary/20">
          {experienceData.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start md:justify-between md:even:flex-row-reverse group"
            >
              {/* Circle indicator */}
              <div className="absolute left-0 md:left-1/2 ml-2 md:-ml-3 h-6 w-6 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>

              {/* Content */}
              <div className="ml-12 md:ml-0 md:max-w-[calc(50%-2.5rem)] bg-background/50 backdrop-blur-sm border border-muted rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{experience.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {experience.startDate} - {experience.endDate}
                  </span>
                </div>

                <div className="flex items-center mb-3 text-muted-foreground">
                  <BriefcaseIcon className="h-4 w-4 mr-1" />
                  <span className="mr-3">{experience.company}</span>
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  <span>{experience.location}</span>
                </div>

                <p className="text-muted-foreground mb-4">{experience.description}</p>

                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-primary/5 dark:bg-primary/10 text-primary border border-primary/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 