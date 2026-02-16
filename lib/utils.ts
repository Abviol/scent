import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AvailabilityType, FilterTag, GenderType, SORTING_CRITERIAS } from "./types";
import { FilterState, SortingType, SortingCriteriaType } from "@/lib/types";
import { MOCK_SHOP_FILTERS } from "./data";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getEuro(cents: number): string {
	return new Intl.NumberFormat("en-IE", {
		style: "currency",
		currency: "EUR",
	}).format(cents / 100);
}

export function getAvailability(items_quantity: number): AvailabilityType {
	if (items_quantity > 0) return "available";
	return "not available";
}

export function getAvailabilityClass(availability: AvailabilityType): string {
	switch (availability) {
		case "available":
			return "text-accent";
		case "not available":
			return "text-gray-500";
		default:
			return "";
	}
}

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
		value: "price_reset",
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
export function convertFilterToTags(filters: FilterState): FilterTag[] {
	const priceTag = getPriceTag(filters.priceRange);
	const arrayTags = getArrayTags(filters);

	return priceTag ? [priceTag, ...arrayTags] : arrayTags;
}

export function parseSearchParams(params: {
	[key: string]: string | string[] | undefined;
}): { filters: FilterState; sorting: SortingType } {
	// Helper to ensure we always work with arrays, even if param is a string
	const getArray = (key: string): string[] => {
		const value = params[key];
		if (Array.isArray(value)) return value;
		if (typeof value === "string") return [value];
		return [];
	};

	// Helper for numbers
	const getNumber = (key: string, fallback: number): number => {
		const val = params[key];
		if (typeof val === "string" && !isNaN(Number(val))) {
			return Number(val);
		}
		return fallback;
	};

	const filters: FilterState = {
		brands: getArray("brands"),
		genders: getArray("genders") as GenderType[],
		volumes: getArray("volumes"),
		markers: getArray("markers"),
		types: getArray("types"),
		priceRange: [
			getNumber("minPrice", MOCK_SHOP_FILTERS.priceRange[0]),
			getNumber("maxPrice", MOCK_SHOP_FILTERS.priceRange[1]),
		],
		page: getNumber("page", 0),
	};

	const rawSort = typeof params.sortBy === "string" ? params.sortBy : "";
	const isValidSort = (SORTING_CRITERIAS as readonly string[]).includes(
		rawSort,
	);
	const criteria: SortingCriteriaType = isValidSort
		? (rawSort as SortingCriteriaType)
		: "name";

	const sorting: SortingType = {
		criteria,
		order: params.sortOrder === "ASC" ? "ASC" : "DESC",
	};

	return { filters, sorting };
}
