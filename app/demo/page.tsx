import ProductCard from "@/components/productCard";
import Marker from "@/components/ui/marker";

export default function Page() {
   return (
      <div className="container py-12 px-8">
         <div className="flex">
            <Marker name="hit" size="sm"></Marker>
         </div>
         <div className="flex gap-x-4">
            <ProductCard title={"Versace Eros Flame"} image_url={"https://i.makeup.it/u/uf/uf0jgxb7gg2e.jpg"} image_alt="asdsadf" markers="hit" wishlist={false} volume={0} rating={4.5} price={200}/>
         </div>
      </div>

   )
}