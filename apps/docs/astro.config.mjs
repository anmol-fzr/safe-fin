// @ts-check

import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
//import starlightThemeObsidian from "starlight-theme-obsidian";
import starlightBlog from "starlight-blog";

// https://astro.build/config
export default defineConfig({
	site: "https://safe-fin-docs.vercel.app",
	integrations: [
		starlight({
			customCss: ["./src/styles/index.css"],
			plugins: [
				starlightBlog({
					postCount: 3,
					recentPostCount: 3,
					metrics: {
						readingTime: true,
					},
					authors: {
						anmol: {
							name: "Anmol",
							title: "Engineer",
							picture:
								"https://0.gravatar.com/avatar/5a2e7a6bec3c4aa2f1a2f5cde91bc18e302dfe2025ada9744232367972114187",
							url: "https://linkedin.com/in/anmol-fzr",
						},
						gagan: {
							name: "Gagandeep",
							title: "Product Designer",
							picture:
								"https://media.licdn.com/dms/image/v2/D5635AQEhMeFzqBWcvw/profile-framedphoto-shrink_800_800/B56ZfwBXWYG0Ak-/0/1752078579440?e=1767351600&v=beta&t=xGz2AhnavbhWd6BQW1vSxNpIo5lQQ5ysoN5-kTTQLHA",
							url: "https://linkedin.com/in/anmol-fzr",
						},
					},
				}),
				// starlightThemeObsidian({
				// 	graph: false,
				// }),
			],
			title: "Safefin",
			favicon:
				"https://framerusercontent.com/images/0TroAyVnaapml9MmvY5V7XXrQPo.png",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/anmol-fzr/safe-fin",
				},
			],
			sidebar: [
				{
					label: "Guides",
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: "Example Guide", slug: "guides/example" },
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
