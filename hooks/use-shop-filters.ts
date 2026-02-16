"use client";

import { MOCK_SHOP_FILTERS } from "@/lib/data";
import { FilterState, FilterValuesType, SortingOrderType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

export function useShopFilters() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isPending, startTransition] = useTransition();

	/**
	 * Core Helper: Creates a new URLSearchParams object, modifies it,
	 * and pushes the new URL.
	 */
	const applyUpdate = useCallback(
		(callback: (params: URLSearchParams) => void) => {
			const params = new URLSearchParams(searchParams.toString());
			callback(params);

			const newUrl = `?${params.toString()}`;

			startTransition(() => {
				router.push(newUrl, { scroll: false });
			});
		},
		[searchParams, router],
	);

	const toggleFilter = (key: keyof FilterState, value: string | number) => {
		applyUpdate((params) => {
			const currentValues: FilterValuesType = params.getAll(key);

			// Remove the key entirely first
			params.delete(key);

			if (currentValues.includes(value)) {
				currentValues
					.filter((v) => v !== value)
					.forEach((v) => params.append(key, v.toString()));
			} else if (key === "priceRange" && value === "price_reset") {
				params.delete("minPrice");
				params.delete("maxPrice");
			} else {
				// Re-add all PLUS the new one
				[...currentValues, value].forEach((v) => params.append(key, v.toString()));
			}

			// Reset page on filter change
			params.delete("page");
		});
	};

	// Handle price range
	const setPriceRange = (range: [number, number]) => {
		applyUpdate((params) => {
			params.set("minPrice", range[0].toString());
			params.set("maxPrice", range[1].toString());
			params.delete("page");
		});
	};

	// Handle pagination
	const setPage = (page: number) => {
		applyUpdate((params) => {
			params.set("page", page.toString());
		});
	}

	// Handle search
	const setSearchQuery = (query: string) => {
		applyUpdate((params) => {
			params.set("q", query);
		})
	}

	// Handle sorting
	const setSorting = (criteria: string, order: SortingOrderType) => {
		applyUpdate((params) => {
			params.set("sortBy", criteria);
			params.set("sortOrder", order);
		});
	};

	// Handle reset
	const resetFilters = () => {
		applyUpdate((params) => {
			// Create a list of keys to keep (if any)
			const keysToKeep = ["sortBy", "sortOrder"];

			// Note: convert to array to avoid iterator issues while deleting
			Array.from(params.keys()).forEach((key) => {
				if (!keysToKeep.includes(key)) {
					params.delete(key);
				}
			});
		});
	};

	// Helper to check if a specific filter is active (for UI checkboxes)
	const isFilterActive = (key: string, value: string) => {
		return searchParams.getAll(key).includes(value);
	};

	return {
		isPending, // True while the server is re-rendering the product grid
		toggleFilter, // For Checkboxes
		setPriceRange, // For Slider
		setPage, // For Pagination
		setSorting, // For Sort Dropdown
		setSearchQuery,
		resetFilters, // For "Clear All"
		isFilterActive, // To check checkbox state
		// Return current parsed values for UI sync
		currentPrice: [
			Number(searchParams.get("minPrice")) || 0,
			Number(searchParams.get("maxPrice")) || MOCK_SHOP_FILTERS.priceRange[1], // Replace 1000 with your max
		] as [number, number],
	};
}
