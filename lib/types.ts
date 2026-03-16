export interface ProductType {
	id: string;
	code: number;
	name: string;
	imageUrls: string[];
	rating: number;
	reviewsAmount: number;
	type: string;
	tags: string[];
	brand: string;
	gender: GenderType;
	variants: VariantType[];
	description: string | undefined;
	details: Record<string, string | number> | undefined;
	ingredients: string | undefined;
	markers: MarkerType[];
}

export interface VariantType {
	volume: number;
	price: number;
	discountedPrice: number | undefined;
	wishlist: boolean;
	quantityInStock: number;
}

export type GenderType = "men" | "women" | "unisex";

export type MarkerType = "hit" | undefined;

export type AvailabilityType = "available" | "not available" | undefined;

export type FilterValuesType = (string | number)[] | [number, number];
export interface FilterState {
	searchQuery: string;
	priceRange: [number, number]; // [min, max]
	brands: string[]; // ["Versace", "Dior"]
	genders: GenderType[]; // ["men", "women"]
	volumes: string[]; // ["50 ml", "100 ml"]
	markers: string[]; // ["New", "Sale"]
	types: string[]; // ["Eau de Toilette, Eau de Parfum"]
	page: number;
}
export interface FilterTag {
	id: keyof FilterState;
	value: string | number;
	label: string;
}

export type SortingOrderType = "ASC" | "DESC";

export const SORTING_CRITERIAS = [
	"price",
	"name",
	"popularity",
	"date",
] as const;
export type SortingCriteriaType = (typeof SORTING_CRITERIAS)[number];

export interface SortingType {
	criteria: SortingCriteriaType;
	order: SortingOrderType;
}

export interface BrandType {
	name: string;
	id: string;
}

export interface BrandGroupType {
	char: string;
	brands: BrandType[];
}