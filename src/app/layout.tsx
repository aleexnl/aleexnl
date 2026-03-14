// Root layout — locale layout at app/[locale]/layout.tsx owns the full HTML shell.
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children as React.ReactElement;
}
