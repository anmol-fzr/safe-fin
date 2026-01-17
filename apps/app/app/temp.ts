export const mockDatabase = {
	richContent: [
		{
			id: 1001,
			title: "Full Stack Mastery 2026",
			short_desc: "Become a zero-to-hero developer.",
			long_desc:
				"<p>Comprehensive guide to modern web development including React, Node, and SQL.</p>",
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 1002,
			title: "Introduction to HTML & CSS",
			short_desc: "Building blocks of the web.",
			long_desc:
				"<p>Learn the semantic structure of the web and how to style it.</p>",
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 1003,
			title: "JavaScript Fundamentals",
			short_desc: "The language of the web.",
			long_desc: "<p>Variables, Loops, Functions, and ES6+ syntax.</p>",
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 1004,
			title: "React Hooks Deep Dive",
			short_desc: "Managing state effectively.",
			long_desc: "<p>useEffect, useState, and custom hooks explained.</p>",
			created_at: 1735699600,
			updated_at: 1735699600,
		},
		{
			id: 1005,
			title: "Backend with Go",
			short_desc: "High performance services.",
			long_desc:
				"<p>Introduction to Golang, Goroutines, and Gin framework.</p>",
			created_at: 1735699600,
			updated_at: 1735699600,
		},
		{
			id: 1006,
			title: "Database Design",
			short_desc: "SQL vs NoSQL.",
			long_desc: "<p>Normalization, indexing, and query optimization.</p>",
			created_at: 1735699600,
			updated_at: 1735699600,
		},
		{
			id: 1007,
			title: "Quiz: CSS Selectors",
			short_desc: "Test your styling skills.",
			long_desc: "<p>Select the correct specificities.</p>",
			created_at: 1735699600,
			updated_at: 1735699600,
		},
		{
			id: 1008,
			title: "Project: Build a To-Do App",
			short_desc: "Practical application.",
			long_desc: "<p>Combine HTML, CSS, and JS to build a functional app.</p>",
			created_at: 1735699600,
			updated_at: 1735699600,
		},
	],

	// 2. RichContentItem: Specific large content blocks (e.g., JSON blobs or raw markdown)
	richContentItems: [
		{
			id: 501,
			content: "# Welcome to the Course\nLet's get started...",
			content_json:
				'{"type":"doc","content":[{"type":"heading","attrs":{"level":1},"content":[{"type":"text","text":"Welcome"}]}]}',
		},
		{
			id: 502,
			content: "const a = 10; console.log(a);",
			content_json:
				'{"type":"code_block","language":"javascript","content":"const a = 10;"}',
		},
	],

	// 3. Lesson: The top-level container
	lessons: [
		{
			id: 1,
			content: {
				id: 1001,
				title: "Full Stack Mastery 2026",
				short_desc: "Become a zero-to-hero developer.",
				long_desc:
					"<p>Comprehensive guide to modern web development including React, Node, and SQL.</p>",
				created_at: 1735689600,
				updated_at: 1735689600,
			}, // Links to "Full Stack Mastery 2026"
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
			cover_path:
				"https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg",
		},
		{
			id: 2,
			content: {
				id: 1005,
				title: "Backend with Go",
				short_desc: "High performance services.",
				long_desc:
					"<p>Introduction to Golang, Goroutines, and Gin framework.</p>",
				created_at: 1735699600,
				updated_at: 1735699600,
			}, // Links to "Backend with Go"
			is_published: 0, // Draft mode
			created_at: 1735789600,
			updated_at: 1735789600,
			cover_path:
				"https://ilarge.lisimg.com/image/26282582/1118full-iman-vellani.jpg",
		},
	],

	// 4. Level: Grouping within a Lesson (Linked to Lesson)
	levels: [
		{
			id: 10,
			lesson_id: 1,
			title: "Phase 1: Frontend Foundation",
			order: 1,
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 11,
			lesson_id: 1,
			title: "Phase 2: React Ecosystem",
			order: 2,
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 12,
			lesson_id: 1,
			title: "Phase 3: Backend Integration",
			order: 3,
			is_published: 0,
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 20,
			lesson_id: 2,
			title: "Golang Basics",
			order: 1,
			is_published: 0,
			created_at: 1735789600,
			updated_at: 1735789600,
		},
	],

	// 5. Module: Actionable units within a Level (Linked to Level & Content)
	modules: [
		{
			id: 201,
			content_id: 1002, // HTML & CSS
			lesson_level_id: 10, // Foundation Phase
			exercise_id: null,
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
			cover_path: "/thumbs/html-css.png",
			point: 50,
			index: 0,
		},
		{
			id: 202,
			content_id: 1003, // JS Fundamentals
			lesson_level_id: 10, // Foundation Phase
			exercise_id: null,
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
			cover_path: "/thumbs/js-yellow.png",
			point: 100,
			index: 1,
		},
		{
			id: 203,
			content: {
				id: 1004,
				title: "React Hooks Deep Dive",
				short_desc: "Managing state effectively.",
				long_desc: "<p>useEffect, useState, and custom hooks explained.</p>",
				created_at: 1735699600,
				updated_at: 1735699600,
			}, // React Hooks
			lesson_level_id: 11, // React Phase
			exercise_id: null,
			is_published: 1,
			created_at: 1735699600,
			updated_at: 1735699600,
			cover_path:
				"https://ilarge.lisimg.com/image/28254022/1118full-iman-vellani.jpg",
			point: 150,
			index: 0,
		},
		{
			id: 204,
			content_id: 1006, // DB Design
			lesson_level_id: 12, // Backend Phase
			exercise_id: null,
			is_published: 0,
			created_at: 1735699600,
			updated_at: 1735699600,
			cover_path:
				"https://ilarge.lisimg.com/image/26282582/1118full-iman-vellani.jpg",
			point: 100,
			index: 0,
		},
	],

	exercises: [
		{
			id: 801,
			content_id: 1007, // CSS Quiz
			lesson_module_id: 201, // Linked to HTML/CSS Module
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
		},
		{
			id: 802,
			content_id: 1008, // To-Do App Project
			lesson_module_id: 202, // Linked to JS Module
			is_published: 1,
			created_at: 1735689600,
			updated_at: 1735689600,
		},
	],
};
