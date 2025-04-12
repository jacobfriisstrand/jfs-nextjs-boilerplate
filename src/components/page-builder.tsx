"use client";

import { createDataAttribute } from "next-sanity";
import { useEffect, useState } from "react";

import type { PAGE_QUERYResult } from "@/sanity/types";

import { FAQs } from "@/components/faqs";
import { Hero } from "@/components/hero";
import { TextAndImage } from "@/components/text-and-image";
import { createDataAttributeConfig } from "@/sanity/lib/data-attribute-config";

type PageBuilderProps = {
  content: NonNullable<PAGE_QUERYResult>["content"];
  documentId: string;
  documentType: string;
};

function DragHandle({
  children,
  blockKey,
  documentId,
  documentType,
}: {
  children: React.ReactNode;
  blockKey: string;
  documentId: string;
  documentType: string;
}) {
  return (
    <div
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: `content[_key=="${blockKey}"]`,
      }).toString()}
    >
      {children}
    </div>
  );
}

export function PageBuilder({
  content,
  documentId,
  documentType,
}: PageBuilderProps) {
  // Ensure content is an array before using useState
  const initialContent = Array.isArray(content) ? content : [];
  const [blocks, setBlocks] = useState(initialContent);

  // Update blocks when content changes
  useEffect(() => {
    setBlocks(initialContent);
  }, [initialContent]);

  return (
    <main
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "content",
      }).toString()}
    >
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <Hero {...block} />
              </DragHandle>
            );
          case "textAndImage":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <TextAndImage {...block} />
              </DragHandle>
            );
          case "faqs":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <FAQs {...block} />
              </DragHandle>
            );
          default:
            // This is a fallback for when we don't have a block type
            return (
              <div key={(block as { _key: string; _type: string })._key}>
                Block not found:
                {(block as { _key: string; _type: string })._type}
              </div>
            );
        }
      })}
    </main>
  );
}
