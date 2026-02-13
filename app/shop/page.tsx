"use client";

import { ActiveFilters } from "@/components/shop/activeFilters";
import { ProductGrid } from "@/components/shop/productGrid";
import { ShopSidebar } from "@/components/shop/shopSidebar";
import Sorting from "@/components/shop/sorting";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { MOCK_SHOP_FILTERS, PRODUCTS } from "@/lib/data";
import { FilterState, FilterTag, FilterValuesType, SortingType } from "@/lib/types";
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

	// Sorting state
	const [sorting, setSorting] = useState<SortingType>({ criteria: "date", order: "DESC"});

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
	const updateFilter = (key: keyof FilterState, value: FilterValuesType) => {
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
					<Sorting criteria={sorting.criteria} order={sorting.order} onChange={(criteria, order) => setSorting({criteria, order})} />
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
							variant="default"
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
