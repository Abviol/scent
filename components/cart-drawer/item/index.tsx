"use client";
/* react */
import { useState } from "react";

/* next.js */
import Link from "next/link";

/* components */
import Stepper from "../../stepper";

/* lib */
import {AvailabilityType, CartItemType} from "@/lib/types";
import {
	getAvailability,
	getEuro,
} from "@/lib/utils";

/* icons */
import { Trash2 } from "lucide-react";
import Image from "next/image";

/* styles */
import "./styles.css";


interface CartDrawerItemProps extends CartItemType {
	onDelete: () => void;
}
export default function CartDrawerItem({
	imageUrl,
	name,
	variant,
	id,
	productCode,
	quantity,
	onDelete,
}: CartDrawerItemProps) {
	const [isDeleted, setIsDeleted] = useState<boolean>(false);
	const [availability] = useState<AvailabilityType>(
		getAvailability(variant.quantityInStock)
	);
	const availabilityClass: string =
		availability == "not_available" ? "not-available" : "";

	const productLink: string = `/shop/product/${id}`;
	const [newQuantity, setNewQuantity] = useState<number>(quantity);
	const [totalPrice, setTotalPrice] = useState<number>(
		variant.price * quantity
	);

	const handleQuantity = (e: number) => {
		setNewQuantity(e);
		setTotalPrice(e * variant.price);
	};

	const handleDelete = () => {
		setIsDeleted(true);
		onDelete();
	};

	return (
		<>
			{!isDeleted && (
				<div
					className={`w-full p-3.5 flex gap-x-3 bg-white rounded-lg border-2 border-gray-200 items-center hover:bg-accent-light hover:border-accent-light transition-colors ${availabilityClass}`}
				>
					<Link
						href={productLink}
						className="item__image relative overflow-hidden size-18 rounded-lg aspect-square flex shrink-0 justify-center items-center"
					>
						<Image
							src={imageUrl}
							alt={`${name} ${variant.volume} ml`}
							fill
							sizes={"72px"}
							className="object-contain"
							loading="eager"
							priority={false}
						></Image>
					</Link>

					<div className="w-full overflow-hidden flex flex-col gap-5">
						<div className="flex justify-between items-baseline">
							<Link
								href={productLink}
								className="overflow-hidden item__text flex flex-col gap-y-2.5"
							>
								<h4 className="font-semibold leading-3 overflow-hidden truncate">
									{name}
								</h4>
								<div className="flex gap-4 text-xs font-semibold">
									<span className="text-gray-600">
										<span className="text-black">
											{productCode}
										</span>
									</span>
									<span className="text-gray-500">
										{variant.volume} ml
									</span>
								</div>
							</Link>

							<button aria-label="Remove" name="remove">
								<Trash2
									size={20}
									strokeWidth={1.5}
									onClick={handleDelete}
								></Trash2>
							</button>
						</div>

						<div className="item__details flex justify-between items-center">
							<div className="inline-flex items-center gap-x-3">
								<span className="text-sm font-medium">
									Price:
								</span>
								<span className="font-semibold text-accent">
									{getEuro(totalPrice)}
								</span>
							</div>
							<Stepper
								size="sm"
								min={1}
								max={variant.quantityInStock}
								value={newQuantity}
								onChange={(e: number) => handleQuantity(e)}
							></Stepper>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
