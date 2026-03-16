"use server";

import BrandsAlphabet from "@/components/shop/brands/brandsAlphabet";
import BrandsContent from "@/components/shop/brands/brandsContent";
import getBrands from "@/lib/api/brands";
import { BrandGroupType, BrandType } from "@/lib/types";

interface BrandsPageProps {
	searchParams: {[key: string]: string | string[] | undefined};
}

export default async function BrandsPage({ searchParams }: BrandsPageProps) {
	// const [selectedChar, setSelectedChar] = useState<string>("ALL");
	const params = await searchParams;
	const selectedChar = typeof params.char === 'string' ? params.char : "ALL";
	const rawBrands = await getBrands();
	const {brandGroups, uniqueChars} = groupBrands(rawBrands);

	return (
		<main className="mt-20">
			<div className="mx-auto w-fit mb-30">
				<BrandsAlphabet chars={uniqueChars.sort((a, b) => a.localeCompare(b))} selectedChar={selectedChar} />
			</div>
			<div className="mb-28">
				<BrandsContent brandGroups={sortBrandGroups(brandGroups)} selectedChar={selectedChar} />
			</div>
		</main>
	);
}

// ===== HELPER FUNCTIONS =====

// Groups brand by the first char
function groupBrands(brands: BrandType[]) {
	const uniqueChars: string[] = []; // For tracing the appeared uniqueChars
	const brandGroups: BrandGroupType[] = [];

	brands.forEach((b) => {
		// The first char of the Brand name
		const firstLetter = b.name[0].toUpperCase();
      const char = firstLetter >= '0' && firstLetter <= '9' ? "0-9" : firstLetter;
		// if the char didn't appear yet
		if (!uniqueChars.includes(char)) {
			uniqueChars.push(char); // register the char
			brandGroups.push({ char, brands: [b] }); // append a new group
		} else {
			const group = brandGroups.filter(
				(group) => group.char === char,
			)[0]; // get the group with the desired char
			const groupIndex = brandGroups.indexOf(group); // get the group's index
			brandGroups[groupIndex].brands.push(b); // append the brand to the group
		}
	});

	return {brandGroups, uniqueChars};
}

// Sorts brands groups in alphabetical order
function sortBrandGroups(
	brandGroups: BrandGroupType[],
): BrandGroupType[] {
	return [...brandGroups]
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
