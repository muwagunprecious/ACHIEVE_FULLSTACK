const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@achievers.com';
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const admin = await prisma.admin.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password: hashedPassword,
                name: 'Super Admin',
                role: 'admin',
            },
        });
        console.log(`Admin created: ${admin.email}`);
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
