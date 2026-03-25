import { CommentCardProps } from "@/components/commentCard/commentCard";
import { BrandType, FilterState, ProductType } from "./types";

const PRODUCTS: ProductType[] = [
	{
		id: "asdf-werg-cfad",
		code: 123456,
		name: "Jean Paul Gaultier Le Beau",
		imageUrls: [
			"https://i.makeup.it/9/9i/9iajbg7jxhit.jpg",
			"https://i.makeup.it/o/oc/oct1za9lqofn.jpg",
			"https://i.makeup.it/w/wz/wzyoa9i8eafq.jpg",
			"https://i.makeup.it/7/7u/7ukogdy4r4na.jpg",
		],
		rating: 4.4,
		reviewsAmount: 100,
		type: "Eau de Toilette",
		tags: [],
		gender: "men",
		brand: "Jean Paul Gaultier",
		variants: [
			{
				volume: 30,
				price: 4999,
				discountedPrice: undefined,
				wishlist: true,
				quantityInStock: 1,
			},
			{
				volume: 50,
				price: 6999,
				discountedPrice: 5794,
				wishlist: true,
				quantityInStock: 0,
			},
			{
				volume: 75,
				price: 7999,
				wishlist: true,
				discountedPrice: undefined,
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
	},
	{
		id: "asdf-werg-cfad",
		code: 529683,
		name: "Yves Saint Laurent Libre Intense",
		rating: 4.9,
		reviewsAmount: 142,
		type: "Eau de Parfum",
		tags: [],
		gender: "women",
		brand: "Yves Saint Laurent",
		imageUrls: [
			"https://i.makeup.it/l/l7/l7yfzcx8yetn.png",
			"https://i.makeup.it/v/vw/vwrmjmzohgco.jpg",
			"https://i.makeup.it/6/6u/6uhlhhy8uaxj.jpg",
			"https://i.makeup.it/2/2q/2qokirdaqgby.jpg",
			"https://i.makeup.it/q/qh/qhfr0bfoyr0h.jpg",
			"https://i.makeup.it/u/uz/uziryzj6tohs.jpg",
		],
		variants: [
			{
				volume: 30,
				price: 10900,
				discountedPrice: 6539,
				wishlist: true,
				quantityInStock: 1,
			},
			{
				volume: 50,
				price: 15600,
				discountedPrice: 9388,
				wishlist: true,
				quantityInStock: 34,
			},
			{
				volume: 60,
				price: 19900,
				discountedPrice: undefined,
				wishlist: true,
				quantityInStock: 12,
			},
		],
		description:
			"L'eau de parfum Yves Saint Laurent Libre Intense è un'intensa fragranza floreale per tutte le donne libere di esprimersi così come sono e di vivere secondo il proprio istinto. La donna \"libera\" scatena i suoi istinti più ardenti. Audace, attira nel profondo di sé una forza sovversiva e potente per gridare la sua libertà illimitata e senza compromessi. L'incantevole fragranza femminile si rivela con note di lavanda, mandarino e bergamotto. \
			Il cuore dell'aroma rivela una combinazione floreale senza pari di lavanda, fiore d'arancio tunisino, gelsomino Sambac e orchidea. Questo bouquet unico trova il suo completamento in un sillage persistente, in cui si intrecciano armoniosamente note di vaniglia del Madagascar,  fava tonka, ambra grigia e vetiver. La fragranza è racchiusa in un flacone attorcigliato da un accessorio lussuoso e di grandi dimensioni. Il logo iconico del brand è incastonato nel vetro come un gioiello. Catene dorate e un tappo asimmetrico laccato nero adornano questo flacone couture, facendolo diventare anche un bellissimo accessorio oltre a un'incantevole fragranza.",
		details: {
			"Lanciato sul mercato": 2020,
			Marchio: "Yves Saint Laurent",
			Serie: "Libre Intense",
			"Gruppo di prodotti": "Eau de Parfum",
			Classificazione: "Di lusso",
			Volume: "30 ml, 50 ml, 90 ml",
			"Paese TM": "Francia",
			Tipo: "intensivo",
			Collezione: "Libre",
			Produttore:
				"YSL BEAUTÉ, 14, rue Royale, 75008 Parigi, Francia, contact@loreal.com",
			"Precauzioni d'uso":
				"Evitare il contatto con gli occhi, Facilmente infiammabile, Non utilizzare vicino al fuoco o a sostanze infiammabili, Tenere fuori dalla portata dei bambini",
			Profumiere: "Anne Flipo, Carlos Benaim",
			"Made in": "Francia",
			Sesso: "Donna",
			"Tipo di aroma": "Fougere, Orientale",
			"Note di testa": "Bergamotto, Lavanda, Mandarino",
			"Note di cuore":
				"Fiore di arancio, Gelsomino di sambac, Lavanda, Orchidea",
			"Note di base":
				"Ambra grigia, Fava tonka, Vaniglia di Madagascar, Vetiver",
		},
		ingredients: undefined,
		markers: ["hit"],
	},
	{
		id: "asdf-wedg-cfad",
		code: 422454,
		name: "Montblanc Explorer",
		rating: 4.9,
		reviewsAmount: 352,
		type: "Eau de Parfum",
		tags: [],
		gender: "men",
		brand: "Montblanc",
		imageUrls: [
			"https://i.makeup.it/2/2h/2h0tbxmkoqlr.jpg",
			"https://i.makeup.it/k/kg/kgdgremnqrkg.jpg",
			"https://i.makeup.it/p/pm/pme2fz4v2ocd.jpg",
			"https://i.makeup.it/q/qt/qta5xslqbzqv.jpg",
			"https://i.makeup.it/b/bz/bzyzdgg98hcd.jpg",
			"https://i.makeup.it/y/yr/yr4d1ifdw0rc.jpg",
			"https://i.makeup.it/n/nx/nxwoowtpvrkqf.jpg",
			"https://i.makeup.it/i/is/isypg80tyziu.jpg",
		],
		variants: [
			{
				volume: 60,
				price: 5100,
				discountedPrice: 4550,
				wishlist: true,
				quantityInStock: 1,
			},
			{
				volume: 100,
				price: 7084,
				discountedPrice: undefined,
				wishlist: true,
				quantityInStock: 34,
			},
			{
				volume: 200,
				price: 9894,
				discountedPrice: undefined,
				wishlist: true,
				quantityInStock: 12,
			},
		],
		description:
			"Mont Blanc Explorer è una straordinaria novità creata dai profumieri francesi Oliver Peschaux e Antonio Masondiou che impressionerà qualsiasi uomo moderno. Un aroma speziato, contrastante con note di dolcezza, spezie e freschezza insite nei profumi orientali, fin dai primi secondi eccita i sensi ed evoca vivide emozioni. Questo profumo è adatto per uomini rigorosi, sicuri di sé e rilassati che non nascondono il loro vero carattere. La composizione della fragranza si apre con le note iniziali di bergamotto aspro, pepe rosa, foglie di alloro speziate e salvia sclarea, poi note di cuoio ruvido e vetiver entrano nell'insieme, conferendo alla composizione cioccolato morbido e sfumature legnose. Satura l'aroma con una nobile e persistente sillage di ambroxan, cacao e patchouli, aggiungendo caratteristiche note orientali. Mont Blanc Explorer è la versatilità e la dinamica delle sfumature che enfatizzano mascolinità ed eleganza. Il design austero e minimalista del flacone è pienamente coerente con il carattere della fragranza, consentendo di vivere appieno la sua estetica. L'aroma caldo e ricco di Mont Blanc Explorer sarà un ottimo compagno della tua serata e suonerà particolarmente organico nella stagione fredda.",
		details: {
			"Lanciato sul mercato": 2019,
			Marchio: "Montblanc",
			Serie: "Explorer",
			"Gruppo di prodotti": "Eau de Parfum",
			Colore: "Nero",
			Classificazione: "Di lusso",
			Volume: "60 ml, 100 ml, 200 ml",
			"Paese TM": "Francia",
			"Precauzioni d'uso":
				"Evitare il contatto con gli occhi, Facilmente infiammabile, Non utilizzare vicino al fuoco o a sostanze infiammabili, Tenere fuori dalla portata dei bambini",
			Profumiere: "Antoine Maisondieu, Olivier Pescheux",
			"Made in": "Francia",
			Sesso: "Uomo",
			"Tipo di aroma": "Fougere, Legnoso",
			"Note di testa": "Bergamotto, Pepe rosa, Salvia",
			"Note di cuore": "Cuoio, Vetiver Tahitian",
			"Note di base":
				"Akigalawood, Ambroxan, Cacao, Patchouli dall'Indonesia",
		},
		ingredients:
			"INGREDIENTS: ALCOHOL DENAT. (SD ALCOHOL 39-C), PARFUM (FRAGRANCE), AQUA (WATER), ETHYLHEXYL METHOXYCINNAMATE, BUTYL METHOXYDIBENZOYLMETHANE, ETHYLHEXYL SALICYLATE, BHT, CITRAL, LIMONENE, GERANIOL, LINALOOL, CI 14700 (RED 4), CI 42090 (BLUE 1), CI 19140 (YELLOW 5).",
		markers: ["hit"],
	},
];

const MOCK_SHOP_FILTERS: FilterState = {
	searchQuery: "",

	// Min/Max for the slider
	priceRange: [0, 600],

	// Checkbox Options (Strings as they appear in DB)
	brands: [
		"Versace",
		"Jean Paul Gaultier",
		"Giorgio Armani",
		"Dior",
		"Yves Saint Laurent",
		"Montblanc",
		"Paco Rabanne",
		"Chanel",
		"Tom Ford",
		"Creed",
		"Hermès",
		"Dolce & Gabbana",
		"Hugo Boss",
		"Gucci",
		"Prada",
		"Valentino",
		"Givenchy",
	],

	genders: ["men", "women", "unisex"],

	volumes: ["30", "50", "75", "90", "100", "125", "150", "200"],

	markers: [
		"hot",
		"Bestseller",
		"Discounted",
		"Limited Edition",
		"Staff Pick",
	],

	// Bonus: If you want to filter by concentration (EDT/EDP)
	types: [
		"Eau de Toilette",
		"Eau de Parfum",
		"Parfum",
		"Extrait de Parfum",
		"Eau de Cologne",
	],

	page: 1,
};

const HOME_COMMENTS: CommentCardProps[] = Array.from(
	{ length: 12 },
	(v, key) => {
		return key % 2 == 0
			? {
					userAvatarUrl: "https://github.com/shadcn.png",
					userName: "Nazar",
					dateCommentLeft: "11.11",
					rating: 4.4,
					text: "I am pleasantly surprised by the service and quality of the fragrances! I ordered some perfume, and it arrived very quickly.",
				}
			: {
					userAvatarUrl: "",
					userName: "Misha",
					dateCommentLeft: "02.01",
					rating: 4.9,
					text: "Satisfied.",
				};
	},
);

const BRANDS: BrandType[] = [
		"Versace",
		"Jean Paul Gaultier",
		"Giorgio Armani",
		"Dior",
		"Yves Saint Laurent",
		"Montblanc",
		"Paco Rabanne",
		"Chanel",
		"Tom Ford",
		"Creed",
		"Hermès",
		"Dolce & Gabbana",
		"Hugo Boss",
		"Gucci",
		"Prada",
		"Valentino",
		"Givenchy",
		"1million",
		"2million",
		"3million",
		"1hundred"
	].map((b) => ({id: b, name: b}));

export { PRODUCTS, MOCK_SHOP_FILTERS, HOME_COMMENTS, BRANDS };
