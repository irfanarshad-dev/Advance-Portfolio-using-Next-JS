import dynamic from "next/dynamic";
import { categories, projects, tagColors } from "@/lib/portfolioData";

const PortfolioClient = dynamic(() => import("@/components/PortfolioClient"));

export const metadata = {
  title: 'Portfolio'
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
