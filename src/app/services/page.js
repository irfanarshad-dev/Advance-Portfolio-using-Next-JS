import dynamic from "next/dynamic";

const ServicesClient = dynamic(() => import("@/components/ServicesClient"));
const Navbar = dynamic(() => import("@/components/navbar"));

export const metadata = {
  title: 'Services'
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      {/* Desktop Navbar */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-24 z-50">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <div className="w-full">
        <ServicesClient />
      </div>
      
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
}