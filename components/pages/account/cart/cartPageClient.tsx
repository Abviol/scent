"use client";

/* React */
import {useMemo, useState} from "react";

/* Next.js */
import Link from "next/link";

/* Components */
import CartItem from "@/components/cartItem";
import {Button} from "@/components/ui/button";

/* Lib */
import {CartItemType} from "@/lib/types";
import {getEuro} from "@/lib/utils";
import {Search} from "lucide-react";

interface CartPageClientProps {
    cartItems: CartItemType[];
}

const DELIVERY_COST = 0;

export default function CartPageClient({cartItems}: CartPageClientProps) {
    const [items, setItems] = useState<CartItemType[]>(cartItems);
    const orderPrice = useMemo(() => items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0), [items]);
    const totalPrice = useMemo(() => orderPrice + DELIVERY_COST, [orderPrice]);

    const updateQuantity = (id: string, newValue: number) => {
        setItems((prev) =>
            prev.map((item) => {
                if (item.productId === id) return {...item, quantity: newValue};
                return item;
            })
        );
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.productId !== id));
    };

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
                        key={item.productId + index}
                        imageUrl={item.imageUrl}
                        name={item.name}
                        volume={item.variant.volume}
                        productId={item.productId}
                        productCode={item.productCode}
                        quantity={item.quantity}
                        quantityInStock={item.variant.quantityInStock}
                        pricePerItem={item.variant.price}
                        onDelete={removeItem}
                        onQuantityChange={updateQuantity}
                    />
                ))}
            </div>

            <div
                className="flex flex-col mt-[100px] mx-auto max-w-[800px] p-[60px] rounded-[8px] border-2 border-gray-200">
                <div className="flex justify-between text-2xl text-slate-500 font-semibold mb-3">
                    <span>Order price</span>
                    <span>{getEuro(orderPrice)}</span>
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