import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AvailabilityType } from "./types";

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
