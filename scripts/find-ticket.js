const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const ticket = await prisma.eventTicket.findFirst();
    if (ticket) {
        console.log('VALID_TICKET_ID:', ticket.ticketId);
    } else {
        console.log('NO_TICKET_FOUND');
    }
    await prisma.$disconnect();
}

main().catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
