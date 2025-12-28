const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing connection to:', process.env.DATABASE_URL);
        const tickets = await prisma.ticket.findMany({ take: 5 });
        console.log('SUCCESS: Fetched', tickets.length, 'tickets');
        console.log('TICKETS:', JSON.stringify(tickets, null, 2));
    } catch (error) {
        console.error('ERROR during connection test:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
