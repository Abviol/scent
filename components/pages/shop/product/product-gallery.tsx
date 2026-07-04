"use client";

/* react */
import { ReactNode, useState } from "react";
/* next.js*/
import Image from "next/image";
/* icons */
import { ChevronDown, ChevronUp } from "lucide-react";
/* swiper */
import { Swiper, SwiperSlide } from "swiper/react";
import { type Swiper as SwiperType } from "swiper";
import { Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";

interface ProductGalleryProps {
	imageUrls: string[];
	title: string;
}

export default function ProductGallery({
	imageUrls,
	title,
}: ProductGalleryProps) {
	const [activeImageIdx, setActiveImageIdx] = useState(0);
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(
		null,
	);

	const [slideStatus, setSlideStatus] = useState({
		isBeginning: true,
		isEnd: false,
	});

	if (!imageUrls?.length) return null;
	
	const handleSlideChange = (swiper: SwiperType) => {
		setSlideStatus({
			isBeginning: swiper.isBeginning,
			isEnd: swiper.isEnd,
		});
	};

	return (
		<div className="grid grid-cols-[72px_1fr] gap-2 h-[500px]">
			<div className="min-h-0 flex flex-col h-full w-full gap-2">
				{/* Up Button */}
				<NavButton
					onClick={() => swiperInstance?.slidePrev()}
					ariaLabel="Previous thumbnail"
					disabled={slideStatus.isBeginning}
				>
					<ChevronUp size={16} color="currentColor" />
				</NavButton>

				<div className="min-h-0 max-h-[430px] overflow-hidden">
					<Swiper
						direction="vertical"
						spaceBetween={8}
						slidesPerView={"auto"}
						onSwiper={(swiper) => {
							setSwiperInstance(swiper);
							handleSlideChange(swiper);
						}}
						onSlideChange={handleSlideChange} 
						modules={[Mousewheel, Keyboard]}
						mousewheel={true}
						className="h-full w-full"
						keyboard={{enabled: true}}
						
					>
						{imageUrls.map((img, index) => (
							<SwiperSlide
								key={`${img} ${index}`}
								className="h-auto! w-full!"
							>
								<button
									onClick={() => setActiveImageIdx(index)}
									className={`relative aspect-square w-full overflow-hidden rounded-md border transition-all ${
										activeImageIdx === index
											? "border-accent border-2"
											: "opacity-70 hover:opacity-100 border-transparent"
									}`}
								>
									<Image
										src={img}
										alt={`${title} thumbnail ${index}`}
										fill
										className="object-contain"
									/>
								</button>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* Down Button */}
				<NavButton
					onClick={() => swiperInstance?.slideNext()}	 
					ariaLabel="Next thumbnail"
					disabled={slideStatus.isEnd}
				>
					<ChevronDown size={16} color="currentColor" />
				</NavButton>
			</div>

			{/* Active image */}
			<div className="relative aspect-square w-full overflow-hidden rounded-lg">
				<Image
					src={imageUrls[activeImageIdx]}
					alt={title}
					fill
					className="object-contain"
					priority
				/>
			</div>
		</div>
	);
}

function NavButton({
	onClick,
	children,
	ariaLabel,
	disabled,
}: {
	onClick: () => void;
	children: ReactNode;
	ariaLabel: string;
	disabled: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className="flex h-6 w-full items-center justify-center text-main rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			aria-label={ariaLabel}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
