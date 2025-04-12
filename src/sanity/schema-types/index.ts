import type { SchemaTypeDefinition } from "sanity";

import { faqType } from "./components/faq-type";
import { faqsType } from "./components/faqs-type";
import { heroType } from "./components/hero-type";
import { navigationType } from "./components/navigation-type";
import { textAndImageType } from "./components/text-and-image-type";
import { pageBuilderType } from "./pages/page-builder-type";
import { pageType } from "./pages/page-type";
import { globalSettingsType } from "./utilities/global-settings-type";
import { imageFieldType } from "./utilities/image-field-type";
import { linkFieldType } from "./utilities/link-field-type";
import { redirectType } from "./utilities/redirect-type";
import { richTextType } from "./utilities/rich-text-type";
import { seoType } from "./utilities/seo-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    faqType,
    faqsType,
    globalSettingsType,
    heroType,
    imageFieldType,
    linkFieldType,
    navigationType,
    pageBuilderType,
    pageType,
    redirectType,
    richTextType,
    seoType,
    textAndImageType,
  ],
};
