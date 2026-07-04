"use client";

/* react */
import { useState } from "react";
/* components */
import BrandsAlphabet from "./brands-alphabet";
import BrandsContent from "./brands-content";
/* lib */
import { BrandGroupType } from "@/lib/types";

interface BrandsClientWrapperProps {
   brandGroups: BrandGroupType[];
   uniqueChars: string[];
}

/**
 * Client wrapper that manages the selected alphabet character state,
 * coordinating between the BrandsAlphabet selector and BrandsContent display.
 * @remarks Requires a Client Component — uses useState internally.
 */
export default function BrandsClientWrapper(props: BrandsClientWrapperProps) {
   const [selectedChar, setSelectedChar] = useState<string | "ALL">("ALL");

   return (
         <main className="mt-20">
            <div className="mx-auto w-fit mb-30">
               <BrandsAlphabet chars={props.uniqueChars.sort((a, b) => a.localeCompare(b))} selectedChar={selectedChar} onChange={(char) => setSelectedChar(char)} />
            </div>
            <div className="mb-28">
               <BrandsContent brandGroups={sortBrandGroupsByChar(props.brandGroups)} selectedChar={selectedChar} />
            </div>
         </main>
      );
}

// Sorts brands groups
// in alphabetical order
function sortBrandGroupsByChar(
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
