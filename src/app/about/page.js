import About from '@/components/about';
import { skills } from "@/lib/aboutData";

export const metadata = {
    title: "About",
    description: "Learn about Irfan Arshad — Full Stack Developer with 4+ years of experience in Next.js, NestJS, React, Node.js, MongoDB, Flutter and Python.",
    openGraph: {
      title: "About Irfan Arshad | Full Stack Developer",
      description: "4+ years experience in Next.js, NestJS, React, Node.js, MongoDB, Flutter and Python.",
    },
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
            <About skills={skills} />
        </div>
    );
}
