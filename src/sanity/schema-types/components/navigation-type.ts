import { defineField, defineType } from "sanity";

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
    defineField({
      name: "link",
      type: "linkFieldType",
      title: "Link",
    }),
  ],
};

export const navigationType = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: () => "🔗",
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
              name: "link",
              type: "linkFieldType",
              title: "Link",
              hidden: ({ parent }) => parent?.isSubmenu === true,
            }),
            defineField({
              name: "isSubmenu",
              type: "boolean",
              title: "Is submenu",
              description: "If enabled, the navigation item will open a submenu",
              initialValue: false,
            }),
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
