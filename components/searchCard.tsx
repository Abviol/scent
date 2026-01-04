"use client";

import { AvailabilityType, VolumeEnum } from "@/lib/types";
import { getAvailability, getAvailabilityClass, getEuro, volEnumToNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Rating from "./ui/rating";
import { useState } from "react";

export interface SearchCardProps {
	title: string;
	productId: string;
	volume: VolumeEnum;
	rating: number;
	price: number; //cents
	quantityInStock: number;
	image_url: string;
}

export default function SearchCard({
	title,
	productId,
	volume,
	rating,
	price,
	quantityInStock,
	image_url,
}: SearchCardProps) {
   const [availability, setAvailability] = useState<AvailabilityType>(getAvailability(quantityInStock));
   const availabilityClass: string = getAvailabilityClass(availability);

	return (
		<Link href={"/"} className="w-full max-w-[500px] flex gap-x-10 p-5 rounded-[8px] bg-white transition-colors hover:bg-accent-light">
			<div className="relative overflow-hidden size-[100px] aspect-square flex shrink-0 justify-center items-center">
				<Image
					src={image_url}
					alt={`${title} ${volEnumToNumber(volume)} ml`}
					fill
					className="object-contain"
					loading="eager"
					priority={false}
				></Image>
			</div>

         <div className="w-full flex flex-col justify-between">
            <div className="flex flex-row w-full justify-between">
               <h3 className="font-semibold whitespace-nowrap">{title}</h3>
               <span className="font-semibold">{productId}</span>
            </div>

            <div className="flex justify-between">
               <span className="font-[14px] gap-x-10 items-center">
						{volEnumToNumber(volume)} ml
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
