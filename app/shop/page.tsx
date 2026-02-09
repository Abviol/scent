"use client";

import { FiltersDropdown } from "@/components/filterDropdown";
import ProductCard from "@/components/productCard";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Tag from "@/components/ui/tag";
import { MOCK_SHOP_FILTERS, PRODUCTS } from "@/lib/data";
import { FilterState } from "@/lib/types";
import { ChevronDown } from "lucide-react";
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
				<aside className="flex flex-col gap-8">
					<FiltersDropdown
						isOpen={true}
						id="price"
						title="Price"
						type="range"
						min={MOCK_SHOP_FILTERS.priceRange[0]}
						max={MOCK_SHOP_FILTERS.priceRange[1]}
						rangeValue={filters.priceRange}
						onChange={(id, val) => updateFilter("priceRange", val)}
					/>

					{/* Note: Using helper 'toOptions' to format string arrays into {label, value} */}
					<FiltersDropdown
						isOpen={true}
						id="volume"
						title="Volume"
						type="checkbox"
						options={toOptions(MOCK_SHOP_FILTERS.volumes, " ml")}
						selectedValues={filters.volumes}
						onChange={(id, val) => updateFilter("volumes", val)}
					/>

					<FiltersDropdown
						isOpen={true}
						id="brands"
						title="Brands"
						type="checkbox"
						options={toOptions(MOCK_SHOP_FILTERS.brands, "")}
						selectedValues={filters.brands}
						onChange={(id, val) => updateFilter("brands", val)}
					/>
					<FiltersDropdown
						id="categories"
						title="Categoies"
						type="checkbox"
						options={toOptions(MOCK_SHOP_FILTERS.categories, "")}
						selectedValues={filters.categories}
						onChange={(id, val) => updateFilter("categories", val)}
					/>
					<FiltersDropdown
						id="markers"
						title="Markers"
						type="checkbox"
						options={toOptions(MOCK_SHOP_FILTERS.markers, "")}
						selectedValues={filters.markers}
						onChange={(id, val) => updateFilter("markers", val)}
					/>
					<FiltersDropdown
						id="concentrations"
						title="Concentrations"
						type="checkbox"
						options={toOptions(
							MOCK_SHOP_FILTERS.concentrations,
							"",
						)}
						selectedValues={filters.concentrations}
						onChange={(id, val) =>
							updateFilter("concentrations", val)
						}
					/>

					{/* Sidebar 'Clear All' Button (only clickable if filters exist) */}
					<Button
						size="lg"
						className="mt-10 mx-auto h-12  w-full max-w-[260px] text-lg"
						onClick={() => {
							resetFilters();
							window.scrollTo({ top: 0, behavior: "smooth" });
						}}
						disabled={activeTags.length == 0}
					>
						Clear All Filters
					</Button>
				</aside>

				{/* --- MAIN CONTENT AREA --- */}
				<div className="">
					{/* Active Filter Tags Display */}
					{activeTags.length > 0 && (
						<div className="selected-filters flex flex-row flex-wrap gap-5 mb-6">
							{activeTags.map((tag, idx) => (
								<Tag
									key={`${tag.id}-${tag.value}`}
									label={tag.label}
									id={tag.id}
									onClick={() =>
										removeFilter(tag.id, tag.value)
									}
								/>
							))}
							<Button onClick={() => resetFilters()}>
								Clear All
							</Button>
						</div>
					)}

					{/* Product Grid */}
					<div className="grid grid-cols-4 gap-x-5 gap-y-12">
						{products.map((prod, i) => (
							<ProductCard
								key={prod.title + i}
								title={prod.title}
								productId={prod.id}
								imageUrl={prod.imageUrls[0]}
								markers={prod.markers}
								wishlist={prod.variants[0].wishlist}
								volume={prod.variants[0].volume}
								rating={prod.rating}
								price={prod.variants[0].price}
							/>
						))}
					</div>

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
