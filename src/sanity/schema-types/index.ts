import type { SchemaTypeDefinition } from "sanity";

import { globalSettingsType } from "@/sanity/schema-types/global-settings-type";
import { faqType } from "@/sanity/schema-types/modules/faq-type";
import { faqsType } from "@/sanity/schema-types/modules/faqs-type";
import { featuresType } from "@/sanity/schema-types/modules/features-type";
import { heroType } from "@/sanity/schema-types/modules/hero-type";
import { navigationType } from "@/sanity/schema-types/modules/navigation-type";
import { textAndImageType } from "@/sanity/schema-types/modules/text-and-image-type";
import { basePageType } from "@/sanity/schema-types/page-templates/base-page-type";
import { homePageType } from "@/sanity/schema-types/page-templates/home-page-type";
import { notFoundPageType } from "@/sanity/schema-types/page-templates/not-found-page-type";
import { pageTypeOneType } from "@/sanity/schema-types/page-templates/page-type-one-type";
import { pageTypeTwoType } from "@/sanity/schema-types/page-templates/page-type-two-type";
import { imageFieldType } from "@/sanity/schema-types/utilities/image-field-type";
import { navigationLinkType } from "@/sanity/schema-types/utilities/navigation-link-type";
import { redirectType } from "@/sanity/schema-types/utilities/redirect-type";
import { richTextType } from "@/sanity/schema-types/utilities/rich-text-type";
import { seoType } from "@/sanity/schema-types/utilities/seo-type";

export const schema: SchemaTypeDefinition[] = [
  // Base types that other types depend on
  basePageType,
  seoType,
  imageFieldType,
  richTextType,

  // Module types
  heroType,
  textAndImageType,
  featuresType,
  faqType,
  faqsType,
  navigationType,

  // Document types
  globalSettingsType,
  pageTypeOneType,
  homePageType,
  pageTypeTwoType,
  notFoundPageType,

  // Utility types
  redirectType,
  navigationLinkType,
];
