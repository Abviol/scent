"use client";

import ProductCard from "@/components/productCard";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { MOCK_SHOP_FILTERS, PRODUCTS } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// const getProducts = async (): Promise<ProductType[]> => {
// 	let popularProducts: ProductType[] = [];

// 	for (let i = 0; i < 10; i++) {
// 		popularProducts = [...popularProducts, ...PRODUCTS];
// 	}

// 	return popularProducts;
// };

interface ShopPageProps {
	params: Promise<{ id: string }>;
}

export default function ShopPage({ params }: ShopPageProps) {
	// const products = await getProducts();
	const products = PRODUCTS;

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "" },
	];

	return (
		<div className="mt-14 mb-20">
			<div className="grid grid-cols-[300px_1fr] gap-x-8 mb-10">
				<h1 className="text-[40px] font-semibold">Shop</h1>
				<div className="flex flex-row justify-between items-center">
					<Breadcrumbs items={breadcrumbsItems} />
					<span className="inline-flex items-center">
						Sort: By default <ChevronDown size={16} />
					</span>
				</div>
			</div>
			<div className="grid grid-cols-[300px_1fr] gap-x-8">
				<div className="flex flex-col gap-8">
				</div>
				<div className="">
					<div className="grid grid-cols-4 gap-x-5 gap-y-12">
						{products.map((prod, i) => (
							<ProductCard
								key={prod.title + i}
								title={prod.title}
								productId={prod.id}
								imageUrl={prod.imageUrls[0]}
								markers={prod.markers}
								wishlist={prod.variants[0].wishlist}
								volume={prod.variants[0].volume}
								rating={prod.rating}
								price={prod.variants[0].price}
							/>
						))}
					</div>
					<div className="mt-20 flex flex-row flex-1 justify-center">
						<Button
							size="lg"
							variant="outline"
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
