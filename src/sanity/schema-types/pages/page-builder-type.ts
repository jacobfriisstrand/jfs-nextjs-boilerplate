import { defineArrayMember, defineType } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "textAndImage" }),
    defineArrayMember({ type: "faqs" }),
  ],

  // Possibilty for adding custom image previews (screenshots) of each component in the page builder.
  // If desired, add a screenshot of the component (from Figma) to the public folder and reference it here.

  // Dimensions: 600x400px (maintain consistent sizing)
  // Format: PNG with transparent background
  // Naming: Match schema type names (e.g., hero.png, splitImage.png)

  // options: {
  //   insertMenu: {
  //     views: [
  //       {
  //         name: "grid",
  //         previewImageUrl: schemaType => `/block-previews/${schemaType}.png`,
  //       },
  //     ],
  //   },
  // },
});
