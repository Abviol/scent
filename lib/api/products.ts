// lib/api/products.ts
import { PRODUCTS } from "@/lib/data";
import { FilterState, ProductType, SortingType } from "@/lib/types";

interface GetProductsParams {
	filters: FilterState;
	sorting: SortingType;
	page?: number;
}

export async function getProducts({ filters, sorting }: GetProductsParams) {
	// 1. Simulate DB Network Delay (Realism)
	await new Promise((resolve) => setTimeout(resolve, 500));

	let results: ProductType[] = [];
   for (let i = 0; i < 10; i++) {
      results = [...results, ...PRODUCTS];
   }

	// --- FILTERING ---

	// 1. Search Query (Optional - if you have a search bar)
	// if (searchQuery) {
	//    results = results.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
	// }

	// 2. Price Range
	// if (filters.priceRange) {
	// 	const [min, max] = filters.priceRange;
	// 	results = results.filter((p) => {
	// 		const price = p.variants[0]?.price || 0;
	// 		return price >= min && price <= max;
	// 	});
	// }

	// // 3. Brands (OR Logic: Show products that match ANY of selected brands)
	// if (filters.brands.length > 0) {
	// 	results = results.filter((p) => filters.brands.includes(p.brand));
	// }

	// // 4. Genders
	// if (filters.genders.length > 0) {
	// 	results = results.filter((p) =>
	// 		filters.genders.includes(p.gender),
	// 	);
	// }

	// // 5. Types (e.g., 'Eau de Toilette', 'Eau de Parfum')
	// if (filters.types.length > 0) {
	// 	results = results.filter((p) =>
	// 		filters.types.includes(p.type),
	// 	);
	// }

	// // 6. Markers (e.g., 'New', 'Sale', 'Bestseller')
	// // Logic: Does the product have AT LEAST ONE of the selected markers?
	// if (filters.markers.length > 0) {
	// 	results = results.filter((p) =>
	// 		p.markers.some((m) => filters.markers.includes(m || "")),
	// 	);
	// }

	// // 7. Volumes (e.g., 50ml, 100ml)
	// // Logic: Does the product have ANY variant with the selected volume?
	// if (filters.volumes.length > 0) {
	// 	results = results.filter((p) =>
	// 		p.variants.some((v) => filters.volumes.includes(v.volume.toString())),
	// 	);
	// }

	// // --- SORTING (The "ORDER BY" Clause) ---

	// const { criteria, order } = sorting;
	// const isAsc = order === "ASC";

	// results.sort((a, b) => {
	// 	switch (criteria) {
	// 		case "price": {
	// 			const priceA = a.variants[0]?.price || 0;
	// 			const priceB = b.variants[0]?.price || 0;
	// 			return isAsc ? priceA - priceB : priceB - priceA;
	// 		}

	// 		case "name": {
	// 			return isAsc
	// 				? a.name.localeCompare(b.name)
	// 				: b.name.localeCompare(a.name);
	// 		}

	// 		case "popularity": {
	// 			// Assuming 'popularity' or 'rating' is a number on your product
	// 			const valA = a.rating || 0;
	// 			const valB = b.rating || 0;
	// 			return isAsc ? valA - valB : valB - valA;
	// 		}

	// 		// case "date": {
	// 		// 	// Assuming 'createdAt' or 'releaseDate' string/date object
	// 		// 	const dateA = new Date(a.createdAt || 0).getTime();
	// 		// 	const dateB = new Date(b.createdAt || 0).getTime();
	// 		// 	return isAsc ? dateA - dateB : dateB - dateA;
	// 		// }

	// 		default:
	// 			return 0;
	// 	}
	// });

	// --- PAGINATION (Optional - The "LIMIT/OFFSET" Clause) ---
	// const pageSize = 12;
	// const startIndex = ((page || 1) - 1) * pageSize;
	// return results.slice(startIndex, startIndex + pageSize);

	return results;
}
