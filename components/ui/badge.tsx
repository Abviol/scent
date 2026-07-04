/* react */
import React from "react";
/* icons */
import { LucideIcon } from "lucide-react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	variant?: "default" | "neutral" | "success" | "warning" | "error" | "mystery";
	icon?: LucideIcon;
}

export default function Badge({
	children,
	variant = "default",
	icon: Icon,
	className = "",
	...props
}: BadgeProps) {
	const baseStyles =
		"inline-flex items-center justify-center h-6 px-2 text-sm leading-7 gap-1.5 rounded-md font-medium align-middle transition-colors border border-transparent";

	const variants = {
		default: "bg-[#FFF5EC] text-[#121729]",
		neutral: "bg-slate-100 text-slate-500", 
		success: "bg-green-100 text-green-600",
		warning: "bg-accent-light text-accent",
		error: "bg-red-50 text-red-600",
      mystery: "bg-[#eee3fd] text-[#b158f6]"
	};

	return (
		<div
			className={`${baseStyles} ${variants[variant]} ${className}`}
			{...props}
		>
			{Icon && <Icon className="w-4 h-4 shrink-0" strokeWidth={2.5} />}

			<span className="text-inherit">{children}</span>
		</div>
	);
}
