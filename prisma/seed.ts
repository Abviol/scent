import { PrismaClient } from "../app/generated/prisma-client/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // ---------------------------------------------------------------------------
  // 1. CLEAN DB (dev only)
  // ---------------------------------------------------------------------------
  await prisma.returnItem.deleteMany();
  await prisma.return.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.fragranceVariant.deleteMany();
  await prisma.image.deleteMany();
  await prisma.fragrance.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  console.log("🗑️ Database cleaned.");

  // ---------------------------------------------------------------------------
  // 2. CREATE ADMIN USER
  // ---------------------------------------------------------------------------
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      password_hash: adminPassword,
      role: "ADMIN",
      name: "Admin",
      surname: "User",
      address: {
        create: {
          fullName: "Admin User",
          country: "Italy",
          city: "Verona",
          postcode: "37100",
          streetLine: "Via Roma 1",
        },
      },
    },
  });

  console.log("👑 Admin user created:", admin.email);

  // ---------------------------------------------------------------------------
  // 3. BRANDS
  // ---------------------------------------------------------------------------
  const brandNames = [
    "Dior",
    "Chanel",
    "Tom Ford",
    "Versace",
    "Yves Saint Laurent",
    "Gucci",
  ];

  const brands = await Promise.all(
    brandNames.map((name) =>
      prisma.brand.create({
        data: { name },
      })
    )
  );

  console.log("🏷️ Brands created:", brands.length);

  // ---------------------------------------------------------------------------
  // 4. CATEGORIES
  // ---------------------------------------------------------------------------
  const categories = await prisma.category.createMany({
    data: [
      { name: "Fresh" },
      { name: "Oriental" },
      { name: "Citrus" },
      { name: "Floral" },
      { name: "Woody" },
      { name: "Spicy" },
    ],
  });

  console.log("📦 Categories created:", categories.count);

  // ---------------------------------------------------------------------------
  // 5. TAGS
  // ---------------------------------------------------------------------------
  const tags = await prisma.tag.createMany({
    data: [
      { name: "New", color: "#4CAF50", iconName: "sparkles" },
      { name: "Bestseller", color: "#FFC107", iconName: "star" },
      { name: "Luxury", color: "#9C27B0", iconName: "diamond" },
      { name: "Daily", color: "#2196F3", iconName: "sun" },
      { name: "Strong", color: "#F44336", iconName: "fire" },
      { name: "Soft", color: "#00BCD4", iconName: "feather" },
      { name: "Warm", color: "#FF5722", iconName: "flame" },
      { name: "Cool", color: "#03A9F4", iconName: "snowflake" },
      { name: "Popular", color: "#795548", iconName: "heart" },
      { name: "Premium", color: "#673AB7", iconName: "crown" },
      { name: "Rare", color: "#009688", iconName: "gem" },
      { name: "Classic", color: "#607D8B", iconName: "history" },
    ],
  });

  console.log("🏷️ Tags created:", tags.count);

  // ---------------------------------------------------------------------------
  // 6. FRAGRANCES & VARIANTS
  // ---------------------------------------------------------------------------

  const sampleFragrances = [
    {
      title: "Dior Sauvage",
      brand: "Dior",
      gender: "MALE",
      categories: ["Fresh", "Spicy"],
      description: "A fresh yet powerful fragrance with pepper and bergamot.",
      variants: [
        { volume: "ML30", price: 6900 },
        { volume: "ML50", price: 8800 },
        { volume: "ML100", price: 12900 },
      ],
    },
    {
      title: "Chanel No.5",
      brand: "Chanel",
      gender: "FEMALE",
      categories: ["Floral"],
      description: "The classic floral fragrance that changed perfumery forever.",
      variants: [
        { volume: "ML30", price: 8200 },
        { volume: "ML50", price: 10900 },
      ],
    },
    {
      title: "Tom Ford Black Orchid",
      brand: "Tom Ford",
      gender: "UNISEX",
      categories: ["Oriental", "Woody"],
      description: "Rich, dark accords and seductive florals.",
      variants: [
        { volume: "ML50", price: 13500 },
        { volume: "ML100", price: 18500 },
      ],
    },
    {
      title: "Versace Eros",
      brand: "Versace",
      gender: "MALE",
      categories: ["Fresh", "Woody"],
      description: "Vibrant fragrance with apple, mint, and vanilla.",
      variants: [
        { volume: "ML30", price: 5900 },
        { volume: "ML100", price: 9900 },
      ],
    },
    {
      title: "YSL Libre",
      brand: "Yves Saint Laurent",
      gender: "FEMALE",
      categories: ["Floral"],
      description: "Lavender essence combined with orange blossom.",
      variants: [
        { volume: "ML50", price: 9500 },
        { volume: "ML100", price: 13900 },
      ],
    },
    {
      title: "Gucci Bloom",
      brand: "Gucci",
      gender: "FEMALE",
      categories: ["Floral"],
      description: "A celebration of the authenticity and vitality of women.",
      variants: [
        { volume: "ML50", price: 8700 },
        { volume: "ML100", price: 12200 },
      ],
    },
  ];

  for (const f of sampleFragrances) {
    const brand = brands.find((b) => b.name === f.brand)!;

    const fragrance = await prisma.fragrance.create({
      data: {
        title: f.title,
        rating: 0,
        reviews: 0,
        characteristics: {
          description: f.description,
        },
        composition: {
          create: {
            brandId: brand.id,
            gender: f.gender as any,
            origin: "France",
          },
        },
        categories: {
          connect: f.categories.map((c) => ({ name: c })),
        },
      },
    });

    console.log("🧴 Fragrance created:", fragrance.title);

    // Create variants
    for (const v of f.variants) {
      const variant = await prisma.fragranceVariant.create({
        data: {
          fragranceId: fragrance.id,
          volume: v.volume as any,
          price: v.price,
          quantityInStock: Math.floor(Math.random() * 50) + 10,
          discountAvailability: Math.random() > 0.6,
          discountPercentage: Math.random() > 0.5 ? 10 : null,
          images: {
            create: [
              {
                url: `https://placehold.co/600x800?text=${encodeURIComponent(
                  fragrance.title
                )}+${v.volume}`,
                fragranceId: fragrance.id,
                order: 0,
              },
            ],
          },
        },
      });

      console.log(`   → Variant: ${v.volume}, €${v.price / 100}`);
    }
  }

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
