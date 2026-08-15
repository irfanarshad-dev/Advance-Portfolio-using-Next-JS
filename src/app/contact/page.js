import ContactClient from "@/components/ContactClient";

export const metadata = {
  title: "Contact",
  description: "Get in touch with Irfan Arshad — available for freelance projects, collaborations and full-time opportunities. Based in Lahore, Pakistan.",
  openGraph: {
    title: "Contact Irfan Arshad",
    description: "Available for freelance projects and collaborations. Based in Lahore, Pakistan.",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col text-[var(--foreground)] overflow-x-hidden bg-[var(--background)]">
      <ContactClient />
    </div>
  );
}
