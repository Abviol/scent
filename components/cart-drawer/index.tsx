"use client";

/* next.js*/
import Link from "next/link";

/* components*/
import {Dialog} from "radix-ui";
import {Button} from "@/components/ui/button";
import CartDrawerItem from "./item";
/* lib */
import {CartItemType} from "@/lib/types";
/* icons */
import {Check, ShoppingCart, X, Lock, Search} from "lucide-react";
/* styles */
import "./styles.css";

export default function CartDrawer() {

    const recentlyAddedItem: CartItemType = {
        name: "Versace Eros Flame",
        productId: "drawer-001",
        productCode: "01203213",
        imageUrl: "https://i.makeup.it/1/1x/1xkz6atfgthd.jpg",
        quantity: 1,
        variant: {
            volume: 30,
            price: 4999,
            discountedPrice: undefined,
            wishlist: true,
            quantityInStock: 1,
        },
    };
    const items: CartItemType[] = [
        recentlyAddedItem,
        ...Array.from({length: 4}, () => ({
            name: "Versace Eros Flame",
            productId: "drawer-001",
            productCode: "01203213",
            imageUrl: "https://i.makeup.it/1/1x/1xkz6atfgthd.jpg",
            quantity: 1,
            variant: {
                volume: 30,
                price: 4999,
                discountedPrice: undefined,
                wishlist: true,
                quantityInStock: 1,
            },
        }))
    ];

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <Button>Trigger cart drawer</Button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog__overlay"/>
                    <Dialog.Content className="dialog__content">
                        {/* Description: hidden */}
                        <Dialog.Description className="hidden">
                            Manage your cart articles here.
                        </Dialog.Description>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex gap-10 items-center">
                                <Dialog.Title className="dialog__title">Shopping Cart</Dialog.Title>
                                {/* Quantity */}
                                <span className="p-2 bg-slate-600 rounded-[8px] text-base text-white leading-3">
                                    {items.length}
                                </span>
                            </div>

                            {/* Close button */}
                            <Dialog.Close asChild>
                                <button
                                    className="size-10 flex justify-center items-center rounded-[8px] hover:bg-gray-100"
                                >
                                    <X className="size-8" strokeWidth={1.5}/>
                                </button>

                            </Dialog.Close>
                        </div>

                        {/* Conditional Rendering */}
                        {/* Handle empty and full cart states */}
                        {items.length === 0 ? (
                            <div className={"dialog__banner h-12 justify-center items-center gap-x-3 bg-gray-100! text-slate-500!"}>
                                <Search strokeWidth={2}></Search>
                                <span>
                                    Shopping cart is empty for now.
                                </span>
                            </div>
                        ) : (
                            <>
                                {/* Scrollable content */}
                                <div className="dialog__scrollable-container">

                                    {/* Added item */}
                                    <div className="flex flex-col gap-y-6">
                                        <div className="dialog__banner">
                                            <Check className={"class-6"} strokeWidth={1.5}></Check>
                                            1 product added to cart
                                        </div>

                                        <CartDrawerItem
                                            name={recentlyAddedItem.name}
                                            productId={recentlyAddedItem.productId}
                                            productCode={recentlyAddedItem.productCode}
                                            variant={recentlyAddedItem.variant}
                                            imageUrl={recentlyAddedItem.imageUrl}
                                            quantity={recentlyAddedItem.quantity}
                                            onDelete={() => {}}
                                        />
                                    </div>

                                    {/* All cart items */}
                                    <div className="flex flex-col gap-y-6">
                                        <h3 className={"text-xl leading-7 font-semibold"}>
                                            All products ({items.length})
                                        </h3>
                                        <div className="flex flex-col gap-y-2">
                                            {items.map((item, index) => (
                                                <CartDrawerItem
                                                    key={item.productCode + index}
                                                    name={item.name}
                                                    productId={item.productId}
                                                    productCode={item.productCode}
                                                    variant={item.variant}
                                                    imageUrl={item.imageUrl}
                                                    quantity={item.quantity}
                                                    onDelete={() => {}}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Total */}
                        <div className="dialog__total">
                            <div className="w-full flex flex-col gap-y-4">
                                <div className="total__row">
                                    <span className={"font-semibold"}>Total:</span>
                                    <span className={"text-xl font-semibold"}>€8256.99</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-[44px] w-full text-base"
                                        asChild
                                    >
                                        <Link href={"/account/cart"}>
                                            <ShoppingCart size={16} strokeWidth={2}></ShoppingCart>
                                            {" "}
                                            <span>View Cart</span>
                                        </Link>
                                    </Button>
                                    <Button
                                        size={"lg"}
                                        className={"w-full h-[44px] text-base bg-main"}
                                        asChild
                                    >
                                        <Link href={"/account/checkout"}>
                                            <Lock size={16} strokeWidth={2}></Lock>
                                            {" "}
                                            <span>Checkout</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}