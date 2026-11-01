import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
	// Social crawlers must receive the requested image locale, independent of cookies.
	if (/^\/(en|es|ca)\/opengraph-image$/.test(request.nextUrl.pathname)) {
		return NextResponse.next();
	}
	return intlMiddleware(request);
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
