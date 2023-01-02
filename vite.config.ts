import unocss from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { solidSvg } from "./plugins";

export default defineConfig(({ command }) => {
  return {
    plugins: [solid(), solidSvg(), unocss(), tsconfigPaths()],
    server: {
      port: 8051,
      host: `0.0.0.0`,
    },
    build: {
      target: "esnext",
    },
  };
});
