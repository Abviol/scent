"use client";

/* lib */
import { cn } from "@/lib/utils";

interface BrandsAlphabetProps {
	chars: string[];
	selectedChar: string;
	onChange: (char: string) => void;
}

export default function BrandsAlphabet({
	chars,
	selectedChar,
	onChange,
}: BrandsAlphabetProps) {
	const items: AlphabetItemProps[] = chars.map((c) =>
		convertCharToAlphabetItem(c),
	);

	return (
		<div className="max-w-[800px] flex flex-wrap gap-5 justify-center items-center">
			{/* Reset selection - ALL button */}
			<AlphabetItem
				label="All"
				value="ALL"
				isSelected={selectedChar === "ALL"}
				onClick={() => onChange("ALL")}
			/>
			{items.map((item) => (
				<AlphabetItem
					key={`char-${item.value}`}
					{...item}
					isSelected={selectedChar === item.value}
					onClick={onChange}
				/>
			))}
		</div>
	);
}

interface AlphabetItemProps {
	label: string;
	value: string;
	isSelected?: boolean;
	onClick?: (value: string) => void;
}

function AlphabetItem({
	label,
	value,
	isSelected = false,
	onClick = (): void => {},
}: AlphabetItemProps) {
	const handleClick = () => onClick(value);

	return (
		<button
			type="button"
			className={cn(
				"flex justify-center items-center h-8 min-w-8 px-2 py-0.5 rounded-md cursor-pointer hover:bg-accent-light hover:text-accent transition-all",
				isSelected ? "bg-accent-light text-accent" : "bg-transparent",
			)}
			onClick={handleClick}
		>
			<span className="text-xl font-semibold">{label}</span>
		</button>
	);
}

// helper functions
function convertCharToAlphabetItem(char: string): AlphabetItemProps {
	const charCode = char.charCodeAt(0);
	const isNumber = charCode >= 48 && charCode <= 57;

	return isNumber
		? { label: "0-9", value: "0-9" }
		: { label: char.toUpperCase(), value: char.toUpperCase() };
}
