import Hero from "@/components/hero/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import SavingsCalculator from "@/components/sections/SavingsCalculator";
import ComparisonTable from "@/components/sections/ComparisonTable";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustSection from "@/components/sections/TrustSection";
import FinalCTASection from "@/components/sections/FinalCTASection";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <SavingsCalculator />
      <ComparisonTable />
      <StatsSection />
      <TestimonialsSection />
      <TrustSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}

