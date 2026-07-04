"use server";

/* next.js */
import { notFound } from "next/navigation";
/* components */
import { ActiveFilters } from "@/components/pages/shop/active-filters";
import { ProductGrid } from "@/components/product-grid";
import { ShopSidebar } from "@/components/pages/shop/shop-sidebar";
import Sorting from "@/components/pages/shop/sorting";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
/* lib */
import { getProducts } from "@/lib/api/products";
import { parseSearchParams } from "@/lib/utils";

interface ShopPageProps {
	params: Promise<{ slug?: string[]}>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const ALLOWED_GENDERS = ["men", "women", "unisex"];

/**
 * Main Shop Page Component
 * Renders the product grid, sidebar filters, and active filter tags.
 */
export default async function ShopPage(props: ShopPageProps) {
	const params = await props.params;
	const searchParams = await props.searchParams;

	const pathGender = params.slug?.[0]?.toLowerCase();
	if (pathGender && !ALLOWED_GENDERS.includes(pathGender)) notFound();

	const { filters, sorting } = parseSearchParams(searchParams);

	const products = await getProducts({ filters, sorting, baseGender: pathGender });

	const defaultBreadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: pathGender ? "/shop" : "" },
	];
	const categoryBreadcrumbsItem: BreadcrumbItem[] = pathGender ? [{ label: pathGender, href: ""}]: [];
	const breadcrumbsItems: BreadcrumbItem[] = [...defaultBreadcrumbsItems, ...categoryBreadcrumbsItem]

	return (
		<main className="mt-14 mb-20">
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
		</main>
	);
}
