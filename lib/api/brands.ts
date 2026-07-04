/* lib */
import { BRANDS } from "../data";

export default async function getBrands() {
   // Simulatel DB network delay
   await new Promise((resolve) => setTimeout(resolve, 500));
   console.log("DB request made.");

   return BRANDS;
}