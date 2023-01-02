import type { Plugin, ResolvedConfig } from "vite";

export const spa404 = (): Plugin => {
  let viteConfig: ResolvedConfig;
  return {
    name: "spa-404",
    apply: "build",
    enforce: "post",
    configResolved(config) {
      viteConfig = config;
    },
    async generateBundle(options, bundle) {
      for (const [id, chunk] of Object.entries(bundle)) {
        if (chunk.fileName == "index.html" && chunk.type == "asset") {
          this.emitFile({ ...chunk, fileName: "404.html" });
          break;
        }
      }
    },
  };
};
