import { defineField, defineType } from "sanity";

import { client } from "../lib/client";

export const apiVersion = process.env.SANITY_API_VERSION || "2025-03-26";

export const studioClient = client.withConfig({ apiVersion });

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      description: "This is used to generate the URL for the page, and can be generated from the title. If the page is the homepage, this should be left empty.",
      validation: Rule => Rule.custom(async (value, context) => {
        const docId = context.document?._id;
        const client = context.getClient({ apiVersion });

        const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);
        const isHomePage = globalSettings?.homePage?._ref === docId;

        if (isHomePage) {
          return value ? { message: "Homepage must not have a slug" } : true;
        }
        return !value ? { message: "Slug is required" } : true;
      }),
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
