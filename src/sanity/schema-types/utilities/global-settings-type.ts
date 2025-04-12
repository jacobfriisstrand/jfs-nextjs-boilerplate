import { defineField, defineType } from "sanity";

export const globalSettingsType = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: () => "🌐",
  fields: [
    defineField({
      name: "homePage",
      title: "Homepage",
      description: "Select the page that will be used as the homepage.",
      type: "reference",
      to: [{ type: "page" }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
      description: "Upload a square image (recommended size: 32x32 pixels) to use as the website favicon. This will appear in browser tabs and bookmarks.",
      options: {
        accept: "image/png, image/x-icon, image/svg+xml",
      },
    }),
    defineField({
      name: "notFoundPage",
      title: "'Not Found' page",
      description: "Select the page that will be used as the not found page. This page will be displayed when a user navigates to a page that does not exist.",
      type: "reference",
      to: [{ type: "page" }],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
      };
    },
  },
});
