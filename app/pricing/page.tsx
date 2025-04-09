import Pricing from "@/components/Pricing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - ResumeCraft",
  description: "Choose the perfect plan for your resume building needs",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Pricing />
      </main>
    </div>
  );
}
