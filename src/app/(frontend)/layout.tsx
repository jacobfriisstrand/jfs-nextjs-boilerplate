import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import { DisableDraftMode } from "@/components/disable-draft-mode";
import Footer from "@/components/modules/footer";
import Navigation from "@/components/modules/navigation";
import { SanityLive } from "@/sanity/lib/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
    </>
  );
}
