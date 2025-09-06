import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar"));
const HomeClient = dynamic(() => import("@/components/HomeClient"));

export const metadata = {
  title: 'Home - My Self Irfan'
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      {/* Desktop Navbar */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-24 z-50">
        <Navbar />
      </div>
      
      {/* Main Content */}
      <div className="w-full lg:ml-24">
        <HomeClient />
      </div>
      
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-50">
        <Navbar />
      </div>
    </div>
  );
}