import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

// Utils & Types
import { VolumeEnum } from "@/lib/types";
import { volEnumToNumber } from "@/lib/utils";

// Components
import Marker from "./ui/marker";
import Rating from "./ui/rating";

export interface ProductCardProps {
	title: string;
	volume: VolumeEnum;
	image_url: string;
	image_alt: string;
	rating: number;
	price: number;
	wishlist: boolean;
	markers: "hit" | string;
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
			className="flex flex-col gap-y-5 bg-white border-gray-200 border-2 rounded-[8px] px-[30px] py-5 transition-shadow hover:drop-shadow-md hover:drop-shadow-slate-300"
		>
			<div className="flex flex-col gap-y-5">
				<div className="flex flex-row justify-between items-center">
					<Marker name="hit" size="md" />
					<div
						aria-label="Add to wishlist"
						title="Add to wishlist"
						role="button"
					>
						<Bookmark size={24} />
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

				<span className="my-text-lg">{price}€</span>
			</div>
		</Link>
	);
}
