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
// 	let popularProducts: ProductType[] = [];

// 	for (let i = 0; i < 10; i++) {
// 		popularProducts = [...popularProducts, ...PRODUCTS];
// 	}

// 	return popularProducts;
// };

interface ShopPageProps {
	params: Promise<{ id: string }>;
}

export default function ShopPage({ params }: ShopPageProps) {
	// const products = await getProducts();
	const products = PRODUCTS;

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "" },
	];

	const [filters, setFilters] = useState<FilterState>({
		priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
		brands: [],
		categories: [],
		volumes: [],
		markers: [],
		concentrations: [],
	});

	const updateFilter = (key: keyof FilterState, value: any) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	const removeFilter = (
		id: keyof FilterState,
		valueToRemove: string | number,
	) => {
		if (id === "priceRange") {
			setFilters((prev) => ({
				...prev,
				priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
			}));
			return;
		}

		setFilters((prev) => ({
			...prev,
			[id]: (prev[id] as string[]).filter((v) => v !== valueToRemove),
		}));
	};

	const resetFilters = () =>
		setFilters({
			priceRange: [0, MOCK_SHOP_FILTERS.priceRange[1]],
			brands: [],
			categories: [],
			volumes: [],
			markers: [],
			concentrations: [],
		});

	const activeTags = convertFilterToTags(filters);

	return (
		<div className="mt-14 mb-20">
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
				<div className="flex flex-col gap-8">
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
				</div>
				<div className="">
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

// Define the Tag type for clarity
type FilterTag = {
	id: keyof FilterState;
	value: string | number;
	label: string;
};

function getPriceTag(priceRange: [number, number]): FilterTag | null {
	const [min, max] = priceRange;
	const defaultMin = 0;
	const defaultMax = MOCK_SHOP_FILTERS.priceRange[1];

	if (min === defaultMin && max === defaultMax) return null;

	const from = min !== defaultMin ? `from ${min}` : "";
	const to = max !== defaultMax ? `to ${max}` : "";

	return {
		id: "priceRange",
		value: "price_reset",
		label: `${from} ${to} €`.trim(),
	};
}

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

function convertFilterToTags(filters: FilterState): FilterTag[] {
	const priceTag = getPriceTag(filters.priceRange);
	const arrayTags = getArrayTags(filters);

	return priceTag ? [priceTag, ...arrayTags] : arrayTags;
}


function toOptions(items: string[], suffix = "") {
	return items.map((item, i) => ({
		label: `${item}${suffix}`,
		value: item,
		count: i,
	}));
}
