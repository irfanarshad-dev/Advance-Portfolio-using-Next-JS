"use client";
import { usePathname, useRouter } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import MailIcon from "@mui/icons-material/Mail";
import ChatIcon from "@mui/icons-material/Chat";

const navItems = [
  { href: "/", label: "Home", icon: <HomeIcon /> },
  { href: "/about", label: "About", icon: <PersonIcon /> },
  { href: "/portfolio", label: "Portfolio", icon: <WorkIcon /> },
  { href: "/contact", label: "Contact", icon: <MailIcon /> },
  { href: "/services", label: "Service", icon: <ChatIcon /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/admin")) return null;

  const handleNav = (e, href) => {
    e.preventDefault();
    if (pathname === href) return;
    router.push(href);
  };

  return (
    <>
      <nav className="hidden md:flex fixed top-1/2 right-8 -translate-y-1/2 flex-col space-y-6 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/");
          return (
            <a key={item.href} href={item.href} onClick={(e) => handleNav(e, item.href)} className="group flex items-center justify-end">
              <div className="flex flex-row-reverse items-center transition-all duration-300 w-10 h-10 group-hover:w-40 rounded-full overflow-hidden bg-[var(--nav-bg)] group-hover:bg-[var(--primary)]">
                <div className={`w-10 h-10 flex items-center rounded-full overflow-x-hidden absolute transition-all duration-300 ${isActive ? "bg-[var(--primary)]" : "bg-[var(--nav-bg)] group-hover:bg-[var(--primary)]"}`}>
                  <span className={`text-xl flex items-center justify-center transition-colors duration-300 ${isActive ? "text-[var(--nav-text-hover)]" : "text-[var(--nav-text)] group-hover:text-[var(--nav-text-hover)]"}`} style={{ width: "100%", height: "100%" }}>
                    {item.icon}
                  </span>
                </div>
                <span className="mr-auto ml-2 text-sm font-bold text-[var(--nav-text-hover)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
      <nav className="flex md:hidden fixed bottom-0 left-0 w-full bg-[var(--nav-bg)] border-t border-[var(--primary)] justify-around items-center py-2 z-50">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname === "/" && item.href === "/");
          return (
            <a key={item.href} href={item.href} onClick={(e) => handleNav(e, item.href)} className="group flex items-center justify-center px-1">
              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ${isActive ? "bg-[var(--primary)]" : "bg-[var(--nav-bg)]"}`}>
                <span className={`text-lg sm:text-xl flex items-center justify-center ${isActive ? "text-[var(--nav-text-hover)]" : "text-[var(--nav-text)]"}`} style={{ width: "100%", height: "100%" }}>
                  {item.icon}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </>
  );
}
