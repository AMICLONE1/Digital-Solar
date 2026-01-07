"use client";

import { motion } from "framer-motion";
import { MapPin, Zap } from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  totalKw: number;
  ratePerKwh: number;
  availableKw: number;
  description?: string;
}

interface ProjectSelectorProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelect: (project: Project) => void;
}

export default function ProjectSelector({
  projects,
  selectedProject,
  onSelect,
}: ProjectSelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <h2 className="text-xl font-semibold text-charcoal">Select Solar Project</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <motion.button
            key={project.id}
            onClick={() => onSelect(project)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-4 rounded-lg border-2 text-left calm-transition ${
              selectedProject?.id === project.id
                ? "border-forest bg-forest/5"
                : "border-charcoal/10 hover:border-forest/30"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-charcoal">{project.name}</h3>
              {selectedProject?.id === project.id && (
                <div className="w-5 h-5 bg-forest rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-offwhite rounded-full"></div>
                </div>
              )}
            </div>
            <div className="space-y-2 text-sm text-charcoal/70">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} />
                <span>{project.totalKw} kW total</span>
              </div>
              <div className="pt-2">
                <span className="text-charcoal/50">Available: </span>
                <span className="font-medium text-forest">
                  {project.availableKw.toFixed(1)} kW
                </span>
              </div>
            </div>
            {project.description && (
              <p className="text-sm text-charcoal/60 mt-2">{project.description}</p>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

