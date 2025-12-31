const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        console.log('Testing connection...');
        await prisma.$connect();
        console.log('Successfully connected to database.');

        console.log('Testing Partnership table...');
        const count = await prisma.partnership.count();
        console.log('SUCCESS: Partnership table exists. Current count:', count);
    } catch (error) {
        console.error('--- ERROR DETAILS ---');
        console.error('Code:', error.code);
        console.error('Message:', error.message);
        if (error.message.includes('not found') || error.message.includes('does not exist')) {
            console.log('\nTIP: The Partnership table is missing. Run "npx prisma db push"');
        }
    } finally {
        await prisma.$disconnect();
    }
}

main();
