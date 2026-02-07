export interface ProductType {
	id: string;
	code: number;
	title: string;
	rating: number;
	reviewsAmount: number;
	type: string;
	tags: string[];
	categories: string[];
	brand: string;
	variants: VariantType[];
	description: string;
	details: Record<string, string | number>;
	ingredients: string;
	markers: MarkerType[];
}

export interface VariantType {
	volume: number;
  imageUrls: string[];
	price: number;
	discountedPrice: number | undefined;
	wishlist: boolean;
	quantityInStock: number;
}

export type MarkerType = "hit" | undefined;

export type AvailabilityType = "available" | "not available" | undefined;
