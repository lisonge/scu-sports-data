import type { Plugin } from "vite";
import { parse } from "node-html-parser";
import type { HTMLElement } from "node-html-parser";
import fs from "node:fs/promises";

const matchQuery = (query: string) => {
  const usp = new URLSearchParams(query);
  return usp.has("component") && usp.get("component") === "";
};

export type SolidSvgOptions = {};
type ResolvedSolidSvgOptions = {};

export function solidSvg(options: SolidSvgOptions = {}): Plugin {
  let solidPlugin: Plugin;
  return {
    name: "solid-svg",
    enforce: "pre",
    configResolved(config) {
      solidPlugin = config.plugins.find((p) => p.name == "solid");
      if (!solidPlugin) {
        throw new Error("solid plugin not found");
      }
    },
    async load(id) {
      const [path, query = ""] = id.split("?");
      if (!path.endsWith(".svg") || !matchQuery(query)) {
        return;
      }
      const svgText = await fs.readFile(path, "utf-8");

      const svgNode = parse(svgText).firstChild as HTMLElement;
      svgNode.setAttribute("{...props}", "");
      return `export default (props = {}) => ${svgNode.toString()}`;
    },
    async transform(code, id, options) {
      const [path, query = ""] = id.split("?");
      if (path.endsWith(".svg") && matchQuery(query)) {
        const { transform } = solidPlugin;
        if (typeof transform == "function") {
          return transform.call(this, code, `${path}.tsx`, options);
        }
      }
    },
  };
}
