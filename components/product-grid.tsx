"use client";

/* components */
import ProductCard from "./product-card";
import { Button } from "./ui/button";
/* hooks */
import { useShopFilters } from "@/hooks/use-shop-filters";
/* lib */
import { ProductType } from "@/lib/types";
/* icons */
import { Frown } from "lucide-react";

interface ProductGridProps {
	products: ProductType[];
	page: number;
	emptyState?: React.ReactNode; //  If specified, is shown instead of the default one
}

/**
 * ProductGrid
 * Responsible for rendering the list of products or the "Empty State"
 */
export function ProductGrid({ products, page, emptyState }: ProductGridProps) {
	const { setPage } = useShopFilters();

	if (products.length === 0) {
		return emptyState ? emptyState : (
			<div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
				<Frown className="h-10 w-10 mb-4 opacity-50" />
				<h3 className="text-lg font-semibold">No products found</h3>
				<p>Try adjusting your filters or search criteria.</p>
			</div>
		);
	}

	return (
		 <div className="@container/product-grid">
					<div className="grid grid-cols-5 @max-6xl/product-grid:grid-cols-4 @max-3xl/product-grid:grid-cols-3  @max-2xl/product-grid:grid-cols-2  @max-lg/product-grid:grid-cols-1 gap-x-5 gap-y-12">
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
					<div className="mt-20 flex flex-row flex-1 justify-center">
						<Button
							size="lg"
							variant="default"
							className="h-[60px] w-full max-w-[400px] text-xl font-medium p-3 rounded-md"
							onClick={() => setPage(page + 1)}
						>
							More Products
						</Button>
					</div>
				</div>
	);
}
