import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { PageBuilderWrapper } from "@/components/page-builder-wrapper";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

async function getPage(params: RouteProps["params"]) {
  return sanityFetch({
    query: HOME_PAGE_QUERY,
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
    title: page?.homePage?.seo.title,
    description: page?.homePage?.seo.description,
  };

  if (page?.homePage?.seo.image && page?.homePage?.seo.image.asset?._ref) {
    metadata.openGraph = {
      images: {
        url: urlFor(page.homePage.seo.image).width(1200).height(630).url(),
        width: 1200,
        height: 630,
      },
    };
  }

  if (page?.homePage?.seo.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}
export default async function Page({ params }: RouteProps) {
  const { data: page } = await getPage(params);

  if (!page || !page.homePage) {
    notFound();
  }

  return (
    <>
      <title>{page?.homePage?.seo?.title}</title>
      {page?.homePage?.content
        ? (
            <PageBuilderWrapper content={page.homePage.content} documentId={page.homePage._id} documentType="page" />
          )
        : null}
    </>
  );
}
