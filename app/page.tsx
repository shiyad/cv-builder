import CTA from "@/components/cta";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Pricing from "@/components/Pricing";
import TemplatesShowcase from "@/components/templatesShowcase";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import Header from "@/components/ui/header";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <main className="flex-1">
        <Hero />
        <Features />
        <TemplatesShowcase />
        <Pricing />
        <CTA />
      </main>
    </div>
  );
}
