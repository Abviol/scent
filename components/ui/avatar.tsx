"use client";

import { useState } from "react";
import Image from "next/image";

type AvatarSize = "sm" | "md" | "lg" | "xl";

interface AvatarProps {
	src?: string | null;
	alt?: string;
	size?: AvatarSize;
	className?: string;
	priority?: boolean;
}

const sizeMap = {
	sm: "h-8 w-8 text-xs", // 32px
	md: "h-10 w-10 text-sm", // 40px
	lg: "h-12 w-12 text-base", // 48px
	xl: "h-20 w-20 text-2xl", // 80px
};

export default function Avatar({
	src,
	alt = "User",
	size = "md",
	className = "",
	priority = false,
}: AvatarProps) {
	const [imageError, setImageError] = useState(false);

	const getInitials = (name: string) => {
		return name
			.split(" ")
			.map((n) => n[0])
			.slice(0, 2)
			.join("")
			.toUpperCase();
	};

	return (
		<div
			className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-slate-300 align-middle ${sizeMap[size]} ${className}`}
		>
			{src && !imageError ? (
				<Image
					src={src}
					alt={alt}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover"
					onError={() => setImageError(true)}
					priority={priority}
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center font-medium text-main">
					{getInitials(alt)}
				</div>
			)}
		</div>
	);
}
