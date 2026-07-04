"use client";

import { Bookmark } from "lucide-react";
import { useState } from "react";

interface BookmarkButtonProps {
	productId: string;
	wishlist: boolean;
}

export default function BookmarkButton({ productId, wishlist }: BookmarkButtonProps) {
	const [isSaved, setIsSaved] = useState<boolean>(wishlist);
	const handleSave = () => {
		const newSavedStatus = !isSaved;
		setIsSaved(newSavedStatus);
		console.log(
			`${isSaved ? "Added to wishlist" : "Removed from wishlist"}`,
			productId,
		);
	};


	return (
		<button
			aria-label="Add to wishlist"
			title="Add to wishlist"
			role="button"
			onClick={handleSave}
			className="text-foreground"
		>
			{isSaved ? (
				<Bookmark size={24} className="fill-current stroke-current" />
			) : (
				<Bookmark size={24} className="stroke-current" />
			)}
		</button>
	);
}
