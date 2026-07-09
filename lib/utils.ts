/* lib */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
	AvailabilityType, CartItemType,
	FilterTag,
	GenderType, ProductType,
	SORTING_CRITERIAS, VariantType,
} from "./types";
import { FilterState, SortingType, SortingCriteriaType } from "@/lib/types";
import { MOCK_SHOP_FILTERS } from "./data";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
* Converts a price from cents to a formatted euro string.
* @param cents - Price in cents
* @returns Formatted string, e.g. "€12.99"
* */
export function getEuro(cents: number): string {
	return new Intl.NumberFormat("en-IE", {
		style: "currency",
		currency: "EUR",
	}).format(cents / 100);
}

/**
* Detects availability based on items quantity.
* @param items_quantity - Items quantity
* @returns Availability type value: "available" of "not_available"
* */
export function getAvailability(items_quantity: number): AvailabilityType {
	if (items_quantity > 0) return "available";
	return "not_available";
}

/**
* Converts AvailabilityType to a Tailwind CSS class
* @params availability - Availability type
* @returns Tailwind CSS styling based on availability
*  */
export function getAvailabilityClass(availability: AvailabilityType): string {
	switch (availability) {
		case "available":
			return "text-accent";
		case "not_available":
			return "text-gray-500";
		default:
			return "";
	}
}

/**
 * Generates a filter tag for the selected price range.
 * Returns null if the range matches the default [0, max] state,
 * indicating no active price filter.
 * @param priceRange - Tuple representing the selected [min, max] price range in cents
 * @returns A FilterTag object if the range is non-default, otherwise null
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
 * Converts all array-based filter selections (e.g. brands, volumes)
 * into a flat list of FilterTag objects, skipping the price range filter.
 * @param filters - The current filter state containing all active filter selections
 * @returns An array of FilterTag objects representing each selected filter value
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
 * @param filters - The current filter state containing all active filter selections
 * @returns An array of FilterTag objects
 */
export function convertFilterToTags(filters: FilterState): FilterTag[] {
	const priceTag = getPriceTag(filters.priceRange);
	const arrayTags = getArrayTags(filters);

	return priceTag ? [priceTag, ...arrayTags] : arrayTags;
}

/**
 * Parses raw URL search parameters into a structured filter and sorting state.
 * Handles type coercion for arrays, numbers, and strings,
 * falling back to default values for missing or invalid parameters.
 * @param params - Raw Next.js search params object from the page props
 * @returns An object containing the parsed FilterState and SortingType
 */
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

	// Helper for strings
	const getString = (key: string, fallback: ""): string => {
		const val = params[key];
		if (typeof val === "string") return val;
		return fallback;
	};

	const filters: FilterState = {
		searchQuery: getString("q", ""),
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

/**
 * Converts a duration in seconds into its days, hours, minutes, and seconds components.
 * @param seconds - Total duration in seconds
 * @returns An object containing the broken-down time components { d, h, m, s }
 */
export function convertSecondsToTime(seconds: number): {
	d: number;
	h: number;
	m: number;
	s: number;
} {
	const d = Math.floor(seconds / (60 * 60 * 24));
	const h = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
	const m = Math.floor((seconds % (60 * 60)) / 60);
	const s = Math.floor(seconds % 60);
	return { d, h, m, s };
}

/**
 * Calculates the time remaining until a given deadline.
 * Returns zeroed components if the deadline has already passed.
 * @param deadline - The target date to count down to
 * @returns An object containing the remaining time as { d, h, m, s }
 */
export function getTimeRemaining(deadline: Date) {
	const totalMilliseconds = deadline.getTime() - Date.now();
	if (totalMilliseconds <= 0) return { d: 0, h: 0, m: 0, s: 0 };
	const totalSeconds = Math.floor(totalMilliseconds / 1000);
	return convertSecondsToTime(totalSeconds);
}

/**
 * Formats a time component as a zero-padded two-digit string.
 * @param time - A non-negative integer representing a time unit (e.g. hours, minutes, seconds)
 * @returns A string padded with a leading zero if the value is less than 10
 */
export function formatTime(time: number): string {
	return time / 10 < 1 ? `0${time}` : time.toString();
}

/**
 * Converts an object of `ProductType` to `CartItemType` object.
 * @param product - The object to convert.
 * @param quantity - Initial quantity.
 * @param variantIndex - The index of the selected variant.
 * @returns An object of `CartItemType`.
 * */
export function convertProductToCartItem(product: ProductType, quantity: number, variantIndex: number): CartItemType {
	return {
		id: product.id,
		imageUrl: product.imageUrls[0],
		name: product.name,
		productCode: product.code,
		quantity: quantity,
		variant: product.variants[variantIndex],
	}
}