"use server";

/* Components */
import Breadcrumbs, {BreadcrumbItem} from "@/components/ui/breadcrumbs";
import CartPageClient from "@/components/pages/account/cart";
import Nav from "@/components/layout/nav";

/* Lib */
import getCartItems from "@/lib/api/cart-items";

export default async function CartPage() {
    const cartItems = await getCartItems("12344321");

    const breadcrumbsItems: BreadcrumbItem[] = [
        { label: "Scent", href: "/" },
        { label: "Cart", href: "/account/cart" },
    ];

    return (
        <>
            <div className="mt-2 mb-14">
                <Nav />
            </div>
            <main className="container mx-auto px-8 mb-40">
                {/* Header */}
                <div className="flex flex-row justify-between items-center mb-[100px]">
                    <h1 className="text-[40px] font-semibold leading-12">
                        Cart
                    </h1>
                    <Breadcrumbs items={breadcrumbsItems} />
                </div>

                {/* Interactive Client Part */}
                {/* Cart items list & total*/}
                <CartPageClient cartItems={cartItems} />
            </main>
        </>
    );
}