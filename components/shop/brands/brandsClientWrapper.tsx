"use client";

import { BrandGroupType } from "@/lib/types";
import BrandsAlphabet from "./brandsAlphabet";
import BrandsContent from "./brandsContent";
import { useState } from "react";

interface BrandsClientWrapperProps {
   brandGroups: BrandGroupType[];
   uniqueChars: string[];
}

// Gets data from the parent server component and manages it between Brands Alphabet and Brands Content
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

// Sorts brands groups in alphabetical order
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
