const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedAdmin() {
    try {
        console.log('🌱 Seeding admin user...');

        // Check if admin already exists
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: 'admin@achieverssummit.com' }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists');
            return;
        }

        // Create admin user
        const hashedPassword = await bcrypt.hash('Admin@2026', 10);

        const admin = await prisma.admin.create({
            data: {
                email: 'admin@achieverssummit.com',
                password: hashedPassword,
                name: 'Summit Administrator',
                role: 'admin'
            }
        });

        console.log('✅ Admin user created successfully');
        console.log('📧 Email: admin@achieverssummit.com');
        console.log('🔑 Password: Admin@2026');
        console.log('⚠️  Please change the password after first login');

    } catch (error) {
        console.error('❌ Error seeding admin:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmin();
