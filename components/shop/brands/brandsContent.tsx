// "use server";

// import getBrands from "@/lib/api/brands";
import { BRANDS } from "@/lib/data";
import { BrandsType } from "@/lib/types";
import Link from "next/link";

// ===== MAIN COMPONENT =====

// Renders the brand groups
export default function BrandsContent() {
	// const brands = await getBrands();
	const brands = BRANDS;
   const {groupedBrands, chars} = groupBrands(brands);
	const sortedGroupedBrands = sortGroupedBrands(groupedBrands);

	return (
		<div className="px-40 flex flex-col gap-20">
			{sortedGroupedBrands.map((b, i) => (
				<BrandsGroup key={`${b.char}-set`} {...b} />
			))}
		</div>
	);
}

// ===== SUB-COMPONENTS =====

// Brands Group
// Contains a letter and all the brands starting with it
interface BrandsGroupProps {
	char: string;
	brands: BrandsType[];
}
function BrandsGroup({ char, brands }: BrandsGroupProps) {
	return (
		<div className="w-full grid grid-cols-[1fr_5fr] gap-20">
			<div className="">
				<h2 className="text-[48px] leading-6 text-right font-semibold text-accent uppercase">
					{char}
				</h2>
			</div>
			<ul className="grid grid-cols-3 gap-x-8 gap-y-2">
				{brands.map((b, i) => (
					<li key={b.id}>
						<Link href={`/shop?brands=${b.id}`} className="text-xl	 hover:text-accent">{b.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

// ===== HELPER FUNCTIONS =====

// Groups brand by the first char
function groupBrands(brands: BrandsType[]) {
	const chars: string[] = []; // For tracing the appeared chars
	const groupedBrands: BrandsGroupProps[] = [];

	brands.forEach((b) => {
		// The first char of the Brand name
		const firstLetter = b.name[0].toUpperCase();
      const char = firstLetter >= '0' && firstLetter <= '9' ? "0-9" : firstLetter;
		// if the char didn't appear yet
		if (!chars.includes(char)) {
			chars.push(char); // register the char
			groupedBrands.push({ char, brands: [b] }); // append a new group
		} else {
			const group = groupedBrands.filter(
				(group) => group.char === char,
			)[0]; // get the group with the desired char
			const groupIndex = groupedBrands.indexOf(group); // get the group's index
			groupedBrands[groupIndex].brands.push(b); // append the brand to the group
		}
	});

	return {groupedBrands, chars};
}

// Sorts brands groups in alphabetical order
function sortGroupedBrands(
	groupedBrands: BrandsGroupProps[],
): BrandsGroupProps[] {
	return [...groupedBrands]
		.sort((a, b) => {
			if (a.char === "number" || a.char === "0-9") return -1;
			if (b.char === "number" || b.char === "0-9") return 1;

			return a.char.localeCompare(b.char);
		})
		.map((group) => {
			return {
				...group,
				brands: [...group.brands].sort((brandA, brandB) =>
					brandA.name.localeCompare(brandB.name),
				),
			};
		});
}
