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
