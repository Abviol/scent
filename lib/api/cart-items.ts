/* lib */
import {CART_ITEMS} from "../data";

export default async function getCartItems(userId: string) {
    // Simulatel DB network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return CART_ITEMS;
}