// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    "Guides",
    "PvP",
    "PvE",
    "Crafting",
    "Housing",
    "Roleplay",
    "Events",
    "Patch Notes",
    "Builds",
    "Meta",
    "Lore",
    "Trading",
    "Guild News",
    "Alliance War",
    "Fishing",
    "Leveling",
    "Gear",
    "Dungeons",
    "Trials",
    "Community",
  ];

  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("✅ Categories seeded.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
