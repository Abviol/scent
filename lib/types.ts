export interface ProductType {
	id: string;
	code: number;
	title: string;
	imageUrls: string[];
	rating: number;
	reviewsAmount: number;
	type: string;
	tags: string[];
	categories: string[];
	brand: string;
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

export type MarkerType = "hit" | undefined;

export type AvailabilityType = "available" | "not available" | undefined;
export interface FilterState {
	priceRange: [number, number]; // [min, max]
	brands: string[]; // ["Versace", "Dior"]
	categories: string[]; // ["men", "women"]
	volumes: string[]; // ["50 ml", "100 ml"]
	markers: string[]; // ["New", "Sale"]
	concentrations: string[];
}


export interface FilterTag {
	id: keyof FilterState;
	value: string | number;
	label: string;
};

export type SortingOrderType = "ASC" | "DESC";