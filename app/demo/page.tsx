import ProductCard from "@/components/productCard";
import Marker from "@/components/ui/marker";

export default function Page() {
	return (
		<div className="container py-12 px-8">
			<div className="flex mb-10">
				<Marker name="hit" size="sm"></Marker>
			</div>

			<h3 className="my-text-lg">Product card</h3>
			<div className="flex gap-x-4">
				<div className="flex gap-x-4">
					<ProductCard
						title={"Versace Eros Flame"}
						image_url={"https://i.makeup.it/u/uf/uf0jgxb7gg2e.jpg"}
						image_alt="asdsadf"
						markers={["hit"]}
						wishlist={false}
						volume={0}
						rating={4.5}
						price={200}
					/>

               <ProductCard
						title={"Versace Eros Flame"}
						image_url={"https://i.makeup.it/u/ux/uxuxdj4ehyen.jpg"}
						image_alt="asdsadf"
						markers={["hit", "hit"]}
						wishlist={true}
						volume={0}
						rating={4.5}
						price={9999}
					/>

                <ProductCard
						title={"Versace Eros Flame"}
						image_url={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
						image_alt="asdsadf"
						markers={[]}
						wishlist={true}
						volume={0}
						rating={4.5}
						price={200}
					/>
				</div>
			</div>
		</div>
	);
}
