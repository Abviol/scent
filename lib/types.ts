export enum VolumeEnum {
	ML30,
	ML50,
	ML100,
	ML200,
}

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
	volume: VolumeEnum;
  imageUrls: string[];
	price: number;
	discountedPrice: number | undefined;
	wishlist: boolean;
	quantityInStock: number;
}

export type VolumeType = 30 | 50 | 100 | 200 | undefined;

export type MarkerType = "hit" | undefined;

export type AvailabilityType = "available" | "not available" | undefined;
