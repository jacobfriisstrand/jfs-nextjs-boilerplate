import { defineField, defineType } from "sanity";

export const linkFieldType = defineType({
  name: "linkFieldType",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "linkType",
      type: "string",
      title: "Link type",
      options: {
        list: [
          { title: "Internal link", value: "internal" },
          { title: "External link", value: "external" },
        ],
      },
    }),
    defineField({
      name: "internalLink",
      type: "reference",
      title: "Internal page",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.linkType !== "internal",
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string } | undefined;
        if (parent?.linkType === "internal" && !value) {
          return "Internal page reference is required when link type is internal";
        }
        return true;
      }),
    }),
    defineField({
      name: "externalUrl",
      type: "url",
      title: "External URL",
      hidden: ({ parent }) => parent?.linkType !== "external",
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string } | undefined;
        if (parent?.linkType === "external" && !value) {
          return "External URL is required when link type is external";
        }
        if (parent?.linkType === "external" && value && !value.startsWith("https://")) {
          return "The URL must follow this pattern: https://www.example.com";
        }
        return true;
      }),
    }),
  ],
});
