import { Readable } from "stream";
import { SitemapStream, streamToPromise } from "sitemap";

/**
 * Handle API endpoint
 * @param {NextApiRequest} req Next request object
 * @param {NextApiResponse} res Next response object
 */
export default async function handler(req, res) {
    const links = [
        { url: "/", changefreq: "hourly" },
        { url: "/about", changefreq: "hourly" },
        { url: "/contact", changefreq: "hourly" },
    ];

    const stream = new SitemapStream({
        hostname: "https://aleexnl.vercel.app/",
    });

    res.writeHead(200, {
        "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
        Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    res.end(xmlString);
}
