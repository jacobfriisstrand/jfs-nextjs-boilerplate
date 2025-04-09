import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import { DisableDraftMode } from "@/components/disable-draft-mode";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { SanityLive } from "@/sanity/lib/live";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-rows-[auto_1fr_auto] min-h-screen">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
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
