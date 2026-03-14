import { POST } from "../../../../src/app/api/revalidate/route";

vi.mock("next/cache", () => ({
	revalidateTag: vi.fn(),
}));

const { revalidateTag } = await import("next/cache");

function makeRequest(secret: string | null): Request {
	const headers = new Headers();
	if (secret !== null) {
		headers.set("x-revalidate-secret", secret);
	}
	return new Request("http://localhost/api/revalidate", {
		method: "POST",
		headers,
	});
}

describe("POST /api/revalidate", () => {
	const originalSecret = process.env.REVALIDATE_SECRET;

	beforeEach(() => {
		vi.clearAllMocks();
		process.env.REVALIDATE_SECRET = "test-secret";
	});

	afterEach(() => {
		process.env.REVALIDATE_SECRET = originalSecret;
	});

	it("returns 200 and revalidates when secret matches", async () => {
		const request = makeRequest("test-secret");
		const response = await POST(request as never);

		expect(response.status).toBe(200);
		expect(revalidateTag).toHaveBeenCalledWith("github-repos");

		const body = await response.json();
		expect(body.revalidated).toBe(true);
		expect(body.timestamp).toBeTypeOf("number");
	});

	it("returns 401 when secret is wrong", async () => {
		const request = makeRequest("wrong-secret");
		const response = await POST(request as never);

		expect(response.status).toBe(401);
		expect(revalidateTag).not.toHaveBeenCalled();

		const body = await response.json();
		expect(body.error).toBe("Unauthorized");
	});

	it("returns 401 when secret header is missing", async () => {
		const request = makeRequest(null);
		const response = await POST(request as never);

		expect(response.status).toBe(401);
		expect(revalidateTag).not.toHaveBeenCalled();
	});

	it("returns 500 when REVALIDATE_SECRET env var is not set", async () => {
		delete process.env.REVALIDATE_SECRET;

		const request = makeRequest("test-secret");
		const response = await POST(request as never);

		expect(response.status).toBe(500);
		expect(revalidateTag).not.toHaveBeenCalled();

		const body = await response.json();
		expect(body.error).toBeDefined();
	});
});
