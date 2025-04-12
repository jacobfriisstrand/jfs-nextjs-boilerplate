import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PageBuilderWrapper } from "@/components/page-builder-wrapper";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { NOT_FOUND_PAGE_QUERY } from "@/sanity/lib/queries";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

async function getPage(params: RouteProps["params"]) {
  return sanityFetch({
    query: NOT_FOUND_PAGE_QUERY,
    params: await params,
  });
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { data: page } = await getPage(params);

  if (!page) {
    return {};
  }

  const metadata: Metadata = {
    title: page?.notFoundPage?.seo.title,
    description: page?.notFoundPage?.seo.description,
  };

  if (page?.notFoundPage?.seo.image && page?.notFoundPage?.seo.image.asset?._ref) {
    metadata.openGraph = {
      images: {
        url: urlFor(page.notFoundPage.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (page?.notFoundPage?.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}
export default async function Page({ params }: RouteProps) {
  const { data: page } = await getPage(params);

  if (!page || !page.notFoundPage) {
    notFound();
  }

  return (
    <>
      <title>{page?.notFoundPage?.seo?.title}</title>
      {page?.notFoundPage?.content
        ? (
            <PageBuilderWrapper content={page.notFoundPage.content} documentId={page.notFoundPage._id} documentType="page" />
          )
        : null}
    </>
  );
}
