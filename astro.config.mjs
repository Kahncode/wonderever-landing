// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
	output: "static",
	integrations: [react()],

	vite: {
		plugins: [tailwindcss()],
		server: {
			allowedHosts: true,
		},
	},

	// Cloudflare adapter removed: this is a static landing page with no dynamic features
	// (no API routes, no SSR, no KV/D1 bindings). Static output pre-optimizes images at
	// build time, avoiding the /_image endpoint issue and simplifying deployment.
	// Cloudflare Pages serves the static dist/ folder as-is from their CDN.
	// adapter: cloudflare(),
});
