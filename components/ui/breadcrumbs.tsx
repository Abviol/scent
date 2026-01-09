import Link from "next/link";
import { Fragment } from "react";

export interface BreadcrumbItem {
	label: string;
	href: string;
}

export interface BreadcrumbsProps {
	items: BreadcrumbItem[];
	className?: string;
}

export default function Breadcrumbs({
	items,
	className = "",
}: BreadcrumbsProps) {
	return (
		<nav aria-label="Breadcrumb" className={className}>
			<ol className="flex my-text-h4">
				{items.map((item, index) => {
					const isLast = index === items.length - 1;

					return (
						<Fragment key={item.href}>
							<li
								className={
									isLast
										? "text-main" // Dark color for current page (Active)
										: "text-slate-300 hover:text-slate-500 transition-colors" // Light gray for parents
								}
							>
								{isLast ? (
									<span aria-current="page">
										{item.label}
									</span>
								) : (
									<Link href={item.href}>{item.label}</Link>
								)}
							</li>

							{/* Separator: Only show if not the last item */}
							{!isLast && (
								<li
									className="mx-3 text-slate-300 select-none"
									aria-hidden="true"
								>
									/
								</li>
							)}
						</Fragment>
					);
				})}
			</ol>
		</nav>
	);
}
