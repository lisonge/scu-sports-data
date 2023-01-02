import { Router, useRoutes } from "@solidjs/router";
import { routes } from "./routes";

export default function App() {
  const Route = useRoutes(routes);

  return (
    <Router>
      <Route />
    </Router>
  );
}
