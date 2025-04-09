"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig, isDev } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { resolve } from "@/sanity/presentation/resolve";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema-types";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/admin",
  // TODO: Change this to the name of the website
  title: "Your Website Name",
  projectId,
  dataset,
  schema,
  plugins: isDev
    ? [
        structureTool({ structure }),
        visionTool({ defaultApiVersion: apiVersion }),
        presentationTool({
          resolve,
          previewUrl: {
            previewMode: {
              enable: "/api/draft-mode/enable",
            },
          },
        }),
      ]
    : [
        structureTool({ structure }),
        presentationTool({
          resolve,
          previewUrl: {
            previewMode: {
              enable: "/api/draft-mode/enable",
            },
          },
        }),
      ],
  document: {
    newDocumentOptions: prev => prev.filter(item =>
      !["globalSettings", "navigation"].includes(item.templateId),
    ),
  },
});
