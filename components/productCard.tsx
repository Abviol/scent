"use client";

import Image from "next/image";
import Link from "next/link";

// Utils & Types
import { MarkerType } from "@/lib/types";
import { getEuro } from "@/lib/utils";

// Components
import Marker from "./ui/marker";
import Rating from "./ui/rating";
import BookmarkButton from "./bookmarkButton";

export interface ProductCardOnSaveEvent {
	productId: string;
	wishlist: boolean;
}
export interface ProductCardProps {
	name: string;
	productId: string; // diverse from product_code
	volume: number;
	imageUrl: string;
	rating: number;
	price: number; // in cents
	wishlist: boolean;
	markers: MarkerType[];
}

export default function ProductCard({
	name,
	productId,
	volume,
	imageUrl,
	rating,
	price,
	wishlist,
	markers,
}: ProductCardProps) {
	const productLink = `/shop/product/${productId}`;

	return (
		<div
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

					<BookmarkButton productId={productId} wishlist={wishlist} />
				</div>
				<Link
					href={productLink}
					className="relative overflow-hidden h-[200px] w-full aspect-square flex justify-center items-center"
				>
					<Image
						src={imageUrl}
						alt={`${name} ${volume} ml`}
						fill
						className="object-contain"
						priority={false}
					/>
				</Link>
			</div>

			<Link href={productLink}>
				<div className="flex flex-col justify-between items-center">
					<h3 className="my-text-lg text-center">{name}</h3>
					<div className="flex flex-row gap-x-10 mb-8">
						<span className="my-text-p gap-x-10 items-center">
							{volume} ml
						</span>
						<Rating rating={rating} />
					</div>

					<span className="my-text-lg">{getEuro(price)}</span>
				</div>
			</Link>
		</div>
	);
}
