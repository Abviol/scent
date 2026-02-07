"use client";

import ProductCard, { ProductCardOnSaveEvent } from "@/components/productCard";
import { ProductType } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProductsSliderSectionProps {
	title: string;
	products: ProductType[];
}

export function ProductsSliderSection({ products, title }: ProductsSliderSectionProps) {
	const [swiperInstance, setSwiperInstance] = useState<
		SwiperType | undefined
	>(undefined);

	const handleSave = (e: ProductCardOnSaveEvent) => {
		console.log(
			`${e.wishlist ? "Added to wishlist" : "Removed from wishlist"}`,
			e.productId,
		);
	};

	return (
		<section className="mt-20">
			<div className="flex flex-row justify-between mb-[60px]">
				<h2 className="text-[40px] font-semibold ">{title}</h2>
				<div className="flex flex-row gap-4">
					<button
						aria-label="Next slide"
						className="size-8 flex justify-center items-center"
					>
						<ArrowLeft
							size={28}
							className="text-main hover:text-slate-500 transition-all"
							onClick={() => swiperInstance?.slidePrev()}
						/>
					</button>
					<button
						aria-label="Next slide"
						className="size-8 flex justify-center items-center"
					>
						<ArrowRight
							size={28}
							className="text-main hover:text-slate-500 transition-all"
							onClick={() => swiperInstance?.slideNext()}
						/>
					</button>
				</div>
			</div>

			<Swiper
				slidesPerView={4}
				slidesPerGroup={4}
				spaceBetween={32}
				onSwiper={setSwiperInstance}
			>
				{products.map((prod, i) => (
					<SwiperSlide key={i}>
						<ProductCard
							title={prod.title}
							productId={prod.id}
							imageUrl={prod.imageUrls[0]}
							markers={prod.markers}
							wishlist={prod.wishlist}
							volume={prod.variants[0]}
							rating={prod.rating}
							price={prod.price}
							onSave={handleSave}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
