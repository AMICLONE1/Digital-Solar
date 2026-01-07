"use client";

import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className = "", variant = "rectangular" }: SkeletonProps) {
  const baseClasses = "bg-charcoal/10 rounded animate-pulse";
  const variantClasses = {
    text: "h-4",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      <Skeleton variant="text" className="w-1/3" />
      <Skeleton variant="rectangular" className="h-32" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton variant="text" className="w-1/4 h-6" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="rectangular" className="h-12" />
        </div>
        <div className="space-y-2">
          <Skeleton variant="text" className="w-1/3 h-4" />
          <Skeleton variant="rectangular" className="h-12" />
        </div>
        <Skeleton variant="rectangular" className="h-12 w-32" />
      </div>
    </div>
  );
}

