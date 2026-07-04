"use client";

/* next.js */
import Image from "next/image";
import Link from "next/link";
/* components */
import Marker from "./ui/marker";
import Rating from "./ui/rating";
import BookmarkButton from "./bookmark-button";
/* lib */
import { MarkerType } from "@/lib/types";
import { cn, getEuro } from "@/lib/utils";

interface ProductCardProps {
	name: string;
	productId: string; // diverse from product_code
	volume: number;
	imageUrl: string;
	rating: number;
	price: number; // in cents
	wishlist: boolean;
	markers: MarkerType[];
	className?: string;
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
	className,
}: ProductCardProps) {
	const productLink = `/shop/product/${productId}`;

	return (
		<div
			className={cn(
				"flex flex-col grow gap-y-5 bg-white border-gray-200 border-2 rounded-[8px] px-[30px] py-5 transition-colors hover:bg-accent-light hover:border-accent",
				className,
			)}
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
						sizes={"200px"}
						className="object-contain"
						priority={false}
					/>
				</Link>
			</div>

			<Link
				href={productLink}
				className="flex flex-col items-center"
			>
				<h3 className="my-text-lg text-center">{name}</h3>
				<div className="flex flex-row gap-x-10">
					<span className="my-text-p gap-x-10 items-center">
						{volume} ml
					</span>
					<Rating rating={rating} />
				</div>
			</Link>
			<Link href={productLink} className="flex grow items-end justify-center">
				<span className="my-text-lg">{getEuro(price)}</span>
			</Link>
		</div>
	);
}
