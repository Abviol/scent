"use client";

import { AvailabilityType } from "@/lib/types";
import { getAvailability, getAvailabilityClass, getEuro } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Rating from "./ui/rating";
import { useState } from "react";

export interface SearchResultItemProps {
	title: string;
	productId: string;
	productCode: string;
	volume: number;
	rating: number;
	price: number; //cents
	quantityInStock: number;
	imageUrl: string;
}

export default function SearchResultItem({
	title,
	productId,
	productCode,
	volume,
	rating,
	price,
	quantityInStock,
	imageUrl,
}: SearchResultItemProps) {
	const productLink = `/shop/product/${productId}`;
   const [availability] = useState<AvailabilityType>(getAvailability(quantityInStock));
   const availabilityClass: string = getAvailabilityClass(availability);

	return (
		<Link href={productLink} className="w-full max-w-[500px] flex gap-x-5 p-5 rounded-[8px] bg-white transition-colors hover:bg-accent-light">
			<div className="relative overflow-hidden size-[100px] aspect-square flex shrink-0 justify-center items-center">
				<Image
					src={imageUrl}
					alt={`${title} ${volume} ml`}
					fill
					sizes={"100px"}
					className="object-contain"
					loading="eager"
					priority={false}
				></Image>
			</div>

         <div className="w-full min-w-0 flex flex-col justify-between">
            <div className=" flex flex-row w-full justify-between gap-2">
               <h3 className="min-w-0 font-semibold whitespace-nowrap truncate">{title}</h3>
               <span className="font-semibold shrink-0">{productCode}</span>
            </div>

            <div className="flex justify-between">
               <span className="font-[14px] gap-x-10 items-center">
						{volume} ml
					</span>
               <Rating rating={rating}></Rating>
            </div>

            <div className="flex justify-between">
               <span className="font-semibold">{getEuro(price)}</span>
               <span className={`font-semibold capitalize ${availabilityClass}`}>{availability}</span>

            </div>
         </div>
		</Link>
	);
}
