import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: set base to "/<your-repo-name>/" if this deploys to
// https://<username>.github.io/<repo-name>/  (a project page).
// If this repo IS <username>.github.io (a user/org page), leave base as "/".
export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/",
});
