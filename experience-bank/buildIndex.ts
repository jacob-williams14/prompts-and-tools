#!/usr/bin/env bun
/**
 * Bank index renderer (deterministic, no AI).
 *
 * Reads the bank's claims.yaml and writes index.md alongside it — a human-browsable view of the
 * bank grouped by type. The bank lives in the knowledge base at artifacts/contributions/.
 * Regenerate whenever claims change:
 *
 *   bun run buildBankIndex
 *
 * This is a read-only VIEW. claims.yaml is the source of truth.
 */

import { join } from "path";
import { parse } from "yaml";
import { KB } from "../lib/config.js";

type ClaimType = "technical" | "non-technical";

interface Claim {
	id: string;
	type?: ClaimType;
	project?: string;
	domain: string;
	themes?: string[];
	tech?: string[];
	scope?: string;
	strength?: "featured" | "solid" | "filler";
	hook?: boolean;
	keyword_rich?: string;
	plain_language?: string;
}

const SRC = join(KB.CONTRIBUTIONS, "claims.yaml");
const OUT = join(KB.CONTRIBUTIONS, "index.md");

const STRENGTH_ORDER: Record<string, number> = { featured: 0, solid: 1, filler: 2 };
const TYPE_ORDER: ClaimType[] = ["technical", "non-technical"];
const TYPE_LABEL: Record<ClaimType, string> = {
	technical: "Technical",
	"non-technical": "Non-technical",
};

function firstSentence(text: string, maxWords = 22): string {
	const flat = text.replace(/\s+/g, " ").trim();
	const words = flat.split(" ");
	const clipped = words.length > maxWords ? words.slice(0, maxWords).join(" ") + "…" : flat;
	return clipped.replace(/\.…$/, "…").replace(/\.$/, "");
}

const raw = await Bun.file(SRC).text();
const doc = parse(raw) as { meta?: Record<string, unknown>; claims: Claim[] };
const claims = doc.claims ?? [];

// Group by domain, featured-first within each domain.
function groupByDomain(list: Claim[]): Map<string, Claim[]> {
	const byDomain = new Map<string, Claim[]>();
	for (const c of list) {
		const arr = byDomain.get(c.domain) ?? [];
		arr.push(c);
		byDomain.set(c.domain, arr);
	}
	for (const arr of byDomain.values()) {
		arr.sort(
			(a, b) => (STRENGTH_ORDER[a.strength ?? "solid"] ?? 1) - (STRENGTH_ORDER[b.strength ?? "solid"] ?? 1)
		);
	}
	return byDomain;
}

// Group by type first (technical / non-technical), domains nested under each. Map is string-keyed
// because YAML can carry a value outside the ClaimType union (a typo like `type: tech`); those claims
// are surfaced with a warning rather than silently dropped from the index.
const byType = new Map<string, Claim[]>();
for (const c of claims) {
	const t = c.type ?? "technical";
	const arr = byType.get(t) ?? [];
	arr.push(c);
	byType.set(t, arr);
}

// Known types first (in order), then any unrecognized ones — warned, but still rendered.
const knownTypes = TYPE_ORDER.filter((t) => byType.get(t)?.length);
const unknownTypes = [...byType.keys()].filter((t) => !TYPE_ORDER.includes(t as ClaimType));
for (const t of unknownTypes) {
	const ids = byType.get(t)!.map((c) => c.id).join(", ");
	console.warn(
		`⚠️  unrecognized type "${t}" on ${byType.get(t)!.length} claim(s) — expected ${TYPE_ORDER.join(" | ")}: ${ids}`
	);
}
const orderedTypes = [...knownTypes, ...unknownTypes];

const total = claims.length;
const featured = claims.filter((c) => c.strength === "featured").length;
const hooks = claims.filter((c) => c.hook).length;
const domainCount = new Set(claims.map((c) => c.domain)).size;
const typeSummary = orderedTypes.map((t) => `${byType.get(t)!.length} ${t}`).join(" · ");

const lines: string[] = [];
lines.push("# Experience Bank — Index");
lines.push("");
lines.push(
	"> Generated view of `claims.yaml` (the source of truth). Do not edit by hand — run " +
		"`bun run buildBankIndex`. ★ = featured · ⚓ = hook."
);
lines.push("");
lines.push(
	`**${total} claims** across ${domainCount} domains (${typeSummary}) — ${featured} featured, ${hooks} hooks.`
);
lines.push("");

for (const claimType of orderedTypes) {
	const list = byType.get(claimType)!;
	const label = TYPE_ORDER.includes(claimType as ClaimType)
		? TYPE_LABEL[claimType as ClaimType]
		: `${claimType} (unrecognized type)`;
	lines.push(`## ${label} (${list.length})`);
	lines.push("");
	const byDomain = groupByDomain(list);
	for (const domain of [...byDomain.keys()].sort()) {
		const dlist = byDomain.get(domain)!;
		lines.push(`### ${domain} (${dlist.length})`);
		lines.push("");
		for (const c of dlist) {
			const marks = `${c.strength === "featured" ? "★ " : ""}${c.hook ? "⚓ " : ""}`;
			const tech = c.tech && c.tech.length ? `  _(${c.tech.join(", ")})_` : "";
			lines.push(`- ${marks}${firstSentence(c.keyword_rich ?? c.id)}${tech}  \`${c.id}\``);
		}
		lines.push("");
	}
}

// Bun.write auto-creates the parent dir; and reading SRC above already requires it to exist.
await Bun.write(OUT, lines.join("\n"));
console.log(`✅ Wrote ${OUT} — ${total} claims (${typeSummary}).`);
