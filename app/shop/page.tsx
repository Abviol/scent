"use client";

import { FiltersDropdown } from "@/components/filterDropdown";
import ProductCard from "@/components/productCard";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { MOCK_SHOP_FILTERS, PRODUCTS } from "@/lib/data";
import { FilterState, ProductType } from "@/lib/types";
import { ChevronDown, Frown } from "lucide-react";
import { useState } from "react";

// const getProducts = async (): Promise<ProductType[]> => {
//    let popularProducts: ProductType[] = [];
//    for (let i = 0; i < 10; i++) {
//       popularProducts = [...popularProducts, ...PRODUCTS];
//    }
//    return popularProducts;
// };

interface ShopPageProps {
	params: Promise<{ id: string }>;
}

/**
 * Main Shop Page Component
 * Renders the product grid, sidebar filters, and active filter tags.
 */
export default function ShopPage({ params }: ShopPageProps) {
	// const products = await getProducts();
	const products = PRODUCTS;

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "" },
	];

	/**
	 * Centralized Filter State
	 * - priceRange: A tuple of [min, max]
	 * - others: Arrays of selected strings
	 */
	const [filters, setFilters] = useState<FilterState>({
		priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
		brands: [],
		categories: [],
		volumes: [],
		markers: [],
		concentrations: [],
	});

	/**
	 * Updates a specific filter category by key.
	 * Used primarily by the Sidebar Dropdowns.
	 */
	const updateFilter = (key: keyof FilterState, value: any) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	/**
	 * Handles removal of a specific active tag.
	 * - If removing Price: Resets range to default [0, max].
	 * - If removing Array Item: Filters that specific value out of the array.
	 */
	const removeFilter = (
		id: keyof FilterState,
		valueToRemove: string | number,
	) => {
		// Special handling for Price Range since it's not an array of items
		if (id === "priceRange") {
			setFilters((prev) => ({
				...prev,
				priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
			}));
			return;
		}

		// Standard handling for checkbox arrays (Brands, Volume, etc.)
		setFilters((prev) => ({
			...prev,
			[id]: (prev[id] as string[]).filter((v) => v !== valueToRemove),
		}));
	};

	/**
	 * Resets all filters to their initial empty/default state.
	 */
	const resetFilters = () =>
		setFilters({
			priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
			brands: [],
			categories: [],
			volumes: [],
			markers: [],
			concentrations: [],
		});

	// Generate the list of active tags to display above the grid
	const activeTags = convertFilterToTags(filters);

	return (
		<div className="mt-14 mb-20">
			{/* Page Header & Breadcrumbs */}
			<div className="grid grid-cols-[300px_1fr] gap-x-8 mb-10">
				<h1 className="text-[40px] font-semibold">Shop</h1>
				<div className="flex flex-row justify-between items-center">
					<Breadcrumbs items={breadcrumbsItems} />
					<span className="inline-flex items-center">
						Sort: By default <ChevronDown size={16} />
					</span>
				</div>
			</div>

			<div className="grid grid-cols-[300px_1fr] gap-x-8">
				{/* --- SIDEBAR FILTERS SECTION --- */}
				<ShopSidebar
					filters={filters}
					onUpdate={updateFilter}
					onReset={resetFilters}
					hasActiveFilters={activeTags.length > 0}
				/>

				{/* --- MAIN CONTENT AREA --- */}
				<div className="">
					{/* Active Filter Tags Display */}
					<ActiveFilters
						tags={activeTags}
						onRemove={removeFilter}
						onClear={resetFilters}
					/>

					{/* Product Grid */}
					<ProductGrid products={products} />

					<div className="mt-20 flex flex-row flex-1 justify-center">
						<Button
							size="lg"
							variant="outline"
							className="h-[60px] w-full max-w-[400px] text-xl font-medium p-3 rounded-md"
						>
							More Products
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

// Sub-components

// --- 1. SIDEBAR COMPONENT ---

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

// --- 2. ACTIVE FILTERS COMPONENT ---

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

// --- 3. PRODUCT GRID COMPONENT ---

interface ProductGridProps {
	products: ProductType[];
}

/**
 * ProductGrid
 * Responsible for rendering the list of products or the "Empty State"
 */
export function ProductGrid({ products }: ProductGridProps) {
	// Empty State: Crucial for UX when filters are too restrictive
	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
				<Frown className="h-10 w-10 mb-4 opacity-50" />
				<h3 className="text-lg font-semibold">No products found</h3>
				<p>Try adjusting your filters or search criteria.</p>
			</div>
		);
	}

	// Render the Grid
	return (
		<div className="grid grid-cols-4 gap-x-5 gap-y-12">
			{products.map((prod, i) => (
				<ProductCard
					// Ideally use prod.id for key if available, fallback to composite title+index
					key={prod.title + i}
					title={prod.title}
					productId={prod.id}
					imageUrl={prod.imageUrls[0]}
					markers={prod.markers}
					// Accessing the first variant for price/volume display logic
					wishlist={prod.variants[0].wishlist}
					volume={prod.variants[0].volume}
					rating={prod.rating}
					price={prod.variants[0].price}
				/>
			))}
		</div>
	);
}

// --- HELPER FUNCTIONS ---

// Define the Tag type for clarity
type FilterTag = {
	id: keyof FilterState;
	value: string | number;
	label: string;
};

/**
 * Generates a specific tag for the Price Range.
 * Returns null if the price is at the default [0, max] state.
 */
function getPriceTag(priceRange: [number, number]): FilterTag | null {
	const [min, max] = priceRange;
	const defaultMin = 0;
	const defaultMax = MOCK_SHOP_FILTERS.priceRange[1];

	if (min === defaultMin && max === defaultMax) return null;

	const from = min !== defaultMin ? `from ${min}` : "";
	const to = max !== defaultMax ? `to ${max}` : "";

	return {
		id: "priceRange",
		value: "price_reset", // Value acts as a flag for the remove handler
		label: `${from} ${to} €`.trim(),
	};
}

/**
 * Iterates through all array-based filters (Brands, Volumes, etc.)
 * and converts selected values into Tag objects.
 */
function getArrayTags(filters: FilterState): FilterTag[] {
	const tags: FilterTag[] = [];

	(Object.keys(filters) as Array<keyof FilterState>).forEach((key) => {
		if (key === "priceRange") return;

		const values = filters[key];

		if (Array.isArray(values) && values.length > 0) {
			values.forEach((val) => {
				tags.push({
					id: key,
					value: val,
					label: key === "volumes" ? `${val} ml` : val.toString(),
				});
			});
		}
	});

	return tags;
}

/**
 * Main orchestrator to get all active filter tags.
 * Combines the Price tag (if active) with array tags.
 */
function convertFilterToTags(filters: FilterState): FilterTag[] {
	const priceTag = getPriceTag(filters.priceRange);
	const arrayTags = getArrayTags(filters);

	return priceTag ? [priceTag, ...arrayTags] : arrayTags;
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
