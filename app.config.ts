import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import reactRefresh from "@vitejs/plugin-react";
import { createApp } from "vinxi";
import tsConfigPaths from "vite-tsconfig-paths";

export default createApp({
  server: {
    preset: "bun",
    experimental: { asyncContext: true },
  },
  routers: [
    {
      type: "static",
      name: "public",
      dir: "./public",
    },
    {
      type: "http",
      name: "trpc",
      base: "/trpc",
      handler: "./src/trpc/handler.ts",
      target: "server",
      plugins: () => [tsConfigPaths({ projects: ["./tsconfig.json"] })],
    },
    {
      type: "http",
      name: "auth",
      base: "/api/auth",
      handler: "./src/auth/api.ts",
      target: "server",
      plugins: () => [tsConfigPaths({ projects: ["./tsconfig.json"] })],
    },
    {
      type: "spa",
      name: "client",
      handler: "./index.html",
      target: "browser",
      plugins: () => [
        TanStackRouterVite({
          target: "react",
          autoCodeSplitting: true,
          routesDirectory: "./src/routes",
          generatedRouteTree: "./src/routeTree.gen.ts",
        }),
        reactRefresh(),
        tsConfigPaths({ projects: ["./tsconfig.json"] }),
        tailwindcss(),
      ],
    },
  ],
});
