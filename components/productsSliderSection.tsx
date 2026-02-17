"use client";

import ProductCard from "@/components/productCard";
import { ProductType } from "@/lib/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductsSliderSectionProps {
	title: string;
	products: ProductType[];
	id?: string;
	className?: string;
	titlePosition?: "left" | "center";
}

export function ProductsSliderSection({ products, title, className, id, titlePosition = "left" }: ProductsSliderSectionProps) {
	const [swiperInstance, setSwiperInstance] = useState<
		SwiperType | undefined
	>(undefined);

	return (
		<section id={id || "products"} className={cn("mt-20", className)}>
			<div className={cn("section-container flex flex-row mb-[60px]", 
				titlePosition === "left" ? "justify-between" : "relative justify-center",
 			)}>
				<h2 className="title text-[40px] font-semibold">{title}</h2>
				<div className={cn("nav-buttons flex flex-row gap-4",
					titlePosition === "left" ? "" : "absolute right-0 top-1/2 -translate-y-1/2",
				)}>
					<button
						aria-label="Prev slide"
						className="prev-button size-8 flex justify-center items-center"
					>
						<ArrowLeft
							size={28}
							className="prev-icon text-main hover:text-slate-500 transition-all"
							onClick={() => swiperInstance?.slidePrev()}
						/>
					</button>
					<button
						aria-label="Next slide"
						className="next-button size-8 flex justify-center items-center"
					>
						<ArrowRight
							size={28}
							className="next-icon text-main hover:text-slate-500 transition-all"
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
					<SwiperSlide className="h-full" key={i}>
						<ProductCard
							name={prod.name}
							productId={prod.id}
							imageUrl={prod.imageUrls[0]}
							markers={prod.markers}
							wishlist={prod.variants[0].wishlist}
							volume={prod.variants[0].volume}
							rating={prod.rating}
							price={prod.variants[0].price}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
