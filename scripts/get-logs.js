const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const activities = await prisma.activity.findMany({
            take: 20,
            orderBy: { createdAt: 'desc' }
        });
        console.log(JSON.stringify(activities, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
