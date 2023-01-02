import unocss from "unocss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import legacy from "@vitejs/plugin-legacy";
import { solidSvg, spa404 } from "./plugins";

export default defineConfig(({ command }) => {
  const cmdConfig = <T1, T2>(serve: T1, build: T2) => {
    return command == "build" ? build : serve;
  };
  return {
    plugins: [
      solid(),
      solidSvg(),
      unocss(),
      tsconfigPaths(),
      legacy({
        renderLegacyChunks: false,
        modernPolyfills: true,
      }),
      spa404(),
    ],
    server: {
      port: 8051,
      host: `0.0.0.0`,
    },
    build: {
      target: cmdConfig("esnext", "chrome80"),
    },
  };
});
