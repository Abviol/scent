"use server";

import { ActiveFilters } from "@/components/shop/activeFilters";
import { ProductGrid } from "@/components/shop/productGrid";
import { ShopSidebar } from "@/components/shop/shopSidebar";
import Sorting from "@/components/shop/sorting";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
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
				<div className="flex flex-row justify-between items-center">
					<Breadcrumbs items={breadcrumbsItems} />
					<Sorting
						criteria={sorting.criteria}
						order={sorting.order}
					/>
				</div>
			</div>

			<div className="grid grid-cols-[300px_1fr] gap-x-8">
				{/* --- SIDEBAR FILTERS SECTION --- */}
				<ShopSidebar filters={filters} />

				{/* --- MAIN CONTENT AREA --- */}
				<div className="">
					{/* Active Filter Tags Display */}
					<ActiveFilters filters={filters} />

					{/* Product Grid */}
					<ProductGrid products={products} />

					<div className="mt-20 flex flex-row flex-1 justify-center">
						<Button
							size="lg"
							variant="default"
							className="h-[60px] w-full max-w-[400px] text-xl font-medium p-3 rounded-md"
						>
							More Products
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
