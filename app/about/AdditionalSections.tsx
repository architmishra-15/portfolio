import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LucideBookOpen,
  LucideCode,
  LucideGlobe,
  LucideTrophy,
} from "lucide-react";
import "./timeline.css";

const AdditionalSections = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-16">
      {/* Achievements Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Achievements
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: LucideTrophy,
              title: "Hackathons",
              description:
                "Participated in multiple coding competitions and hackathons",
            },
            {
              icon: LucideCode,
              title: "Open Source",
              description: "Contributed to several open-source projects",
            },
            {
              icon: LucideBookOpen,
              title: "Certifications",
              description: "Completed advanced web development courses",
            },
            {
              icon: LucideGlobe,
              title: "Global Projects",
              description: "Collaborated on international development projects",
            },
          ].map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center space-x-4">
                <item.icon className="w-8 h-8 text-primary" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Technology Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "NextJS",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Shadcn UI",
            "Node.js",
            "Python",
            "Git",
          ].map((tech, index) => (
            <div
              key={index}
              className="
                px-4 py-2 
                bg-secondary 
                text-secondary-foreground 
                rounded-full
                hover:bg-secondary/80
                transition-colors
              "
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Interests */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Interests
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Web Development",
            "Open Source",
            "Technology Innovation",
            "Machine Learning",
            "Problem Solving",
          ].map((interest, index) => (
            <div
              key={index}
              className="
                px-4 py-2 
                bg-accent 
                text-accent-foreground 
                rounded-full
                hover:bg-accent/80
                transition-colors
              "
            >
              {interest}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdditionalSections;
