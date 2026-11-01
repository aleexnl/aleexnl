import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

// The source contains outlined Manrope 800 glyphs matching the navigation mark.
// No font downloads or image-generation service are needed to regenerate icons.
const source = await readFile(
	new URL("../public/favicon.svg", import.meta.url),
);
const rasterize = (size, maskable = false) => {
	let svg = source.toString();
	if (maskable) {
		// Full-bleed background; keep the mark within the central safe circle.
		svg = svg
			.replace('rx="24"', 'rx="0"')
			.replace(
				'<path class="letters"',
				'<g transform="translate(13 13) scale(.8)"><path class="letters"',
			)
			.replace("</svg>", "</g></svg>");
	}
	return sharp(Buffer.from(svg), { density: 384 })
		.resize(size, size)
		.png()
		.toBuffer();
};

for (const [filename, size, maskable] of [
	["favicon-96x96.png", 96, false],
	["apple-touch-icon.png", 180, true],
	["web-app-manifest-192x192.png", 192, true],
	["web-app-manifest-512x512.png", 512, true],
]) {
	await writeFile(
		new URL(`../public/${filename}`, import.meta.url),
		await rasterize(size, maskable),
	);
}

// ICO directory entries point to embedded PNG frames at native favicon sizes.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map((size) => rasterize(size)));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
	const entry = 6 + index * 16;
	header[entry] = sizes[index];
	header[entry + 1] = sizes[index];
	header.writeUInt16LE(1, entry + 4);
	header.writeUInt16LE(32, entry + 6);
	header.writeUInt32LE(frame.length, entry + 8);
	header.writeUInt32LE(offset, entry + 12);
	offset += frame.length;
});
const ico = Buffer.concat([header, ...frames]);
await writeFile(new URL("../public/favicon.ico", import.meta.url), ico);
// Next.js serves this file by convention; keep both copies identical.
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), ico);
