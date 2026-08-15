import PortfolioClient from "@/components/PortfolioClient";
import { categories, projects, tagColors } from "@/lib/portfolioData";

export const metadata = {
  title: "Portfolio",
  description: "Explore Irfan Arshad's portfolio — projects built with Next.js, NestJS, React, Node.js, MongoDB and Flutter including VoiceApp, Rozgaar360, and more.",
  openGraph: {
    title: "Portfolio | Irfan Arshad",
    description: "Projects built with Next.js, NestJS, React, Node.js, MongoDB and Flutter.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <PortfolioClient
        categories={categories}
        projects={projects}
        tagColors={tagColors}
      />
    </div>
  );
}
