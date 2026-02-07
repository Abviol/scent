"use server";

import Breadcrumbs, { BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { ProductType } from "@/lib/types";
import { ProductsSliderSection } from "./productsSliderSection";
import ProductInfoSection from "./productInfoSection";

type ProductPageProps = {
	params: Promise<{ id: string }>;
};

// Mimic a DB-request
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

		variants: [
			{
				volume: 0,
				price: 4999,
				discountedPrice: undefined,
				wishlist: true,
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
				quantityInStock: 1,
			},
			{
				volume: 1,
				price: 6999,
				discountedPrice: 5794,
				wishlist: true,
				imageUrls: [
					"https://i.makeup.it/9/9i/9iajbg7jxhit.jpg",
					"https://i.makeup.it/o/oc/oct1za9lqofn.jpg",
					"https://i.makeup.it/o/oc/oct1za9lqofn.jpg",
					"https://i.makeup.it/w/wz/wzyoa9i8eafq.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
				],
				quantityInStock: 0,
			},
			{
				volume: 2,
				price: 7999,
				wishlist: true,
				discountedPrice: undefined,
				imageUrls: [
					"https://i.makeup.it/9/9i/9iajbg7jxhit.jpg",
					"https://i.makeup.it/o/oc/oct1za9lqofn.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
					"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
				],
				quantityInStock: 12,
			},
		],
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
		markers: ["hit"],
	};
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { id } = await params;
	const product = await getProduct(id);

	const breadcrumbsItems: BreadcrumbItem[] = [
		{ label: "Scent", href: "/" },
		{ label: "Shop", href: "/shop" },
		{ label: product.title, href: "" },
	];

	

	return (
		<main className="my-20">
			<div className="mb-15 flex flex-row justify-center">
				<Breadcrumbs items={breadcrumbsItems} />
			</div>

			{/* product info */}
			<ProductInfoSection product={product} />

			{/* similar products */}
			<ProductsSliderSection
				title="Similar Products"
				products={Array.from({ length: 8 }, () => product)}
				/>
			{/* Specially for you products */}
			<ProductsSliderSection
				title="Specially for you"
				products={Array.from({ length: 8 }, () => product)}
			/>
		</main>
	);
}
