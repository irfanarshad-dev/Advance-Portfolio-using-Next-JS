import dynamic from 'next/dynamic';
import { skills } from "@/lib/aboutData";

const About = dynamic(() => import('@/components/about'));

export const metadata = {
    title: 'About'
};

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
            <About skills={skills} />
        </div>
    );
}
