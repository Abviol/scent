import { BrandGroupType } from "@/lib/types";
import Link from "next/link";

// ===== MAIN COMPONENT =====

// Renders the brand groups
interface BrandsContentProps {
	selectedChar: string;
	brandGroups: BrandGroupType[];
}
export default function BrandsContent({ selectedChar = "ALL", brandGroups }: BrandsContentProps) {
	const groupsToShow = brandGroups.filter((gr) => selectedChar === "ALL" ? true : gr.char === selectedChar);
	
	return (
		<div className="px-40 flex flex-col gap-20">
			{groupsToShow.map((b, i) => (
				<BrandsGroup key={`${b.char}-set`} {...b} />
			))}
		</div>
	);
}

// ===== SUB-COMPONENTS =====

// Brands Group
// Contains a letter and all the brands starting with it
function BrandsGroup({ char, brands }: BrandGroupType) {
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
						<Link href={`/shop?brands=${b.id}`} className="text-xl hover:text-accent">{b.name}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

