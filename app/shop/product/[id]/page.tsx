"use server";

import BookmarkButton from "@/components/bookmarkButton";
import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import Rating from "@/components/ui/rating";
import {
	getAvailability,
	getAvailabilityClass,
	getEuro,
	volEnumToNumber,
} from "@/lib/utils";
import Link from "next/link";
import ProductGallery from "./productGallery";
import { ProdTab, ProdTabList, ProdTabPanel, ProdTabs } from "./prodDetailTabs";
import { ProductType } from "@/lib/types";
import { ProductsSliderSection } from "./productsSliderSection";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

async function getProduct(id: string): Promise<ProductType> {
	await new Promise((resolve) => setTimeout(resolve, 0));

	return {
		id,
		code: 123456,
		title: "Jean Paul Gaultier Le Beau",
		rating: 4.4,
		reviewsAmount: 100,
		type: "Eau de Toilette",
		tags: [],
		categories: ["men"],
		brand: "Versace",
		imageUrls: [
			"https://i.makeup.it/9/9i/9iajbg7jxhit.jpg",
			"https://i.makeup.it/o/oc/oct1za9lqofn.jpg",
			"https://i.makeup.it/w/wz/wzyoa9i8eafq.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
		],
		variants: [0, 1, 2],
		selectedVariant: 2,
		wishlist: true,
		price: 4999,
		discounted: false,
		discountedPrice: 2999,
		description:
			"L'eau de toilette Jean Paul Gaultier Le Beau è un’originale fragranza maschile legnosa-fougère rilasciata nel 2019. È un vero e proprio elisir perfetto per gli uomini seducenti e sexy. L'individualità e la rara esclusività del carattere della composizione sono evidenziate anche dal design del flacone, creato dai migliori designer del marchio. La fragranza è presentata in un'elegante bottiglia di vetro verde scuro, seguendo le linee di un torso maestoso e coraggioso, simile ai dipinti raffiguranti il ​​dio greco Apollo. I creatori hanno deciso di non aggiungere alcun tapo per non distrarre l'attenzione dal design del flacone. L'insolita fragranza si apre con note di bergamotto, che incanta con il suono verde, floreale e leggermente fruttato. Quando le note di testa si dissolvono, il cuore del profumo si rivela con la piacevole nota esotica di cocco. La scia finale avvolge a lungo con note di fava tonka, che esalta la profondità del suono, conferendo alla composizione un suono incredibilmente persistente.",
		details: {
			"Lanciato sul mercato": 2019,
			Marchio: "Jean Paul Gaultier",
			Serie: "Le Beau",
			"Gruppo di prodotti": "Eau de Toilette",
			Classificazione: "Di lusso",
			Volume: "75 ml",
			"Paese TM": "Francia",
			Produttore:
				"PUIG, Plaza Europa, 46-48, 08902 – L’Hospitalet de Llobregat, Barcellona, Spagna, consumercare@puig.com",
			"Precauzioni d'uso":
				"Evitare il contatto con gli occhi, Facilmente infiammabile, Non utilizzare vicino al fuoco o a sostanze infiammabili, Tenere fuori dalla portata dei bambini",
			Profumiere: "Quentin Bisch",
			"Made in": "Francia, Spania",
			Sesso: "Uomo",
			"Tipo di aroma": "Aromatico, Legnoso",
			"Note di testa": "Bergamotto",
			"Note di cuore": "Noce di cocco",
			"Note di base": "Fava tonka",
		},
		ingredients:
			"Alcohol Denat., Aqua (Water), Parfum (Fragrance), Coumarin, Linalool, Alpha-Isomethyl Ionone, Butyl Methoxydibenzoylmethane, Limonene, Anise Alcohol, Cinnamal, Benzyl Alcohol, Hydroxycitronellal, Citral,  Citronellol, Eugenol, Geraniol.",
		quantityInStock: 1,
		markers: ["hit"],
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = await getProduct(id);

	const availability = getAvailability(product.quantityInStock);
	const availabilityClass: string = getAvailabilityClass(availability);

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: product.title, href: "" },
	];

	const tabsConfig = [
		product.details
			? {
					title: "Details",
					content: (
						<ul className="flex flex-col gap-3">
							{Object.entries(product.details).map((v, i) => (
								<li key={v[0] + i}>
									<strong className="font-semibold">
										{v[0]}
									</strong>
									:{" "}
									<span className="text-slate-500">
										{v[1]}
									</span>
								</li>
							))}
						</ul>
					),
				}
			: null,
		product.description
			? {
					title: "Description",
					content: (
						<p className="leading-relaxed">{product.description}</p>
					),
				}
			: null,
		product.ingredients
			? {
					title: "Ingredients",
					content: <p>{product.ingredients}</p>,
				}
			: null,
	].filter((item) => item !== null);

	return (
		<main className="my-20">
			<div className="mb-15 flex flex-row justify-center">
				<Breadcrumbs items={breadcrumbsItems} />
			</div>

			{/* product info */}
			<section id="product-info">
				<div className="grid grid-cols-[2fr_3fr] gap-x-6 mb-15">
					{/* product gallery */}
					<ProductGallery
						imageUrls={product.imageUrls}
						title={product.title}
					/>
					{/* main info */}
					<div className="w-full flex flex-col gap-y-8">
						<div className="flex flex-row justify-between items-center">
							<h1 className="text-3xl leading-12 font-semibold whitespace-normal">
								{product.title}
							</h1>
							<div className="flex flex-row shrink-0 gap-x-2 ml-3">
								<Rating
									rating={product.rating}
									reviewsAmount={product.reviewsAmount}
								/>
								<BookmarkButton
									productId={product.id}
									wishlist={product.wishlist}
								/>
							</div>
						</div>

						<div className="flex flex-row justify-between items-center">
							<span className="text-2xl font-semibold">
								{volEnumToNumber(product.selectedVariant)} ml
							</span>
							<div className="flex flex-row gap-x-3">
								{product.variants.map((variant, i) => (
									<Link
										key={i}
										href={"/shop/product/new-id"}
										className={`flex justify-center w-[100px] py-0.5 rounded-sm text-lg font-semibold border-2 ${variant == product.selectedVariant ? "bg-accent text-white border-accent" : "bg-white  border-slate-200 text-foreground hover:bg-slate-200"}`}
									>
										{volEnumToNumber(variant)}ml
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-row justify-between">
							<span className="text-lg font-semibold text-slate-500">
								Product code -{" "}
								<span className="text-foreground">
									{product.code}
								</span>
							</span>
							<span
								className={`text-xl font-semibold capitalize leading-7 ${availabilityClass}`}
							>
								{availability}
							</span>
						</div>

						<div className="flex flex-row justify-between">
							{product.discounted ? (
								<div className="flex flex-row gap-5 items-center">
									<span className="text-4xl text-red-600 font-semibold">
										{getEuro(product.discountedPrice)}
									</span>
									<span className="text-slate-500 text-xl line-through">
										{getEuro(product.price)}
									</span>
								</div>
							) : (
								<span className="text-4xl font-semibold">
									{getEuro(product.price)}
								</span>
							)}
							<Button
								size="lg"
								className="h-15 w-full max-w-[260px] text-2xl font-semibold"
								disabled={product.quantityInStock == 0}
							>
								Buy
							</Button>
						</div>
					</div>
				</div>

				{/* additional info */}
				{tabsConfig.length > 0 && (
					<ProdTabs>
						<ProdTabList>
							{tabsConfig.map((tab, index) => (
								<ProdTab
									key={"tab" + tab.title}
									index={index}
									title={tab.title}
								/>
							))}
						</ProdTabList>
						{tabsConfig.map((tab, index) => (
							<ProdTabPanel
								key={"tabpanel" + tab.title}
								index={index}
							>
								{tab.content}
							</ProdTabPanel>
						))}
					</ProdTabs>
				)}
			</section>

			{/* similar products NOTE: skipped in beta */}
			<ProductsSliderSection
				title="Similar Products"
				products={Array.from({ length: 8 }, () => product)}
			/>
			<ProductsSliderSection
				title="Specially for you"
				products={Array.from({ length: 8 }, () => product)}
			/>
		</main>
	);
}
