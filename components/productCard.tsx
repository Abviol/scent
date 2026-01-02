import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

// Utils & Types
import { MarkerType, VolumeEnum } from "@/lib/types";
import { getEuro, volEnumToNumber } from "@/lib/utils";

// Components
import Marker from "./ui/marker";
import Rating from "./ui/rating";

export interface ProductCardProps {
	title: string;
	volume: VolumeEnum;
	image_url: string;
	image_alt: string;
	rating: number;
	price: number; // in cents
	wishlist: boolean;
	markers: MarkerType[];
}

export default function ProductCard({
	title,
	volume,
	image_url,
	image_alt,
	rating,
	price,
	wishlist,
	markers,
}: ProductCardProps) {


	return (
		<Link
			href={"/"}
			className="flex flex-col gap-y-5 bg-white border-gray-200 border-2 rounded-[8px] px-[30px] py-5 transition-colors
			hover:bg-accent-light hover:border-accent"
		>
			<div className="flex flex-col gap-y-5">
				<div className="flex flex-row justify-between items-center">
					<div className="flex gap-x-1">
						{markers.map((marker, key) => (
							<Marker key={key} name={marker} size="md" />
						))}
					</div>
					
					<div
						aria-label="Add to wishlist"
						title="Add to wishlist"
						role="button"
					>
						{wishlist ? (<Bookmark size={24} fill="#121729" stroke="#121729" />) : (<Bookmark size={24} stroke="#121729"/>)}
					</div>
				</div>
				<div className="relative overflow-hidden h-[200px] w-full aspect-square flex justify-center items-center">
					<Image
						src={image_url}
						alt={image_alt}
						fill
						className="object-contain"
						loading="eager"
						priority={false}
					/>
				</div>
			</div>

			<div className="flex flex-col items-center">
				<p className="my-text-lg">{title}</p>
				<div className="flex flex-row gap-x-10 mb-8">
					<span className="my-text-p gap-x-10 items-center">
						{volEnumToNumber(volume)} ml
					</span>
					<Rating rating={rating} />
				</div>

				<span className="my-text-lg">{getEuro(price)}</span>
			</div>
		</Link>
	);
}
