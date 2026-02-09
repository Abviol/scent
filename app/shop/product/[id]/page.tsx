"use server";

import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { ProductType } from "@/lib/types";
import { PRODUCTS } from "@/lib/data";
import ProductInfoSection from "@/components/shop/product/productInfoSection";
import { ProductsSliderSection } from "@/components/shop/product/productsSliderSection";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

// Mimic a DB-request
async function getProduct(id: string): Promise<ProductType> {
	await new Promise((resolve) => setTimeout(resolve, 0));

	return PRODUCTS[0];
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = await getProduct(id);

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: product.title, href: "" },
	];

	return (
		<main className="my-20">
			<div className="mb-15 flex flex-row justify-center">
				<Breadcrumbs items={breadcrumbsItems} />
			</div>

			{/* product info */}
			<ProductInfoSection product={product} />

			{/* similar products */}
			<ProductsSliderSection
				title="Similar Products"
				products={Array.from({ length: 8 }, () => product)}
			/>
			{/* Specially for you products */}
			<ProductsSliderSection
				title="Specially for you"
				products={Array.from({ length: 8 }, () => product)}
			/>
		</main>
	);
}
