"use client";

/* next.js */
import Image from "next/image";
import Link from "next/link";

/* components */
import Stepper from "./stepper";

/* hooks */
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {useAppSelector} from "@/hooks/use-app-selector";

/* lib */
import {AvailabilityType, CartItemType} from "@/lib/types";
import {
    getAvailability,
    getAvailabilityClass,
    getEuro,
} from "@/lib/utils";
import {incrementItemQuantityByAmount, removeItem, selectTotalPrice} from "@/lib/features/cart/cartSlice";

/* icons */
import {Trash2} from "lucide-react";

export default function CartItem({
                                     imageUrl,
                                     name,
                                     variant,
                                     id,
                                     productCode,
                                     quantity,
                                 }: CartItemType) {
    // redux cartSlice
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector(selectTotalPrice);

    const availability: AvailabilityType = getAvailability(variant.quantityInStock);
    const availabilityClass: string = getAvailabilityClass(availability);
    const productLink: string = `/shop/product/${id}`;



    return (
        <>
            <div
                className="
                    grid grid-cols-[3fr_1fr_1fr] gap-x-4 items-center w-full
                    bg-white text-main border-gray-200 border-2 p-10 rounded-[8px]
                "
            >
                <Link href={productLink} className="flex gap-x-10">
                    <div
                        className="relative overflow-hidden size-[100px] aspect-square flex shrink-0 justify-center items-center">
                        <Image
                            src={imageUrl}
                            alt={`${name} ${variant.volume} ml`}
                            fill
                            sizes={"100px"}
                            className="object-contain"
                            loading="eager"
                            priority={false}
                        ></Image>
                    </div>
                    <div className="flex flex-col justify-between min-w-[240px]">
                        <div className="">
                            <h3 className="text-2xl font-semibold mb-3 leading-8">
                                {name}
                            </h3>
                            <div className="flex justify-between font-semibold leading-3">
									<span className="text-gray-500">
										{variant.volume} ml
									</span>
                                <span className="text-gray-500">
										Product Code&nbsp;-&nbsp;
                                    <span className="text-main">
											{productCode}
										</span>
									</span>
                            </div>
                        </div>

                        <span
                            className={`text-xl font-semibold capitalize leading-7 ${availabilityClass}`}
                        >
								{availability}
							</span>
                    </div>
                </Link>
                <Stepper
                    value={quantity}
                    onChange={(e: number) => dispatch(incrementItemQuantityByAmount({ id: id, amount: e}))}
                    min={1}
                    max={variant.quantityInStock}
                    disabled={variant.quantityInStock == 0}
                ></Stepper>
                <div className="flex gap-x-[calc(24px+5vw)] items-center">
						<span className="my-text-h4">
							{getEuro(totalPrice)}
						</span>
                    <button
                        title="Remove from cart"
                        aria-label="Remove from cart"
                        onClick={() => dispatch(removeItem(id))}
                    >
                        <Trash2
                            strokeWidth={1.5}
                            className="hover:stroke-red-600 transition-colors"
                        ></Trash2>
                    </button>
                </div>
            </div>
        </>
    );
}
