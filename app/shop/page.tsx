"use server";

import { ActiveFilters } from "@/components/shop/activeFilters";
import { ProductGrid } from "@/components/shop/productGrid";
import { ShopSidebar } from "@/components/shop/shopSidebar";
import Sorting from "@/components/shop/sorting";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { getProducts } from "@/lib/api/products";
import { parseSearchParams } from "@/lib/utils";
interface ShopPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/**
 * Main Shop Page Component
 * Renders the product grid, sidebar filters, and active filter tags.
 */
export default async function ShopPage({ searchParams }: ShopPageProps) {
	const resolvedParams = await searchParams;

	const { filters, sorting } = parseSearchParams(resolvedParams);

	const products = await getProducts({ filters, sorting });

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "" },
	];

	return (
		<div className="mt-14 mb-20">
			{/* Page Header & Breadcrumbs */}
			<div className="grid grid-cols-[300px_1fr] gap-x-8 mb-10">
				<h1 className="text-[40px] font-semibold">Shop</h1>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row justify-between items-center">
						<Breadcrumbs items={breadcrumbsItems} />
						<Sorting
							criteria={sorting.criteria}
							order={sorting.order}
						/>
					</div>
					{filters.searchQuery && (
						<p className="text-lg text-center">
							Results for:{" "}
							<span className="text-accent font-medium">
								&#34;{filters.searchQuery}&#34;
							</span>
						</p>
					)}
				</div>
			</div>

			<div className="grid grid-cols-[300px_1fr] gap-x-8">
				{/* --- SIDEBAR FILTERS SECTION --- */}
				<ShopSidebar filters={filters} />

				{/* --- MAIN CONTENT AREA --- */}
				<main className="">
					{/* Active Filter Tags Display */}
					<ActiveFilters filters={filters} />

					{/* Product Grid */}
					<ProductGrid products={products} page={filters.page} />
				</main>
			</div>
		</div>
	);
}
