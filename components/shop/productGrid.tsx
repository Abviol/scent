import { Frown } from "lucide-react";
import ProductCard from "../productCard";
import { ProductType } from "@/lib/types";

interface ProductGridProps {
	products: ProductType[];
}

/**
 * ProductGrid
 * Responsible for rendering the list of products or the "Empty State"
 */
export function ProductGrid({ products }: ProductGridProps) {
	if (products.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
				<Frown className="h-10 w-10 mb-4 opacity-50" />
				<h3 className="text-lg font-semibold">No products found</h3>
				<p>Try adjusting your filters or search criteria.</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-4 gap-x-5 gap-y-12">
			{products.map((prod, i) => (
				<ProductCard
					key={prod.id + i}
					name={prod.name}
					productId={prod.id}
					imageUrl={prod.imageUrls[0]}
					markers={prod.markers}
					wishlist={prod.variants[0].wishlist}
					volume={prod.variants[0].volume}
					rating={prod.rating}
					price={prod.variants[0].price}
				/>
			))}
		</div>
	);
}