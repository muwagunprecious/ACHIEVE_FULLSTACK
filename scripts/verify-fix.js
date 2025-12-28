const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function verify() {
    console.log("Verifying Dashboard Queries...");
    try {
        // Query from dashboard page.js
        const ticketsWithCategory = await prisma.ticket.findMany({
            include: { category: true },
            take: 1
        });
        console.log("✅ Dashboard Query (category) Success:", ticketsWithCategory.length > 0 ? "Data found" : "Empty (OK)");

        // Query from tickets management page
        const ticketsWithUserAndCategory = await prisma.ticket.findMany({
            include: { user: true, category: true },
            take: 1
        });
        console.log("✅ Tickets Page Query (user & category) Success:", ticketsWithUserAndCategory.length > 0 ? "Data found" : "Empty (OK)");

    } catch (error) {
        console.error("❌ Verification Failed:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

verify();
