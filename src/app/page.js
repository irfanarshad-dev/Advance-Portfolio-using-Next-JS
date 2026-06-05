import dynamic from "next/dynamic";
import { skills } from "@/lib/aboutData";

const HomeClient = dynamic(() => import("@/components/HomeClient"));

export const metadata = {
  title: 'Home - My Self Irfan'
};

export default function Home() {
  return (
    <div data-page="home" className="min-h-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <HomeClient skills={skills} />
    </div>
  );
}
