import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AvailabilityType, VolumeEnum, VolumeType } from "./types";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/* 
  @param vol volume enum value
  Converts volume enum to its numeric value. 
*/
export function volEnumToNumber(vol: VolumeEnum): VolumeType {
	switch (vol) {
		case 0:
			return 30;
		case 1:
			return 50;
		case 2:
			return 100;
		case 3:
			return 200;
		default:
			return undefined;
	}
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
