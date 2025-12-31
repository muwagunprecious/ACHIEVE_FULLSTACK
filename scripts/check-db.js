const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const categories = await prisma.ticketCategory.findMany();
    console.log('Categories in DB:');
    categories.forEach(c => {
        console.log(`- ${c.name}: ₦${c.price} (${c.id})`);
    });
}

check().then(() => prisma.$disconnect());
