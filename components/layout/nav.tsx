"use client";

/* next.js */
import Link from "next/link";
import { usePathname } from "next/navigation";
/* lib */
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
	{ href: "/shop", text: "Shop" },
	{ href: "/shop/men", text: "Men" },
	{ href: "/shop/women", text: "Women" },
	{ href: "/shop/unisex", text: "Unisex" },
	{ href: "/shop/brands", text: "Brands" },
];

export default function Nav() {
	const currentPath = usePathname();

	return (
		<nav className="w-full flex flex-row justify-center py-3 gap-x-16">
			{NAV_ITEMS.map((item) => {
				const isActive = currentPath === item.href;

				return (
					<Link
						key={item.href}
						href={item.href}
						aria-current={isActive ? "page" : undefined}
						className={cn(
							"relative text-xl font-semibold transition-colors",
							isActive
								? "text-accent after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-accent after:rounded-full after:content-['']"
								: "text-black hover:text-slate-500",
						)}
					>
						{item.text}
					</Link>
				);
			})}
		</nav>
	);
}
