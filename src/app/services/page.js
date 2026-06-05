import ServicesServer from "@/components/ServicesServer";

export const metadata = {
  title: 'Services'
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <ServicesServer />
    </div>
  );
}
