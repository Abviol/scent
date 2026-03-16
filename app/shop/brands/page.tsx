"use server";

import BrandsClientWrapper from "@/components/shop/brands/brandsClientWrapper";
import getBrands from "@/lib/api/brands";
import { BrandGroupType, BrandType } from "@/lib/types";

export default async function BrandsPage() {
	const rawBrands = await getBrands();
	const {brandGroups, uniqueChars} = groupBrands(rawBrands);

	return (
		<BrandsClientWrapper brandGroups={brandGroups} uniqueChars={uniqueChars} />
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