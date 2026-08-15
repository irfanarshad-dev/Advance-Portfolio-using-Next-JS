import ServicesServer from "@/components/ServicesServer";

export const metadata = {
  title: "Services",
  description: "Services offered by Irfan Arshad — Web Development, Full Stack Development, Portfolio & Landing Pages, Flutter Apps, WordPress, and Performance Optimization.",
  openGraph: {
    title: "Services | Irfan Arshad",
    description: "Web Development, Full Stack, Flutter Apps, WordPress, and Performance Optimization services.",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <ServicesServer />
    </div>
  );
}
