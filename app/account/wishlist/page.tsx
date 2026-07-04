"use server";

import Nav from "@/components/layout/nav";
import { ProductGrid } from "@/components/product-grid";
import Sorting from "@/components/pages/shop/sorting";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { getProducts } from "@/lib/api/products";
import { parseSearchParams } from "@/lib/utils";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface WishlistPageProps {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WishlistPage(props: WishlistPageProps) {
	const searchParams = await props.searchParams;

	const { filters, sorting } = parseSearchParams(searchParams);
	const products = await getProducts({ filters, sorting });

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Wishlist", href: "/account/wishlist" },
	];

	return (
		<>
			<div className="mt-2 mb-14">
				<Nav />
			</div>
			<main className="container mx-auto px-8 mb-40">
				{/* Header */}
				<div className="flex flex-row justify-between items-center mb-16">
					<h1 className="text-[40px] font-semibold leading-12">
						Wishlist
					</h1>
					<Breadcrumbs items={breadcrumbsItems} />
					<Sorting
						criteria={sorting.criteria}
						order={sorting.order}
					/>
				</div>
				{/*  */}

				{/* Product grid */}
				<ProductGrid
					products={products}
					page={filters.page}
					emptyState={
						/* Empty state */
						<div className="my-[120px] flex flex-col justify-center items-center">
							<div className="flex gap-5 items-center mb-8">
								<p className="text-3xl font-semibold text-slate-500">
									The list is empty for now{" "}
								</p>{" "}
								<Search
									color="#697489"
									strokeWidth={2}
									size={28}
								/>{" "}
							</div>
							<p className="text-xl font-semibold text-slate-500 mb-10">
								You will find something you like in the shop!
							</p>
							<Button size="lg" className="px-10" asChild>
								<Link href={"/shop"}>Shop Now</Link>
							</Button>
						</div>
					}
				/>
			</main>
		</>
	);
}
