"use client";

/* next.js*/
import Link from "next/link";
import {usePathname} from "next/navigation";

/* components*/
import {Dialog} from "radix-ui";
import {Button} from "@/components/ui/button";
import CartDrawerItem from "./item";

/* hooks */
import {useAppSelector} from "@/hooks/use-app-selector";
import {useAppDispatch} from "@/hooks/use-app-dispatch";
import {useCartDrawer} from "@/context/cart-drawer-context";

/* lib */
import {
    selectAllItems,
    selectRecentlyAddedItems,
    selectTotalPrice,
    selectSeenItems, acknowledgeRecentlyAddedItems
} from "@/lib/features/cart/cart-slice";
import {getEuro} from "@/lib/utils";

/* icons */
import {Check, ShoppingCart, X, Lock, Search} from "lucide-react";
/* styles */
import "./styles.css";
import {useEffect} from "react";

export default function CartDrawer({children}: { children: React.ReactNode }) {
    // For detecting URL changes and closing the drawer
    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const recentlyAddedItems = useAppSelector(selectRecentlyAddedItems);
    const seenItems = useAppSelector(selectSeenItems);
    const items = useAppSelector(selectAllItems);
    const totalPrice = useAppSelector(selectTotalPrice);
    const uniqueItemsAmount = useAppSelector(selectAllItems).length;

    // Cart drawer context
    const {isOpen, open, close} = useCartDrawer();

    useEffect(close, [pathname]);

    return (
        <>
            <Dialog.Root
                // defaultOpen={false}
                open={isOpen}
                onOpenChange={(e) => e ? open() : close()}
            >
                <Dialog.Trigger asChild>
                    {children}
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="dialog__overlay"/>
                    <Dialog.Content
                        className="dialog__content"
                        onCloseAutoFocus={(e) => {
                            e.preventDefault();
                            dispatch(acknowledgeRecentlyAddedItems());
                        }}
                    >
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
                                    {uniqueItemsAmount}
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
                        {uniqueItemsAmount === 0 ? (
                            <div
                                className={"dialog__banner h-12 justify-center items-center gap-x-3 bg-gray-100! text-slate-500!"}>
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
                                    {recentlyAddedItems.length > 0 && (
                                        <div className="flex flex-col gap-y-6">
                                            <div className="dialog__banner">
                                                <Check className={"class-6"} strokeWidth={1.5}></Check>
                                                {recentlyAddedItems.length} product added to cart
                                            </div>

                                            {recentlyAddedItems.map((item, index) => (
                                                <CartDrawerItem
                                                    key={item.id + index}
                                                    id={item.id}
                                                    productCode={item.productCode}
                                                    name={item.name}
                                                    variant={item.variant}
                                                    imageUrl={item.imageUrl}
                                                    quantity={item.quantity}
                                                />
                                            ))}
                                        </div>
                                    )}

                                    {/* All/other cart items */}
                                    <div className="flex flex-col gap-y-6">
                                        {recentlyAddedItems.length > 0 && seenItems.length > 0 && (
                                            <h3 className={"text-xl leading-7 font-semibold"}>
                                                Other products ({seenItems.length})
                                            </h3>
                                        )}
                                        <div className="flex flex-col gap-y-2">
                                            {recentlyAddedItems.length == 0 ?
                                                items.map((item, index) => (
                                                    <CartDrawerItem
                                                        key={item.id + index}
                                                        id={item.id}
                                                        productCode={item.productCode}
                                                        name={item.name}
                                                        variant={item.variant}
                                                        imageUrl={item.imageUrl}
                                                        quantity={item.quantity}
                                                    />
                                                )) :
                                                seenItems.map((item, index) => (
                                                    <CartDrawerItem
                                                        key={item.id + index}
                                                        id={item.id}
                                                        productCode={item.productCode}
                                                        name={item.name}
                                                        variant={item.variant}
                                                        imageUrl={item.imageUrl}
                                                        quantity={item.quantity}
                                                    />
                                                ))
                                            }
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
                                    <span className={"text-xl font-semibold"}>{getEuro(totalPrice)}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="h-[44px] w-full text-base"
                                        onClick={() => close()}
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