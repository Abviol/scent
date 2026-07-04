"use client";

/* react*/
import { useState } from "react";
/* components*/
import ProductGallery from "./product-gallery";
import Rating from "@/components/ui/rating";
import BookmarkButton from "@/components/bookmark-button";
import { Button } from "@/components/ui/button";
import { ProdTab, ProdTabList, ProdTabPanel, ProdTabs } from "./product-detail-tabs";
/* lib */
import { ProductType } from "@/lib/types";
import { getAvailability, getAvailabilityClass, getEuro } from "@/lib/utils";

interface ProductInfoSectionProps {
	product: ProductType;
}

export default function ProductInfoSection({
	product,
}: ProductInfoSectionProps) {
	const [selectedVariant, setSelectedVariant] = useState<number>(0);

	const availability = getAvailability(
		product.variants[selectedVariant].quantityInStock,
	);
	const availabilityClass: string = getAvailabilityClass(availability);

	const tabsConfig = [
		product.details
			? {
					title: "Details",
					content: (
						<ul className="flex flex-col gap-3">
							{Object.entries(product.details).map((v, i) => (
								<li key={v[0] + i}>
									<strong className="font-semibold">
										{v[0]}
									</strong>
									:{" "}
									<span className="text-slate-500">
										{v[1]}
									</span>
								</li>
							))}
						</ul>
					),
				}
			: null,
		product.description
			? {
					title: "Description",
					content: (
						<p className="leading-relaxed">{product.description}</p>
					),
				}
			: null,
		product.ingredients
			? {
					title: "Ingredients",
					content: <p>{product.ingredients}</p>,
				}
			: null,
	].filter((item) => item !== null);
	return (
		<section id="product-info">
			<div className="grid grid-cols-[2fr_3fr] gap-x-6 mb-15">
				{/* product gallery */}
				<ProductGallery
					imageUrls={product.imageUrls}
					title={product.name}
				/>
				{/* main info */}
				<div className="w-full flex flex-col gap-y-8">
					<div className="flex flex-row justify-between items-center">
						<h1 className="text-3xl leading-12 font-semibold whitespace-normal">
							{product.name}
						</h1>
						<div className="flex flex-row shrink-0 gap-x-2 ml-3">
							<Rating
								rating={product.rating}
								reviewsAmount={product.reviewsAmount}
							/>
							<BookmarkButton
								productId={product.id}
								wishlist={
									product.variants[selectedVariant].wishlist
								}
							/>
						</div>
					</div>

					<div className="flex flex-row justify-between items-center">
						<span className="text-2xl font-semibold">
							{product.variants[selectedVariant].volume} ml
						</span>
						<div className="flex flex-row gap-x-3">
							{product.variants.map((variant, i) => (
								<button
									key={i}
									onClick={() => setSelectedVariant(i)}
									className={`flex justify-center w-[100px] py-0.5 rounded-sm text-lg font-semibold border-2 ${variant.volume == product.variants[selectedVariant].volume ? "bg-accent text-white border-accent" : "bg-white  border-slate-200 text-foreground hover:bg-slate-200"}`}
								>
									{variant.volume}ml
								</button>
							))}
						</div>
					</div>

					<div className="flex flex-row justify-between">
						<span className="text-lg font-semibold text-slate-500">
							Product code -{" "}
							<span className="text-foreground">
								{product.code}
							</span>
						</span>
						<span
							className={`text-xl font-semibold capitalize leading-7 ${availabilityClass}`}
						>
							{availability}
						</span>
					</div>

					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-5 items-center">
							{product.variants[selectedVariant]
								.discountedPrice ? (
								<>
									<span className="text-4xl text-red-600 font-semibold">
										{getEuro(
											product.variants[selectedVariant]
												.discountedPrice,
										)}
									</span>
									<span className="text-slate-500 text-xl line-through">
										{getEuro(
											product.variants[selectedVariant]
												.price,
										)}
									</span>
								</>
							) : (
								<span className="text-4xl font-semibold">
									{getEuro(
										product.variants[selectedVariant].price,
									)}
								</span>
							)}
						</div>
						<Button
							size="lg"
							className="h-15 w-full max-w-[260px] text-2xl font-semibold"
							disabled={
								product.variants[selectedVariant]
									.quantityInStock == 0
							}
						>
							Buy
						</Button>
					</div>
				</div>
			</div>

			{/* additional info */}
			{tabsConfig.length > 0 && (
				<ProdTabs>
					<ProdTabList>
						{tabsConfig.map((tab, index) => (
							<ProdTab
								key={"tab" + tab.title}
								index={index}
								title={tab.title}
							/>
						))}
					</ProdTabList>
					{tabsConfig.map((tab, index) => (
						<ProdTabPanel
							key={"tabpanel" + tab.title}
							index={index}
						>
							{tab.content}
						</ProdTabPanel>
					))}
				</ProdTabs>
			)}
		</section>
	);
}
