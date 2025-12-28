const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    console.log("Seeding Ticket Categories from Landing Page...");
    try {
        const categories = [
            {
                id: 'regular-pass',
                name: 'REGULAR PASS',
                price: 0,
                capacity: 1000,
                description: 'Community Pass',
                features: [
                    'Access to the Summit',
                    'Overflow Auditorium Seating',
                    'Light refreshments',
                    'Designated Route Transport'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'economy-pass',
                name: 'ECONOMY PASS',
                price: 20000,
                capacity: 500,
                description: 'Growth Pass',
                features: [
                    'Full Main Hall Access',
                    'Economy Seating',
                    'One-course Buffet Meal',
                    'Hard copy Certificate',
                    'Souvenir Pack',
                    'Raffle Draw Entry'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'business-pass',
                name: 'BUSINESS PASS',
                price: 250000,
                capacity: 200,
                description: 'Executive Pass',
                features: [
                    'VIP Two-Day Access',
                    'Reserved Business Seating',
                    'Two-course Buffet Lunch',
                    'VIP Fast-Track Entry',
                    'Exclusive Souvenir Pack',
                    'VIP Deal Room Access',
                    'Award Night Invitation'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'first-class-pass',
                name: 'FIRST CLASS PASS',
                price: 500000,
                capacity: 50,
                description: 'Elite Pass',
                features: [
                    'VVIP Front-Row Seating',
                    'Luxury Lounge Access',
                    'Executive Hotel Stay',
                    'Chauffeured Transport',
                    'Gold-framed Certificate',
                    'Red Carpet Photo Session',
                    'Meet-and-Greet Session'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            },
            {
                id: 'bizjet-pass',
                name: 'BIZJET PASS',
                price: 1500000,
                capacity: 5,
                description: 'Institutional Pass',
                features: [
                    'Unlimited VVIP Access',
                    'Personal Event Assistant',
                    'Luxury VVIP Gift Box',
                    'Media Brand Spotlight',
                    'Partner Gold Award Trophy',
                    'Dedicated SUV & Protocol',
                    'Investor Deal Room'
                ],
                status: 'ACTIVE',
                isEnabled: true,
                updatedAt: new Date()
            }
        ];

        for (const cat of categories) {
            await prisma.ticketCategory.upsert({
                where: { id: cat.id },
                update: cat,
                create: cat
            });
        }

        console.log("✅ Seeding Success.");
    } catch (error) {
        console.error("❌ Seeding Failed:", error.message);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
