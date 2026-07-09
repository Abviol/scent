"use client";

/* next.js */
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
/* Components */
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Nav from "@/components/layout/nav";
import { Button } from "@/components/ui/button";
import CommentCard from "@/components/comment-card";
import { ProductsSliderSection } from "@/components/products-slider-section";
/* hooks */
import { useCountdown } from "@/hooks/use-countdown";
import { useState } from "react";
/* Images */
import Hero1 from "@/assets/images/home/hero-1.png";
import Hero2 from "@/assets/images/home/hero-2.png";
import Hero3 from "@/assets/images/home/hero-3.png";
import Banner1 from "@/assets/images/home/banner-1.png";
import Banner2 from "@/assets/images/home/banner-2.png";
/* Icons */
import { ArrowLeft, ArrowRight } from "lucide-react";
/* data */
import { HOME_COMMENTS, PRODUCTS } from "@/lib/data";
/* lib */
import { formatTime } from "@/lib/utils";
/* Swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Home() {
	const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
	const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
	const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

	return (
		<>
			<Header />
			<div className="mt-2">
				<Nav />
			</div>
			<div className="container mx-auto mt-12 px-8">
				<main>
					<section id="hero" className="mb-20">
						<Swiper
							spaceBetween={0}
							slidesPerView={1}
							loop={true}
							autoplay={{ delay: 5000 }}
							modules={[Navigation, Pagination, Autoplay]}
							navigation={{
								prevEl: prevEl,
								nextEl: nextEl,
							}}
							pagination={{ clickable: true, el: paginationEl }}
							onBeforeInit={(swiper) => {
								// @ts-expect-error ddd
								swiper.params.navigation.prevEl = prevEl;
								// @ts-expect-error ddd
								swiper.params.navigation.nextEl = nextEl;
								// @ts-expect-error ddd
								swiper.params.pagination.paginationEl =
									paginationEl;
							}}
							className="[&_.swiper-slide>img]:w-full"
						>
							<SwiperSlide>
								<Image src={Hero1} alt="Hero 1" className="" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={Hero2} alt="Hero 2" className="" />
							</SwiperSlide>
							<SwiperSlide>
								<Image src={Hero3} alt="Hero 3" className="" />
							</SwiperSlide>
						</Swiper>

						<div className="mt-5 flex flex-row justify-center gap-3">
							<button
								ref={(node) => setPrevEl(node)}
								className="p-1"
							>
								<ArrowLeft size={16} />
							</button>

							<div
								ref={(node) => setPaginationEl(node)}
								className="flex flex-row flex-0 items-center gap-3 px-3
                  [&_.swiper-pagination-bullet]:size-[5px]! [&_.swiper-pagination-bullet]:bg-foreground!
                "
							></div>

							<button
								ref={(node) => setNextEl(node)}
								className=""
							>
								<ArrowRight size={16} />
							</button>
						</div>
					</section>
					{/* New products section */}
					<ProductsSliderSection
						title="New products"
						id="new-products"
						titlePosition="center"
						products={Array.from(
							{ length: 10 },
							(v, k) => PRODUCTS[(k + 1) % 3],
						)}
					/>
					{/* Brand offers section */}
					<ProductsSliderSection
						title="Brand offers"
						id="brand-offers"
						titlePosition="center"
						products={Array.from(
							{ length: 10 },
							(v, k) => PRODUCTS[k % 3],
						)}
						className="mb-28"
					/>
					{/* Banner section */}
					<section id="banner" className="mb-28">
						<div className="grid grid-cols-2">
							<BannerCard
								imageUrl={Banner1}
								title="Perfumed water “Noir Élégance”"
								caption="50 ml.  for her"
								productLink="/shop/product/111"
								color="#32665A"
								promotionDeadline={
									new Date("2026-06-01T23:59:59Z")
								}
							/>
							<BannerCard
								imageUrl={Banner2}
								title="Perfumed water “Noir Élégance”"
								caption="50 ml.  for her"
								productLink="/shop/product/222"
								color="#86804C"
								promotionDeadline={
									new Date("2026-05-04T23:59:59Z")
								}
							/>
						</div>
					</section>

					{/* Comments section */}
					<section id="comments" className="relative mb-28">
						<h2 className="mb-8 text-center text-[40px] font-semibold">Scent stories</h2>
						<CommentsSlider />
					</section>
				</main>
			</div>
			<Footer />
		</>
	);
}

interface BannerCardProps {
	imageUrl: StaticImageData;
	title: string;
	caption: string;
	productLink: string;
	color: string;
	promotionDeadline: Date;
}

function BannerCard(props: BannerCardProps) {
	const cd = useCountdown(props.promotionDeadline);

	return (
		<div className="">
			<div className="group h-[600px] overflow-hidden" style={{
							background: props.color,
						}}>
				<div className="relative h-[70%] group-hover:h-1/2 transition-all ease-in-out duration-500">
					<Image
						src={props.imageUrl}
						alt={props.title + " banner"}
						className="absolute w-full bottom-0 group-hover:translate-y-[20%] transition-all ease-in-out duration-500"
					/>
				</div>
				<div className="relative h-[30%] overflow-hidden group-hover:h-[50%] transition-all ease-in-out duration-500">
					<div
						className={`relative w-full h-full flex flex-col justify-center items-center backdrop-blur-sm z-10`}
						style={{
							background: `color-mix(in oklab, ${props.color} 52%, transparent)`,
						}}
					>
						<div className="text-white font-semibold">
							<p className="text-2xl mb-5">{props.title}</p>
							<p className="text-lg">{props.caption}</p>
							<div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all ease-in-out opacity-0 group-hover:opacity-100 duration-500">
								<div className="overflow-hidden">
									<Button
										asChild
										className="mt-6 px-8 py-2 h-max! bg-white/10 text-xl font-medium uppercase tracking-wider hover:bg-white/20 transition-colors rounded-sm border border-white/20"
									>
										<Link href={props.productLink}>
											Buy Now
										</Link>
									</Button>
								</div>
							</div>
						</div>
					</div>
					<Image
						src={props.imageUrl}
						alt={props.title + " banner reflected"}
						className="absolute top-0 z-0 w-full rotate-x-180 group-hover:-translate-y-[20%] transition-transform duration-500"
					/>
				</div>
			</div>
			<p className="mt-5 text-center">
				<i>
					&quot;Until the end of the promotion: {cd.d} days {formatTime(cd.h)}:{formatTime(cd.m)}:{formatTime(cd.s)}&quot;
				</i>
			</p>
		</div>
	);
}

function CommentsSlider() {
	return (
		<div className="h-[560px] w-full overflow-hidden relative">
			{/* The animated wrapper */}
			<div className="animate-marquee-up flex flex-col gap-4">
				{[1, 2].map((iteration) => (
					<div key={iteration} className="grid grid-cols-3 gap-8">
						{HOME_COMMENTS.map((c, i) => (
							<CommentCard
								key={`comment-${iteration}-${i}`}
								{...c}
							/>
						))}
					</div>
				))}
			</div>
			{/* gradients */}
			<div className="absolute top-0 h-1/3 w-full bg-linear-to-b from-white to-white/0 z-10 pointer-events-none"></div>
			<div className="absolute bottom-0 h-1/3 w-full bg-linear-to-b from-white/0 to-white z-10 pointer-events-none"></div>
		</div>
	);
}
