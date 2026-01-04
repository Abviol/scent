"use client";

import { AvailabilityType, VolumeEnum } from "@/lib/types";
import { getAvailability, getAvailabilityClass, getEuro, volEnumToNumber } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface CartItemProps {
	image_url: string;
	title: string;
	volume: VolumeEnum;
	productId: string;
	quantity: number;
	quantityInStock: number;
	pricePerItem: number; // cents
}

export default function CartItem({
	image_url,
	title,
	volume,
	productId,
	quantity,
	quantityInStock,
	pricePerItem,
}: CartItemProps) {
	const [availability, setAvailability] = useState<AvailabilityType>(getAvailability(quantityInStock));
   const availabilityClass: string = getAvailabilityClass(availability);
	const [totalPrice, setTotalPrice] = useState<number>(pricePerItem * quantity);

	// const handleQuantity = (e: any) => setTotalPrice(e.quantity * pricePerItem);


	return (
		<div className="flex justify-between items-center w-full bg-white border-gray-200 border-2 p-10 rounded-[8px]">
			<div className="flex gap-x-10">
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
				<div className="flex flex-col justify-between min-w-[240px]">
					<div className="">
						<h3 className="text-2xl font-semibold mb-3 leading-8">{title}</h3>
						<div className="flex justify-between font-semibold leading-3">
							<span className="text-gray-500">
								{volEnumToNumber(volume)} ml
							</span>
							<span className="text-gray-500">
								Product Id&nbsp;-&nbsp; 
								<span className="text-main">{productId}</span>
							</span>
						</div>
					</div>

               <span className={`text-xl font-semibold capitalize leading-7 ${availabilityClass}`}>{availability}</span>
				</div>
			</div>
			{/* <QuantitySelector /> */}
			<span className="font-semibold text-gray-600">Quantity: {quantity}</span>
			<div className="flex gap-[120px] items-center">
				<span className="my-text-h4">{getEuro(totalPrice)}</span>
				<button title="Remove from cart" aria-label="Remove from cart">
					<Trash2 strokeWidth={1.5} size={32} className="stroke-black hover:stroke-red-600 transition-colors"></Trash2>
				</button>
			</div>
		</div>
	);
}
