"use client";

/* components*/
import { Button } from "../../ui/button";
import Tag from "../../ui/tag";
/* hooks */
import { useShopFilters } from "@/hooks/use-shop-filters";
/* lib */
import { FilterState } from "@/lib/types";
import { convertFilterToTags } from "@/lib/utils";

interface ActiveFiltersProps {
	filters: FilterState;
}

/**
 * Displays the row of Tags above the product grid.
 * It handles the visual feedback of what filters are currently applied.
 */
export function ActiveFilters({ filters }: ActiveFiltersProps) {
	const { toggleFilter, resetFilters } = useShopFilters();

	const tags = convertFilterToTags(filters);

	if (tags.length === 0) return null;

	return (
		<div className="selected-filters flex flex-row flex-wrap gap-5 mb-6">
			{tags.map((tag) => (
				<Tag
					key={`${tag.id}-${tag.value}`}
					label={tag.label}
					id={tag.id}
					onClick={() => toggleFilter(tag.id, tag.value)}
				/>
			))}
			<Button onClick={() => resetFilters()}>Clear All</Button>
		</div>
	);
}