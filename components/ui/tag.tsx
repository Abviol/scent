/* react */
import React from "react";
/* icons */
import { X } from "lucide-react";

interface TagProps {
	label: string;
  id: string;
	onClick: (id: string) => void;
}

export default function Tag({ label, id, onClick }: TagProps) {
  const handleClick = () => {
    onClick(id);
  }

	return (
		<div
			role="button"
			onClick={handleClick}
			className="h-9 flex items-center justify-between gap-5 rounded-md bg-accent-light px-3.5 py-2.5 cursor-pointer"
		>
			<span className="font-semibold text-main text-base">{label}</span>
			<div className="flex items-center justify-center text-main hover:text-opacity-75">
				<X size={16} strokeWidth={3} />
			</div>
		</div>
	);
}
