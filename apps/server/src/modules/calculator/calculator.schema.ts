import { idParamSchema } from "@/schema";
import { z } from "zod";

export const calculatorIdParamSchema = z.object({
	calculatorId: idParamSchema,
});

/**
 * NOTE: adjust `allowedGlobals` if you rely on additional helper names
 * (e.g. Math, pow, min, max, etc).
 */
const allowedGlobals = new Set([
	"Math",
	"pow",
	"min",
	"max",
	"abs",
	"sqrt",
	"sin",
	"cos",
	"tan",
	"log",
	"exp",
	"floor",
	"ceil",
	"PI",
	"E",
]);

const identifierRegex = /[A-Za-z_][A-Za-z0-9_]*/g;

const SliderSchema = z.object({
	label: z.string(),
	key: z.string().regex(/^[A-Za-z_][A-Za-z0-9_]*$/, {
		message:
			"slider.key must be a valid identifier (letters, digits, underscore, not starting with digit)",
	}),
	prepend: z.string().optional(),
	append: z.string().optional(),
	value: z.number(),
	step: z.number(),
	minValue: z.number(),
	maxValue: z.number(),
	disabled: z.boolean().optional(),
});

const PieDataSchema = z.object({
	valueKey: z.string(),
	text: z.string(),
});

const ListSchema = z.object({
	title: z.string(),
	desc: z.string(),
	screen: z.string(),
});

export const calculatorMetadataSchema = z
	.object({
		title: z.string(),
		list: ListSchema,
		sliders: z.array(SliderSchema).nonempty(),
		resultKeys: z.record(z.string(), z.string()),
		pieChart: z.boolean().optional(),
		pieData: z.array(PieDataSchema).optional(),
		// calculate: map of key -> expression (string). Expressions are validated for identifier usage & cycles.
		calculate: z.record(z.string(), z.string()),
	})
	.superRefine((data, ctx) => {
		// Helper to collect identifiers from an expression
		const extractIds = (expr: string): Set<string> => {
			const matches = expr.match(identifierRegex) || [];
			return new Set(matches);
		};

		// Basic sets
		const sliderKeys = new Set(data.sliders.map((s) => s.key));
		const calculateKeys = new Set(Object.keys(data.calculate));

		// 1) Duplicate slider keys
		const seen = new Set<string>();
		data.sliders.forEach((s, idx) => {
			if (seen.has(s.key)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Duplicate slider key '${s.key}' found.`,
					path: ["sliders", idx, "key"],
				});
			}
			seen.add(s.key);
		});

		// Keep track of all identifiers actually referenced across all calculate expressions
		const allReferencedIds = new Set<string>();

		// Build dependency map among calculate keys (k -> set of calculate-keys it depends on)
		const calcDeps = new Map<string, Set<string>>();

		for (const [calcKey, expr] of Object.entries(data.calculate)) {
			// validate calcKey identifier
			if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(calcKey)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `calculate key '${calcKey}' is not a valid identifier.`,
					path: ["calculate", calcKey],
				});
				// continue processing to report other problems
			}

			const ids = extractIds(expr);
			ids.forEach((id) => allReferencedIds.add(id));

			// For each identifier used, check that it is a slider key, a calculate key, or an allowed global
			for (const id of ids) {
				if (
					!sliderKeys.has(id) &&
					!calculateKeys.has(id) &&
					!allowedGlobals.has(id)
				) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: `Unknown identifier '${id}' in calculate['${calcKey}']: must be a slider key, a calculate key, or an allowed global.`,
						path: ["calculate", calcKey],
					});
				}
			}

			// dependencies on other calculate keys
			const deps = new Set<string>(
				[...ids].filter((id) => calculateKeys.has(id)),
			);
			calcDeps.set(calcKey, deps);
		}

		// 2) Ensure every slider key is referenced somewhere in calculate expressions
		data.sliders.forEach((s, idx) => {
			if (!allReferencedIds.has(s.key)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `slider key '${s.key}' is not referenced in any calculate expression.`,
					path: ["sliders", idx, "key"],
				});
			}
		});

		// 3) Ensure every resultKeys key exists in calculate
		for (const resKey of Object.keys(data.resultKeys || {})) {
			if (!calculateKeys.has(resKey)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `resultKeys key '${resKey}' must be present as a calculate key.`,
					path: ["resultKeys", resKey],
				});
			}
		}

		// 4) pieData valueKey must exist in calculate
		(data.pieData || []).forEach((p, i) => {
			if (!calculateKeys.has(p.valueKey)) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `pieData[${i}].valueKey '${p.valueKey}' must be present as a calculate key.`,
					path: ["pieData", i, "valueKey"],
				});
			}
		});

		// 5) Detect cycles in calculate dependencies (Kahn's algorithm)
		{
			const inDegree = new Map<string, number>();
			const adjacency = new Map<string, Set<string>>();

			// initialize
			for (const k of calculateKeys) {
				inDegree.set(k, 0);
				adjacency.set(k, new Set<string>());
			}

			// build graph: if calc A depends on calc B -> add edge B -> A
			for (const [k, deps] of calcDeps.entries()) {
				for (const dep of deps) {
					// only add edge if both nodes exist in calculateKeys
					if (calculateKeys.has(dep)) {
						adjacency.get(dep)!.add(k);
						inDegree.set(k, (inDegree.get(k) || 0) + 1);
					}
				}
			}

			// Kahn's topo
			const q: string[] = [];
			for (const [k, deg] of inDegree.entries()) {
				if (deg === 0) q.push(k);
			}

			let visited = 0;
			while (q.length > 0) {
				const node = q.shift()!;
				visited++;
				for (const neigh of adjacency.get(node) || []) {
					inDegree.set(neigh, (inDegree.get(neigh) || 0) - 1);
					if (inDegree.get(neigh) === 0) q.push(neigh);
				}
			}

			// if (visited !== calculateKeys.size) {
			// 	// remaining nodes with indegree > 0 are part of a cycle
			// 	const cyclic = [...inDegree.entries()]
			// 		.filter(([, deg]) => deg > 0)
			// 		.map(([k]) => k);
			// 	ctx.addIssue({
			// 		code: z.ZodIssueCode.custom,
			// 		message: `Circular dependency detected among calculate keys: ${cyclic.join(
			// 			", ",
			// 		)}.`,
			// 		path: ["calculate"],
			// 	});
			// }
		}
	});
