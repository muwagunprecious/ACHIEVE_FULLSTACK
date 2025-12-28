const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.admin.count();
        console.log(`Total Admins: ${count}`);
        const admins = await prisma.admin.findMany();
        console.log(admins);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
