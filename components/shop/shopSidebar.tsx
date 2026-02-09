import { MOCK_SHOP_FILTERS } from "@/lib/data";
import { FiltersDropdown } from "../filterDropdown";
import { Button } from "../ui/button";
import { FilterState } from "@/lib/types";

interface ShopSidebarProps {
	/** Current state of all filters to determine checked/active status */
	filters: FilterState;
	/** Handler to lift state changes back to the parent page */
	onUpdate: (key: keyof FilterState, value: any) => void;
	/** Handler to clear all filters */
	onReset: () => void;
	/** Boolean flag to enable/disable the 'Clear All' button */
	hasActiveFilters: boolean;
}

/**
 * ShopSidebar
 * Renders the stack of filter dropdowns.
 */
export function ShopSidebar({
	filters,
	onUpdate,
	onReset,
	hasActiveFilters,
}: ShopSidebarProps) {
	return (
		<aside className="flex flex-col gap-8">
			{/* Price Range Slider 
             Note: Price is unique as it passes a tuple [min, max] rather than an array of strings 
         */}
			<FiltersDropdown
				isOpen={true}
				id="price"
				title="Price"
				type="range"
				min={MOCK_SHOP_FILTERS.priceRange[0]}
				max={MOCK_SHOP_FILTERS.priceRange[1]}
				rangeValue={filters.priceRange}
				onChange={(id, val) => onUpdate("priceRange", val)}
			/>

			{/* Volume Checkboxes
             Note: Using helper 'toOptions' to append units (e.g., "50" -> "50 ml") 
         */}
			<FiltersDropdown
				isOpen={true}
				id="volume"
				title="Volume"
				type="checkbox"
				options={toOptions(MOCK_SHOP_FILTERS.volumes, " ml")}
				selectedValues={filters.volumes}
				onChange={(id, val) => onUpdate("volumes", val)}
			/>

			{/* Brand Selection */}
			<FiltersDropdown
				isOpen={true}
				id="brands"
				title="Brands"
				type="checkbox"
				options={toOptions(MOCK_SHOP_FILTERS.brands, "")}
				selectedValues={filters.brands}
				onChange={(id, val) => onUpdate("brands", val)}
			/>

			{/* Category Selection */}
			<FiltersDropdown
				id="categories"
				title="Categoies"
				type="checkbox"
				options={toOptions(MOCK_SHOP_FILTERS.categories, "")}
				selectedValues={filters.categories}
				onChange={(id, val) => onUpdate("categories", val)}
			/>

			{/* Markers (e.g., 'New', 'Best Seller') */}
			<FiltersDropdown
				id="markers"
				title="Markers"
				type="checkbox"
				options={toOptions(MOCK_SHOP_FILTERS.markers, "")}
				selectedValues={filters.markers}
				onChange={(id, val) => onUpdate("markers", val)}
			/>

			{/* Concentration (e.g., 'EDP', 'EDT') */}
			<FiltersDropdown
				id="concentrations"
				title="Concentrations"
				type="checkbox"
				options={toOptions(MOCK_SHOP_FILTERS.concentrations, "")}
				selectedValues={filters.concentrations}
				onChange={(id, val) => onUpdate("concentrations", val)}
			/>

			{/* Global Reset Button 
            UX: Scrolls to top to ensure user sees the reset results.
            Disabled visually if no filters are currently active.
         */}
			<Button
				size="lg"
				className="mt-10 mx-auto h-12  w-full max-w-[260px] text-lg"
				onClick={() => {
					onReset();
					window.scrollTo({ top: 0, behavior: "smooth" });
				}}
				disabled={!hasActiveFilters}
			>
				Clear All Filters
			</Button>
		</aside>
	);
}

/**
 * Utility to map raw string arrays to the option format required by Dropdowns.
 * Adds an optional suffix (e.g., " ml") to the label.
 */
function toOptions(items: string[], suffix = "") {
	return items.map((item, i) => ({
		label: `${item}${suffix}`,
		value: item,
		count: i,
	}));
}
