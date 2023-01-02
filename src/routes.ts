import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("./pages/Home")),
  },
  {
    path: "/search",
    component: lazy(() => import("./pages/Search")),
  },
  {
    // /paper-preview/1/3c27b3a2b0497be7
    path: "/paper-preview/:id/:hash",
    component: lazy(() => import("./pages/PaperPreview")),
  },
  {
    path: "**",
    component: lazy(() => import("./errors/404Page")),
  },
];
