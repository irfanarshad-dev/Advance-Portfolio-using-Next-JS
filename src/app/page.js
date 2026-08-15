import HomeClient from "@/components/HomeClient";
import { skills } from "@/lib/aboutData";

export const metadata = {
  title: "Home",
  description: "Hi, I'm Irfan Arshad — a Full Stack Developer building scalable web apps with Next.js, NestJS, React, Node.js and MongoDB.",
  openGraph: {
    title: "Irfan Arshad | Full Stack Developer",
    description: "Hi, I'm Irfan Arshad — a Full Stack Developer building scalable web apps with Next.js, NestJS, React, Node.js and MongoDB.",
  },
};

export default function Home() {
  return (
    <div data-page="home" className="min-h-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <HomeClient skills={skills} />
    </div>
  );
}
