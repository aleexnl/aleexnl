import { notFound } from "next/navigation";

// Keep unknown paths inside the locale shell and its translated recovery UI.
export default function UnknownPage() {
	notFound();
}
