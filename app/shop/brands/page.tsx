"use client";

import BrandsAlphabet from "@/components/shop/brands/brandsAlphabet";
import BrandsContent from "@/components/shop/brands/brandsContent";

const mixedChars = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '#', '_', 
];

export default function BrandsPage() {

	return (
		<main className="mt-20">
			<div className="mx-auto w-fit mb-60">
				<BrandsAlphabet chars={mixedChars} onChange={(v) => console.log("selected: ", v)} />
			</div>
			<BrandsContent />
		</main>
	);
}
