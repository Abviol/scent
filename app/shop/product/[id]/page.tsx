"use server";

/* components */
import Breadcrumbs from "@/components/ui/breadcrumbs";
import ProductInfoSection from "@/components/pages/shop/product/product-info-section";
import { ProductsSliderSection } from "@/components/products-slider-section";
/* lib */
import {BreadcrumbsItemType, ProductType} from "@/lib/types";
import { PRODUCTS } from "@/lib/data";

// Mimic a DB-request
async function getProduct(): Promise<ProductType> {
	await new Promise((resolve) => setTimeout(resolve, 0));

	return PRODUCTS[0];
}

export default async function ProductPage() {
	const product = await getProduct();

	const breadcrumbsItems: BreadcrumbsItemType[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: product.name, href: "" },
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
