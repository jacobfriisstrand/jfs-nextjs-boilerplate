import { PortableText } from "next-sanity";

import type { PAGE_QUERYResult } from "@/sanity/types";

import { SanityImage } from "@/components/sanity-image";

type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;

export function Hero({ title, text, image }: HeroProps) {
  return (
    <section className="w-full py-16 relative">
      <div className="relative flex flex-col items-center text-center gap-8 z-20">
        {title
          ? (
              <h1 className="text-4xl font-medium max-w-2xl">
                {title}
              </h1>
            )
          : null}
        <div className="text-lg max-w-2xl mx-auto">
          {text ? <PortableText value={text} /> : null}
        </div>
      </div>
      <div className="absolute inset-0 bg-white opacity-75 z-10" />
      {image
        ? (
            <SanityImage
              className="absolute inset-0 object-cover"
              image={image}
              priority
              aspectRatio={16 / 9}
            />
          )
        : null}
    </section>
  );
}
