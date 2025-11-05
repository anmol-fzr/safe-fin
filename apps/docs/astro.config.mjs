// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import mermaid from "astro-mermaid";
import starlightThemeObsidian from "starlight-theme-obsidian";

// https://astro.build/config
export default defineConfig({
	site: "https://anmol-fzr.github.io",
	//base: "/safe-fin",
	integrations: [
		mermaid({
			theme: "forest",
			autoTheme: true,
		}),
		starlight({
			components: {
				Head: "./src/components/starlight/Head.astro",
			},
			plugins: [
				starlightThemeObsidian({
					graph: false,
				}),
			],
			title: "Safefin",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/anmol-fzr/safe-fin",
				},
			],
			sidebar: [
				{
					label: "System Architecture",
					items: [
						{ label: "High-level Architecture", slug: "arch/high-level" },
					],
				},
				{
					label: "Reference",
					autogenerate: { directory: "reference" },
				},
			],
		}),
	],
	vite: {
		ssr: {
			noExternal: ["zod"],
		},
	},
});
