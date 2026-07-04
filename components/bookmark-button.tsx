"use client";

/* react */
import { useState } from "react";
/* icons */
import { Bookmark } from "lucide-react";

interface BookmarkButtonProps {
	productId: string;
	wishlist: boolean;
}

export default function BookmarkButton({ wishlist }: BookmarkButtonProps) {
	const [isSaved, setIsSaved] = useState<boolean>(wishlist);
	const handleSave = () => {
		const newSavedStatus = !isSaved;
		setIsSaved(newSavedStatus);
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
