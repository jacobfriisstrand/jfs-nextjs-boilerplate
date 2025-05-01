import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = S =>
  S.list()
    .title("Menu")
    .items([
      S.documentTypeListItem("page").title("Pages"),
      S.documentTypeListItem("faq").title("FAQs"),
      S.divider(),
      S.listItem()
        .id("globalSettings")
        .schemaType("globalSettings")
        .title("Global Settings")
        .child(
          S.editor()
            .id("globalSettings")
            .schemaType("globalSettings")
            .documentId("globalSettings"),
        ),
      ...S.documentTypeListItems().filter(
        item =>
          item.getId()
          && !["page", "faq", "globalSettings"].includes(item.getId()!),
      ),
    ]);
