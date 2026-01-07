"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, CheckCircle, AlertCircle } from "lucide-react";

interface Project {
  id: string;
  name: string;
  status: "active" | "warning" | "inactive";
  capacity: number;
  generation: number;
}

export default function ProjectHealthIndicator() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects/my-projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-charcoal/10 rounded w-1/2"></div>
          <div className="h-20 bg-charcoal/10 rounded"></div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="text-forest" size={20} />;
      case "warning":
        return <AlertCircle className="text-gold" size={20} />;
      default:
        return <Activity className="text-charcoal/30" size={20} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Project Health</h2>
        <Activity className="text-forest" size={24} />
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 text-charcoal/60">
          <p>No projects allocated yet</p>
          <a href="/reserve" className="text-forest hover:underline mt-2 inline-block">
            Reserve Solar
          </a>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between p-3 bg-offwhite rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(project.status)}
                <div>
                  <p className="font-medium text-charcoal">{project.name}</p>
                  <p className="text-sm text-charcoal/60">
                    {project.capacity} kW • {project.generation}% generation
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

