"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark } from "lucide-react";

// Utils & Types
import { MarkerType, VolumeEnum } from "@/lib/types";
import { getEuro, volEnumToNumber } from "@/lib/utils";

// Components
import Marker from "./ui/marker";
import Rating from "./ui/rating";
import { useState } from "react";

export interface ProductCardOnSaveEvent {
	product_id: string;
	wishlist: boolean;
}
export interface ProductCardProps {
	title: string;
	product_id: string; // diverse from product_code
	volume: VolumeEnum;
	image_url: string;
	rating: number;
	price: number; // in cents
	wishlist: boolean;
	markers: MarkerType[];
	onSave: (e: ProductCardOnSaveEvent) => void;
}

export default function ProductCard({
	title,
	product_id,
	volume,
	image_url,
	rating,
	price,
	wishlist,
	markers,
	onSave,
}: ProductCardProps) {
	const productLink = `/product/${product_id}`;

	const [isSaved, setIsSaved] = useState<boolean>(wishlist);

	const handleSave = () => {
		const newSavedStatus = !isSaved;

		setIsSaved(newSavedStatus);
		onSave({
			product_id,
			wishlist: newSavedStatus,
		});
	};

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

					<button
						aria-label="Add to wishlist"
						title="Add to wishlist"
						role="button"
						onClick={handleSave}
						className="text-main"
					>
						{isSaved ? (
							<Bookmark
								size={24}
								className="fill-current stroke-current"
							/>
						) : (
							<Bookmark size={24} className="stroke-current" />
						)}
					</button>
				</div>
				<Link
					href={productLink}
					className="relative overflow-hidden h-[200px] w-full aspect-square flex justify-center items-center"
				>
					<Image
						src={image_url}
						alt={`${title} ${volEnumToNumber(volume)} ml`}
						fill
						className="object-contain"
						priority={false}
					/>
				</Link>
			</div>

			<Link href={productLink}>
				<div className="flex flex-col items-center">
					<h3 className="my-text-lg">{title}</h3>
					<div className="flex flex-row gap-x-10 mb-8">
						<span className="my-text-p gap-x-10 items-center">
							{volEnumToNumber(volume)} ml
						</span>
						<Rating rating={rating} />
					</div>

					<span className="my-text-lg">{getEuro(price)}</span>
				</div>
			</Link>
		</div>
	);
}
