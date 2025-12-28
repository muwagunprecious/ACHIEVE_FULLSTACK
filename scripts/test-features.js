const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testFeatures() {
    console.log("Testing Ticket Features Update...");
    try {
        // Find a category
        const category = await prisma.ticketCategory.findFirst();
        if (!category) {
            console.log("No categories found to test.");
            return;
        }

        console.log(`Updating category: ${category.name}`);

        // Update with features
        const updated = await prisma.ticketCategory.update({
            where: { id: category.id },
            data: {
                features: ["Front Row Seating", "VIP Lounge Access", "Gala Dinner"]
            }
        });

        console.log("✅ Update Success. Features:", updated.features);

        // Verify we can read it back
        const verified = await prisma.ticketCategory.findUnique({
            where: { id: category.id }
        });

        if (verified.features.length === 3) {
            console.log("✅ Verification Success: Features stored correctly.");
        } else {
            console.log("❌ Verification Failed: Features not stored correctly.");
        }

    } catch (error) {
        console.error("❌ Test Failed:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

testFeatures();
