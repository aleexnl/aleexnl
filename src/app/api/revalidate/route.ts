import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * On-demand ISR endpoint for GitHub repos cache invalidation.
 *
 * Register this URL as a GitHub webhook (push/star events) with the secret
 * set in the REVALIDATE_SECRET environment variable.
 *
 * curl -X POST https://your-domain.com/api/revalidate \
 *   -H "x-revalidate-secret: <secret>"
 */
export async function POST(request: NextRequest) {
	const secret = request.headers.get("x-revalidate-secret");

	if (!process.env.REVALIDATE_SECRET) {
		return NextResponse.json(
			{ error: "REVALIDATE_SECRET is not configured" },
			{ status: 500 },
		);
	}

	if (secret !== process.env.REVALIDATE_SECRET) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	revalidateTag("github-repos", {});

	return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
