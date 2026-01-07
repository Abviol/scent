"use client";

import CartDrawerItem from "@/components/cartDrawerItem/cartDrawerItem";
import CartItem from "@/components/cartItem";
import CommentCard from "@/components/commentCard/commentCard";
import ProductCard, { ProductCardOnSaveEvent } from "@/components/productCard";
import SearchCard from "@/components/searchCard";
import Stepper from "@/components/stepper/stepper";
import Marker from "@/components/ui/marker";
import { useState } from "react";

export default function Page() {
	const [cartQuantity1, setCartQuantity1] = useState<number>(10);
	const [cartQuantity2, setCartQuantity2] = useState<number>(10);
	const [cartQuantity3, setCartQuantity3] = useState<number>(10);

	return (
		<div className="py-12 px-8">
			<div className="flex mb-10">
				<Marker name="hit" size="sm"></Marker>
			</div>

			<h3 className="my-text-lg">Product card</h3>
			<div className="flex gap-x-4">
				<div className="flex gap-x-4">
					<ProductCard
						title={"Versace Eros Flame"}
						productId="21234re34125derew1"
						imageUrl={"https://i.makeup.it/u/uf/uf0jgxb7gg2e.jpg"}
						markers={["hit"]}
						wishlist={false}
						volume={0}
						rating={4.5}
						price={200}
						onSave={(e: ProductCardOnSaveEvent) => console.log(`${e.wishlist ? "Added to wishlist" : "Removed from wishlist"}`, e.productId)}
					/>

					<ProductCard
						title={"Versace Eros Flame"}
						productId="21234re34125derew1"
						imageUrl={"https://i.makeup.it/u/ux/uxuxdj4ehyen.jpg"}
						markers={["hit", "hit"]}
						wishlist={true}
						volume={0}
						rating={4.5}
						price={9999}
						onSave={(e: ProductCardOnSaveEvent) => console.log(`${e.wishlist ? "Added to wishlist" : "Removed from wishlist"}`, e.productId)}
					/>

					<ProductCard
						title={"Versace Eros Flame"}
						productId="21234re34125derew1"
						imageUrl={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
						markers={[]}
						wishlist={true}
						volume={0}
						rating={4.5}
						price={200}
						onSave={(e: ProductCardOnSaveEvent) => console.log(`${e.wishlist ? "Added to wishlist" : "Removed from wishlist"}`, e.productId)}
					/>
				</div>
			</div>

			<h3 className="my-text-lg">Search card</h3>
			<div className="flex gap-x-4">
				<SearchCard
					title={"Versace Eros Flame"}
					productId="clh32m980000008l6gg6s658o"
					productCode="01203213"
					quantityInStock={10}
					imageUrl={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
					volume={0}
					rating={4.5}
					price={4999}
				></SearchCard>
				<SearchCard
					title={"Versace Eros Flame"}
					productId="clh32m980000008l6gg6s658o"
					productCode="01203213"
					quantityInStock={0}
					imageUrl={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
					volume={0}
					rating={4.5}
					price={4999}
				></SearchCard>
			</div>

			<h3 className="my-text-lg">Cart item</h3>
			<div className="flex flex-col gap-y-8">
				<CartItem
					title={"Versace Eros Flame"}
					productId="01203213"
					quantityInStock={11}
					imageUrl={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
					volume={0}
					pricePerItem={4999}
					quantity={1}
					onDelete={() => console.log("Deleted from cart")}
				></CartItem>
				<CartItem
					title={"Versace Eros Flame"}
					productId="01203213"
					quantityInStock={0}
					imageUrl={"https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"}
					volume={2}
					pricePerItem={11999}
					quantity={1}
					onDelete={() => console.log("Deleted from cart")}
				></CartItem>
			</div>

			<h3 className="my-text-lg">Cart drawer item</h3>
			<div className="w-[360px] flex flex-col gap-y-8">
				<CartDrawerItem
					title={"Versace Eros Flame"}
					productId="01203213"
					quantityInStock={11}
					imageUrl={"https://i.makeup.it/1/1x/1xkz6atfgthd.jpg"}
					volume={0}
					pricePerItem={4999}
					quantity={1}
					onDelete={() => console.log("Deleted from cart")}
				></CartDrawerItem>
				<CartDrawerItem
					title={"Versace Eros Flame"}
					productId="01203213"
					quantityInStock={0}
					imageUrl={"https://i.makeup.it/1/1x/1xkz6atfgthd.jpg"}
					volume={0}
					pricePerItem={4999}
					quantity={1}
					onDelete={() => console.log("Deleted from cart")}
				></CartDrawerItem>
			</div>

			<h3 className="my-text-lg">Stepper</h3>
			<div className="flex gap-x-8">
				<Stepper
					value={cartQuantity1}
					onChange={(e: number) => setCartQuantity1(e)}
					max={99}
				></Stepper>
				<Stepper
					value={cartQuantity2}
					onChange={(e: number) => setCartQuantity2(e)}
					max={10}
				></Stepper>
				<Stepper
					value={cartQuantity3}
					onChange={(e: number) => setCartQuantity3(e)}
					max={10}
					disabled
				></Stepper>
				<Stepper
					value={cartQuantity1}
					onChange={(e: number) => setCartQuantity1(e)}
					max={99}
					size="sm"
				></Stepper>
			</div>

			<h3 className="my-text-lg">Comment card</h3>
			<div className="mx-auto w-[1200px] grid grid-cols-3 gap-x-[102px] gap-y-[60px]">
				<CommentCard
					userAvatarUrl="https://lh3.googleusercontent.com/ogw/AF2bZygcwIauU2RIpsqeogK3a5zbJd53GV87qFj_i_3vm1N0nA=s32-c-mo"
					userName="Nazar"
					dateCommentLeft="11.11"
					rating={4.4}
					text="I am pleasantly surprised by the service and quality of the fragrances! I ordered some perfume, and it arrived very quickly and beautifully packaged — you can feel the attention to detail."
				></CommentCard>
				<CommentCard
					userAvatarUrl="https://lh3.googleusercontent.com/ogw/AF2bZygcwIauU2RIpsqeogK3a5zbJd53GV87qFj_i_3vm1N0nA=s32-c-mo"
					userName="Nazar Kyselov"
					dateCommentLeft="24.12"
					rating={4.9}
					text="With surname doesn't look good. la;sjdflkasjdfl;kjsad;lfkjsad;lkfj;laskdjf;lkasjdf;lkasjdfl;kjasd;lfkjsa;lkdfja;sldkfj;salkdjf;aslkdjf"
				></CommentCard>
				<CommentCard
					userAvatarUrl="https://lh3.googleusercontent.com/ogw/AF2bZygcwIauU2RIpsqeogK3a5zbJd53GV87qFj_i_3vm1N0nA=s32-c-mo"
					userName="Misha"
					dateCommentLeft="31.12"
					rating={4.9}
					text="Short comment."
				></CommentCard>
			</div>
		</div>
	);
}
