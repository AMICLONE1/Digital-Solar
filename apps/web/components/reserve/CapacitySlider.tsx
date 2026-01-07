"use client";

import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  totalKw: number;
  availableKw: number;
}

interface CapacitySliderProps {
  project: Project;
  capacity: number;
  onCapacityChange: (capacity: number) => void;
}

export default function CapacitySlider({
  project,
  capacity,
  onCapacityChange,
}: CapacitySliderProps) {
  const maxCapacity = Math.min(project.availableKw, 20); // Cap at 20kW for individual users

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-charcoal">Reserve Capacity</h2>
        <span className="text-2xl font-bold text-forest">{capacity} kW</span>
      </div>

      <div className="space-y-4">
        <input
          type="range"
          min="1"
          max={maxCapacity}
          step="0.1"
          value={capacity}
          onChange={(e) => onCapacityChange(Number(e.target.value))}
          className="w-full h-2 bg-charcoal/10 rounded-lg appearance-none cursor-pointer accent-forest"
        />
        <div className="flex justify-between text-sm text-charcoal/60">
          <span>1 kW</span>
          <span>{maxCapacity} kW</span>
        </div>
      </div>

      <div className="pt-4 border-t border-charcoal/10">
        <div className="flex justify-between items-center text-sm">
          <span className="text-charcoal/70">Available in this project:</span>
          <span className="font-semibold text-charcoal">
            {project.availableKw.toFixed(1)} kW
          </span>
        </div>
      </div>
    </div>
  );
}

