"use client";

// import {useRef, useState} from "react";
import {Check, ShoppingCart, X, Lock} from "lucide-react";
import {Dialog} from "radix-ui";
import "./styles.css";
import {Button} from "@/components/ui/button";
import CartDrawerItem, {CartDrawerItemProps} from "@/components/cartDrawer/item/cartDrawerItem";
import Link from "next/link";

export default function CartDrawer() {
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const quantityRef = useRef(null);
    // const openCart = () => setIsOpen(true);
    // const closeCart = () => setIsOpen(false);

    const recentlyAddedItem: CartDrawerItemProps = {
        title: "Versace Eros Flame",
        productId: "drawer-001",
        productCode: "01203213",
        quantityInStock: 11,
        imageUrl: "https://i.makeup.it/1/1x/1xkz6atfgthd.jpg",
        volume: 30,
        pricePerItem: 4999,
        quantity: 1,
        onDelete: () => console.log("Deleted"),
    };
    const items: CartDrawerItemProps[] = [
        recentlyAddedItem,
        ...Array.from({length: 4}, () => ({
            title: "Versace Eros Flame",
            productId: "drawer-001",
            productCode: "01203213",
            quantityInStock: 11,
            imageUrl: "https://i.makeup.it/1/1x/1xkz6atfgthd.jpg",
            volume: 30,
            pricePerItem: 4999,
            quantity: 1,
            onDelete: () => console.log("Deleted"),
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
                                <span className="p-2 bg-slate-600 rounded-[8px] text-base text-white leading-3">5</span>
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

                        {/* Scrollable content */}
                        <div className="dialog__scrollable-container">

                            {/* Added item */}
                            <div className="flex flex-col gap-y-6">
                                <div className="dialog__banner">
                                    <Check className={"class-6"} strokeWidth={1.5}></Check>
                                    1 product added to cart
                                </div>

                                <CartDrawerItem
                                    title={recentlyAddedItem.title}
                                    productId={recentlyAddedItem.productId}
                                    productCode={recentlyAddedItem.productCode}
                                    quantityInStock={recentlyAddedItem.quantityInStock}
                                    imageUrl={recentlyAddedItem.imageUrl}
                                    volume={recentlyAddedItem.volume}
                                    pricePerItem={recentlyAddedItem.pricePerItem}
                                    quantity={recentlyAddedItem.quantity}
                                    onDelete={recentlyAddedItem.onDelete}
                                />
                            </div>

                            {/* All cart items */}
                            <div className="flex flex-col gap-y-6">
                                <h3 className={"text-xl leading-7 font-semibold"}>All products (4)</h3>
                                <div className="flex flex-col gap-y-2">
                                    {items.map((item, index) => (
                                        <CartDrawerItem
                                            key={item.productCode + index}
                                            title={item.title}
                                            productId={item.productId}
                                            productCode={item.productCode}
                                            quantityInStock={item.quantityInStock}
                                            imageUrl={item.imageUrl}
                                            volume={item.volume}
                                            pricePerItem={item.pricePerItem}
                                            quantity={item.quantity}
                                            onDelete={item.onDelete}
                                        />
                                    ))}
                                </div>
                            </div>

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
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}