"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ProjectSelector from "@/components/reserve/ProjectSelector";
import CapacitySlider from "@/components/reserve/CapacitySlider";
import SavingsProjection from "@/components/reserve/SavingsProjection";
import PaymentSection from "@/components/reserve/PaymentSection";

interface Project {
  id: string;
  name: string;
  location: string;
  totalKw: number;
  ratePerKwh: number;
  availableKw: number;
  description?: string;
}

export default function ReservePage() {
  const router = useRouter();
  const supabase = createClient();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [capacity, setCapacity] = useState(1);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // SundayGrids style: Allow unauthenticated users to view projects
      // They can sign up from the reserve page
      if (user) {
        setUser(user);
      }
      
      // Fetch projects (public endpoint)
      fetch("/api/projects")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setProjects(data);
            if (data.length > 0) {
              setSelectedProject(data[0]);
            }
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    };

    checkAuth();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-offwhite">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-charcoal/60">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-charcoal">Join a Solar Project</h1>
          <p className="text-charcoal/70 mt-2">
            Reserve solar capacity to offset your monthly power bill. Get credits for the power produced from your reserved solar panels.
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-sm text-blue-800">
                <strong>New to Digital Solar?</strong> You can view projects and reserve capacity. 
                <a href="/signup" className="text-forest font-semibold hover:underline ml-1">Sign up</a> or 
                <a href="/login" className="text-forest font-semibold hover:underline ml-1">login</a> to continue.
              </p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Project Selection & Capacity */}
          <div className="lg:col-span-2 space-y-6">
            <ProjectSelector
              projects={projects}
              selectedProject={selectedProject}
              onSelect={setSelectedProject}
            />
            {selectedProject && (
              <>
                <CapacitySlider
                  project={selectedProject}
                  capacity={capacity}
                  onCapacityChange={setCapacity}
                />
                <SavingsProjection project={selectedProject} capacity={capacity} />
              </>
            )}
          </div>

          {/* Right Column - Payment */}
          <div>
            {selectedProject && (
              <PaymentSection project={selectedProject} capacity={capacity} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

