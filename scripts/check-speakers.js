const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const speakers = await prisma.speaker.findMany();
        console.log('SPEAKER_COUNT:', speakers.length);
        console.log('SPEAKERS:', JSON.stringify(speakers, null, 2));
    } catch (error) {
        console.error('Error fetching speakers:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
