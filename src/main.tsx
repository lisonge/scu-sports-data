/* @refresh reload */
import "normalize.css";
import { render } from "solid-js/web";
import "uno.css";
import App from "./App";

render(
  App,
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
);
