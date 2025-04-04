import { defineField, defineType } from "sanity";

import { imageFieldType } from "@/sanity/schema-types/image-field-type";

export const heroType = defineType({
  name: "hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "text",
      type: "richText",
    }),
    imageFieldType("image"),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Hero",
        media,
      };
    },
  },
});
