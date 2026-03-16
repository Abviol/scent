"use client";


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
				onClick={() => onChange("ALL")}
			/>
			{items.map((item) => (
				<AlphabetItem
					key={`char-${item.value}`}
					{...item}
					onClick={onChange}
				/>
			))}
		</div>
	);
}

interface AlphabetItemProps {
	label: string;
	value: string;
	onClick?: (value: string) => void;
}

function AlphabetItem({
	label,
	value,
	onClick = (): void => {},
}: AlphabetItemProps) {
	const handleClick = () => onClick(value);

	return (
		<button
			type="button"
			className="flex justify-center items-center h-8 min-w-8 px-2 py-0.5 rounded-md bg-transparent cursor-pointer hover:bg-accent-light hover:text-accent transition-all"
			onClick={handleClick}
		>
			<span className="text-xl font-semibold">{label}</span>
		</button>
	);
}

// helper functions
function charsToAlphabeItems(chars: string[]): AlphabetItemProps[] {
	const uniqueChars = Array.from(new Set(chars));
	// sort in alphabetic order
	const sortedChars = uniqueChars.sort((a, b) => a.localeCompare(b));

	let hasNumbers = false;
	const items: AlphabetItemProps[] = [];

	sortedChars.forEach((c, _) => {
		const code = c.charCodeAt(0);
		const isNumber = code >= 48 && code <= 57;

		if (isNumber) {
			if (hasNumbers) return;
			hasNumbers = true;
		}
		items.push(convertCharToAlphabetItem(c));
	});

	return items;
}

function convertCharToAlphabetItem(char: string): AlphabetItemProps {
	const charCode = char.charCodeAt(0);
	const isNumber = charCode >= 48 && charCode <= 57;

	return isNumber
		? { label: "0-9", value: "0-9" }
		: { label: char.toUpperCase(), value: char.toUpperCase() };
}
