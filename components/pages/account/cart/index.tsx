"use client";

/* React */
import {useMemo, useState} from "react";

/* Next.js */
import Link from "next/link";

/* Components */
import CartItem from "@/components/cart-item";
import {Button} from "@/components/ui/button";

/* hooks */
import {useAppSelector} from "@/hooks/use-app-selector";

/* Lib */
import {CartItemType} from "@/lib/types";
import {getEuro} from "@/lib/utils";
import {Search} from "lucide-react";
import {incrementItemQuantityByAmount, removeItem, selectItems, selectTotalPrice} from "@/lib/features/cart/cart-slice";
import {useAppDispatch} from "@/hooks/use-app-dispatch";

interface CartPageClientProps {
    cartItems: CartItemType[];
}

const DELIVERY_COST = 0;

export default function CartPageClient({cartItems}: CartPageClientProps) {
    const dispatch = useAppDispatch();
    const totalPrice = useAppSelector(selectTotalPrice);
    const items = useAppSelector(selectItems);

    if (items.length === 0) return (
        <div className="my-[120px] flex flex-col justify-center items-center">
            <div className="flex gap-5 items-center mb-8">
                <p className="text-3xl font-semibold text-slate-500">
                    Your cart is empty{" "}
                </p>{" "}
                <Search
                    color="#697489"
                    strokeWidth={2}
                    size={28}
                />{" "}
            </div>
            <p className="text-xl font-semibold text-slate-500 mb-10">
                You will find something you like in the shop!
            </p>
            <Button size="lg" className="px-10" asChild>
                <Link href={"/shop"}>Shop Now</Link>
            </Button>
        </div>
    );

    return (
        <>
            <div className="w-full flex flex-col gap-y-8">
                {items.length > 0 && items.map((item, index) => (
                    <CartItem
                        key={item.id + index}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        variant={item.variant}
                        id={item.id}
                        productCode={item.productCode}
                        quantity={item.quantity}
                    />
                ))}
            </div>

            <div
                className="flex flex-col mt-[100px] mx-auto max-w-[800px] p-[60px] rounded-[8px] border-2 border-gray-200">
                <div className="flex justify-between text-2xl text-slate-500 font-semibold mb-3">
                    <span>Order price</span>
                    <span>{getEuro(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-2xl text-slate-500 font-semibold mb-10">
                    <span>Estimated delivery price</span>
                    <span>{getEuro(DELIVERY_COST)}</span>
                </div>
                <div className="flex justify-between text-4xl text-main font-semibold mb-20">
                    <span>Total</span>
                    <span>{getEuro(totalPrice)}</span>
                </div>
                <Button className="h-[60px] w-full max-w-[496px] mx-auto text-[20px] font-medium" asChild>
                    <Link href={"/checkout"}>Checkout</Link>
                </Button>
            </div>
        </>
    );
}