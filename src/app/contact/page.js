import dynamic from "next/dynamic";

const ContactClient = dynamic(() => import("@/components/ContactClient"));

export const metadata = {
  title: 'Contact'
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <ContactClient />
    </div>
  );
}
