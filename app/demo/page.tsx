"use client";

import { useState } from "react";

// Components
import CartDrawerItem from "@/components/cartDrawerItem/cartDrawerItem";
import CartItem from "@/components/cartItem";
import CommentCard from "@/components/commentCard/commentCard";
import ProductCard, { ProductCardOnSaveEvent } from "@/components/productCard";
import SearchResultItem from "@/components/searchResultItem";
import Stepper from "@/components/stepper/stepper";
import Avatar from "@/components/ui/avatar";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import Marker from "@/components/ui/marker";
import Tag from "@/components/ui/tag";
import Badge from "@/components/ui/badge";
import { AlertTriangle, Check, ListOrdered, Search, Truck } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { SortingOrderType, SortingType } from "@/lib/types";
import Sorting from "@/components/shop/sorting";

// --- Helper Component for Layout ---
const DemoSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<section className="py-10 border-b border-gray-200 last:border-0">
		<h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
		{/* This inner div acts as a "canvas" for the components */}
		<div className="p-8 bg-slate-50 border border-dashed border-slate-300 rounded-xl overflow-x-auto">
			{children}
		</div>
	</section>
);




export default function Page() {
	// State for Steppers
	const [cartQuantity1, setCartQuantity1] = useState<number>(10);
	const [cartQuantity2, setCartQuantity2] = useState<number>(10);
	const [cartQuantity3, setCartQuantity3] = useState<number>(10);

	// Data for Breadcrumbs
	const crumbs = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: "Product X", href: "/shop/product" },
	];

	// State for sorting
	const [sorting, setSorting] = useState<SortingType>({ criteria: "name", order: "DESC" });

	// const handleSave = (e: ProductCardOnSaveEvent) => {
	// 	console.log(
	// 		`${e.wishlist ? "Added to wishlist" : "Removed from wishlist"}`,
	// 		e.productId
	// 	);
	// };

	return (
		<div className="min-h-screen bg-white">
			<Header></Header>
			<Nav />
			<div className="max-w-[1400px] mx-auto px-8 py-12">
				<div className="mb-12">
					<h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
						UI Component Library
					</h1>
					<p className="mt-2 text-lg text-gray-600">
						A visual test suite for all application components.
					</p>
				</div>

				{/* 1. MARKERS */}
				<DemoSection title="Markers, Badges & Tags">
					<div className="flex gap-4 mb-4">
						<Marker name="hit" size="sm" />
						<Marker name="hit" size="md" />
					</div>
					<div className="flex gap-4 mb-4">
						<Tag
							label="Argentina"
							onClick={() => {}}
							id="argentina"
						></Tag>
						<Tag
							label="Your mamma"
							onClick={() => {}}
							id="your_mamma"
						></Tag>
					</div>
					<div className="flex gap-4">
						<Badge variant="warning" icon={Truck}>
							Shipped
						</Badge>
						<Badge variant="warning">Nº8149249</Badge>
						<Badge variant="success" icon={Check}>
							Delivered
						</Badge>
						<Badge variant="error" icon={AlertTriangle}>
							Canceled
						</Badge>
						<Badge variant="neutral" icon={ListOrdered}>
							Ordered
						</Badge>
						<Badge variant="mystery">Return Received</Badge>
					</div>
				</DemoSection>

				{/* 2. PRODUCT CARDS */}
				<DemoSection title="Product Cards">
					<div className="flex flex-wrap gap-6 items-start">
						<ProductCard
							title="Versace Eros Flame"
							productId="prod-001"
							imageUrl="https://i.makeup.it/u/uf/uf0jgxb7gg2e.jpg"
							markers={["hit"]}
							wishlist={false}
							volume={2}
							rating={4.5}
							price={200}
						/>
						<ProductCard
							title="Dior Sauvage Elixir"
							productId="prod-002"
							imageUrl="https://i.makeup.it/u/ux/uxuxdj4ehyen.jpg"
							markers={["hit", "hit"]}
							wishlist={true}
							volume={1}
							rating={5.0}
							price={9999}
						/>
						<ProductCard
							title="Chanel Bleu"
							productId="prod-003"
							imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
							markers={[]}
							wishlist={true}
							volume={1}
							rating={4.2}
							price={200}
						/>
					</div>
				</DemoSection>

				{/* 3. SEARCH CARDS */}
				<DemoSection title="Search / Horizontal Cards">
					<div className="flex flex-wrap gap-6">
						<SearchResultItem
							title="Versace Eros Flame"
							productId="sc-001"
							productCode="01203213"
							quantityInStock={10}
							imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
							volume={2}
							rating={4.5}
							price={4999}
						/>
						<SearchResultItem
							title="Versace Eros Flame (Out of Stock)"
							productId="sc-002"
							productCode="01203213"
							quantityInStock={0}
							imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
							volume={2}
							rating={4.5}
							price={4999}
						/>
					</div>
				</DemoSection>

				{/* 4. CART ITEMS (Main Page) */}
				<DemoSection title="Cart Items (Main)">
					<div className="flex flex-col gap-6">
						<CartItem
							title="Versace Eros Flame"
							productId="cart-001"
							productCode="01203213"
							quantityInStock={11}
							imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
							volume={2}
							pricePerItem={4999}
							quantity={1}
							onDelete={() => console.log("Deleted")}
						/>
						<CartItem
							title="Expensive Limited Edition"
							productId="cart-002"
							productCode="01203213"
							quantityInStock={0}
							imageUrl="https://i.makeup.it/2/2p/2pj8d0xfdqe0.jpg"
							volume={2}
							pricePerItem={11999}
							quantity={1}
							onDelete={() => console.log("Deleted")}
						/>
					</div>
				</DemoSection>

				{/* 5. CART DRAWER ITEMS */}
				<DemoSection title="Cart Drawer Items (Sidebar)">
					{/* Simulating a narrow drawer container */}
					<div className="w-[360px] bg-white p-4 border border-gray-200 shadow-sm flex flex-col gap-6">
						<CartDrawerItem
							title="Versace Eros Flame"
							productId="drawer-001"
							productCode="01203213"
							quantityInStock={11}
							imageUrl="https://i.makeup.it/1/1x/1xkz6atfgthd.jpg"
							volume={2}
							pricePerItem={4999}
							quantity={1}
							onDelete={() => console.log("Deleted")}
						/>
						<CartDrawerItem
							title="Versace Eros Flame"
							productId="drawer-002"
							productCode="01203213"
							quantityInStock={0}
							imageUrl="https://i.makeup.it/1/1x/1xkz6atfgthd.jpg"
							volume={2}
							pricePerItem={4999}
							quantity={1}
							onDelete={() => console.log("Deleted")}
						/>
					</div>
				</DemoSection>

				{/* 6. STEPPERS */}
				<DemoSection title="Steppers & Inputs">
					<div className="flex gap-8 items-center">
						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-500">
								Standard (Max 99)
							</span>
							<Stepper
								value={cartQuantity1}
								onChange={setCartQuantity1}
								max={99}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-500">
								Limited (Max 10)
							</span>
							<Stepper
								value={cartQuantity2}
								onChange={setCartQuantity2}
								max={10}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-500">
								Disabled
							</span>
							<Stepper
								value={cartQuantity3}
								onChange={setCartQuantity3}
								max={10}
								disabled
							/>
						</div>

						<div className="flex flex-col gap-2">
							<span className="text-sm text-gray-500">
								Small Variant
							</span>
							<Stepper
								value={cartQuantity1}
								onChange={setCartQuantity1}
								max={99}
								size="sm"
							/>
						</div>
					</div>
				</DemoSection>

				{/* 7. COMMENTS */}
				<DemoSection title="Comment Cards">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						<CommentCard
							userAvatarUrl=""
							userName="Nazar"
							dateCommentLeft="11.11"
							rating={4.4}
							text="I am pleasantly surprised by the service and quality of the fragrances! I ordered some perfume, and it arrived very quickly."
						/>
						<CommentCard
							userAvatarUrl=""
							userName="Nazar Kyselov"
							dateCommentLeft="24.12"
							rating={4.9}
							text="This long comment demonstrates how the card handles wrapping text. It should look clean and not break the layout."
						/>
						<CommentCard
							userAvatarUrl=""
							userName="Misha"
							dateCommentLeft="31.12"
							rating={5.0}
							text="Short comment."
						/>
					</div>
				</DemoSection>

				{/* 8. AVATARS */}
				<DemoSection title="Avatars">
					<div className="flex flex-col gap-8">
						{/* Row 1: Images */}
						<div className="flex items-end gap-6">
							<Avatar
								src="https://github.com/shadcn.png"
								alt="User"
								size="xl"
							/>
							<Avatar
								src="https://github.com/shadcn.png"
								alt="User"
								size="lg"
							/>
							<Avatar
								src="https://github.com/shadcn.png"
								alt="User"
								size="md"
							/>
							<Avatar
								src="https://github.com/shadcn.png"
								alt="User"
								size="sm"
							/>
						</div>
						{/* Row 2: Fallbacks */}
						<div className="flex items-end gap-6">
							<Avatar alt="Misha Kulkin" size="xl" />
							<Avatar alt="Misha Kulkin" size="lg" />
							<Avatar alt="Misha Kulkin" size="md" />
							<Avatar alt="Misha Kulkin" size="sm" />
						</div>
					</div>
				</DemoSection>

				{/* 9. NAVIGATION */}
				<DemoSection title="Navigation & Breadcrumbs">
					<Breadcrumbs items={crumbs} />
				</DemoSection>
				{/* 9. Sorting Dropdown */}
				<DemoSection title="Sorting Dropdown">
					<div className="flex justify-end h-[220px]">
						<Sorting criteria={sorting.criteria} onChange={(criteria, order) => {console.log(criteria, order); setSorting({criteria, order})}} order={sorting.order} />
					</div>
				</DemoSection>
			</div>
			<Footer />
		</div>
	);
}
