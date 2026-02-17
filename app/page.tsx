"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Nav from "@/components/layout/nav";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import Banner1 from "@/assets/images/banner-1.png";
import Banner2 from "@/assets/images/banner-2.png";
import Banner3 from "@/assets/images/banner-3.png";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
								<Image
									src={Banner1}
									alt="Banner 1"
									className=""
								/>
							</SwiperSlide>
							<SwiperSlide>
								<Image
									src={Banner2}
									alt="Banner 2"
									className=""
								/>
							</SwiperSlide>
							<SwiperSlide>
								<Image
									src={Banner3}
									alt="Banner 3"
									className=""
								/>
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

				</main>
			</div>
			<Footer />
		</>
	);
}
