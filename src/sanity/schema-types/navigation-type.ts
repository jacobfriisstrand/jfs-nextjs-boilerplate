import { defineField, defineType } from "sanity";

// Define reusable link type fields
const internalLinkField = defineField({
  name: "internalLink",
  type: "reference",
  title: "Internal page",
  to: [{ type: "page" }],
  hidden: ({ parent }) => parent?.linkType !== "internal" || parent?.isSubmenu === true,
  validation: Rule => Rule.custom((value, context) => {
    const parent = context.parent as { linkType?: string } | undefined;
    if (parent?.linkType === "internal" && !value) {
      return "Internal page reference is required when link type is internal";
    }
    return true;
  }),
});

const externalLinkField = defineField({
  name: "externalUrl",
  type: "url",
  title: "External URL",
  hidden: ({ parent }) => parent?.linkType !== "external" || parent?.isSubmenu === true,
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
});

const linkTypeField = defineField({
  name: "linkType",
  type: "string",
  title: "Link type",
  options: {
    list: [
      { title: "Internal link", value: "internal" },
      { title: "External link", value: "external" },
    ],
  },
  hidden: ({ parent }) => parent?.isSubmenu === true,
});

// Define reusable sub-item schema
const subItemSchema = {
  type: "object",
  fields: [
    defineField({
      name: "label",
      description: "The text that will be displayed for the link in the menu",
      type: "string",
      validation: Rule => Rule.required(),
    }),
    linkTypeField,
    internalLinkField,
    externalLinkField,
  ],
};

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: () => "🔗",
  // Make this a singleton by setting initialValue
  initialValue: {
    _id: "navigation",
    _type: "navigation",
  },
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
      type: "array",
      of: [
        {
          name: "navigationItem",
          type: "object",
          fields: [
            defineField({
              name: "label",
              description: "The text that will be displayed for the link in the menu",
              type: "string",
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: "isSubmenu",
              type: "boolean",
              title: "Is submenu",
              initialValue: false,
            }),
            linkTypeField,
            internalLinkField,
            externalLinkField,
            defineField({
              name: "subItems",
              type: "array",
              title: "Sub menu items",
              hidden: ({ parent }) => parent?.isSubmenu !== true,
              of: [subItemSchema],
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Navigation",
      };
    },
  },
});
