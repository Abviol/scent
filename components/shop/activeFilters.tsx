import { FilterState, FilterTag } from "@/lib/types";
import { Button } from "../ui/button";
import Tag from "../ui/tag";

interface ActiveFiltersProps {
	/** Array of derived tag objects (label, id, value) */
	tags: FilterTag[];
	/** Handler to remove a specific single tag */
	onRemove: (id: keyof FilterState, value: string | number) => void;
	/** Handler to clear everything */
	onClear: () => void;
}

/**
 * ActiveFilters
 * Displays the row of Tags above the product grid.
 * It handles the visual feedback of what filters are currently applied.
 */
export function ActiveFilters({ tags, onRemove, onClear }: ActiveFiltersProps) {
	if (tags.length === 0) return null;

	return (
		<div className="selected-filters flex flex-row flex-wrap gap-5 mb-6">
			{tags.map((tag, idx) => (
				<Tag
					key={`${tag.id}-${tag.value}`}
					label={tag.label}
					id={tag.id}
					onClick={() => onRemove(tag.id, tag.value)}
				/>
			))}
			<Button onClick={() => onClear()}>Clear All</Button>
		</div>
	);
}