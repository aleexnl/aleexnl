"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type NavigationItem = { id: string; label: string };

export function Navigation({
	items,
	label,
	menuLabel,
	closeLabel,
	children,
}: {
	items: NavigationItem[];
	label: string;
	menuLabel: string;
	closeLabel: string;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("");
	const toggle = useRef<HTMLButtonElement>(null);
	const navigation = useRef<HTMLElement>(null);
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries)
					if (entry.isIntersecting) setActive(entry.target.id);
			},
			{ rootMargin: "-15% 0px -55% 0px" },
		);
		for (const item of items) {
			const element = document.getElementById(item.id);
			if (element) observer.observe(element);
		}
		return () => observer.disconnect();
	}, [items]);
	useEffect(() => {
		if (!open) return;
		navigation.current?.querySelector<HTMLAnchorElement>("a")?.focus();
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
				toggle.current?.focus();
			}
		};
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [open]);
	return (
		<header className="site-header">
			<div className="shell header-inner">
				<a className="wordmark" href="#top" aria-label="Alejandro Nieto Luque">
					an<span aria-hidden="true">.</span>
				</a>
				<nav
					ref={navigation}
					aria-label={label}
					className={`primary-nav ${open ? "is-open" : ""}`}
					id="primary-navigation"
				>
					{items.map((item) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							aria-current={active === item.id ? "location" : undefined}
							onClick={() => setOpen(false)}
						>
							{item.label}
						</a>
					))}
				</nav>
				<div className="header-controls">
					{children}
					<button
						ref={toggle}
						type="button"
						className="menu-toggle"
						aria-expanded={open}
						aria-controls="primary-navigation"
						onClick={() => setOpen(!open)}
					>
						{open ? closeLabel : menuLabel}
						<span aria-hidden="true">{open ? "−" : "+"}</span>
					</button>
				</div>
			</div>
		</header>
	);
}
