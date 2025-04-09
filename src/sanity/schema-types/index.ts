import type { SchemaTypeDefinition } from "sanity";

import { faqType } from "./faq-type";
import { faqsType } from "./faqs-type";
import { featuresType } from "./features-type";
import { globalSettingsType } from "./global-settings-type";
import { heroType } from "./hero-type";
import { imageFieldType } from "./image-field-type";
import { navigationType } from "./navigation-type";
import { pageBuilderType } from "./page-builder-type";
import { pageType } from "./page-type";
import { redirectType } from "./redirect-type";
import { richTextType } from "./rich-text-type";
import { seoType } from "./seo-type";
import { textAndImageType } from "./text-and-image-type";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    faqType,
    faqsType,
    featuresType,
    globalSettingsType,
    heroType,
    imageFieldType,
    navigationType,
    pageBuilderType,
    pageType,
    redirectType,
    richTextType,
    seoType,
    textAndImageType,
  ],
};
