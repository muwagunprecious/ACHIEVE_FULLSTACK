const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    // 1. Seed Admin
    const email = 'admin@achieverssummit.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            id: 'admin_primary',
            email,
            name: 'Super Admin',
            password: hashedPassword,
            role: 'admin',
        },
    });

    console.log('✅ Admin seeded:', admin.email);

    // 2. Clear old categories to ensure fresh start
    await prisma.ticketCategory.deleteMany({});
    console.log('🗑️ Old categories cleared');

    // 3. Seed Ticket Categories
    const categories = [
        {
            id: 'cat_regular',
            name: 'REGULAR',
            price: 0,
            description: 'Access to the Summit with overflow seating.',
            capacity: 2000,
            features: [
                'Access to the Summit',
                'Reserved seating in the Overflow Auditorium',
                'Light refreshments',
                'Free transportation (designated routes)'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_economy',
            name: 'ECONOMY',
            price: 20000,
            description: 'Full access with main hall seating.',
            capacity: 1000,
            features: [
                'Full access to the Summit',
                'Reserved Economy Seating in Main Hall',
                'One-course meal',
                'Free transportation to the venue',
                'Hard copy Certificate',
                'Economy Souvenir Pack',
                'Summit Raffle Draw eligibility'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_business',
            name: 'BUSINESS CLASS',
            price: 250000,
            description: 'VIP access and networking opportunities.',
            capacity: 300,
            features: [
                'VIP Access both days',
                'Reserved Business Class Seating',
                'Two-course buffet lunch',
                'Executive transportation & VIP fast-track',
                'Silver-framed Certificate',
                'Exclusive Business Souvenir Pack',
                'Access to VIP Deal Room',
                'Private Dinner & Award Night access',
                '1-2 Months Elite Network Membership',
                'Digital Resource Hub access',
                'Priority Future Event Invitation',
                'CPD-certified leadership certificate'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_firstclass',
            name: 'FIRST CLASS',
            price: 500000,
            description: 'Luxury experience with VVIP status.',
            capacity: 100,
            features: [
                'VVIP Access both days',
                'Front Row VVIP Seating',
                'Three-course buffet lunch',
                'VVIP Lounge & Dinner access',
                'One-night Executive Hotel',
                'Executive chauffeured transport',
                'Gold-framed Certificate',
                'Exclusive First Class Souvenir Pack',
                'Meet-and-Greet with Speakers',
                'CPD-Accredited Leadership Certificate',
                'Red Carpet Photo Session',
                '3-6 Months Elite Network Membership',
                'Policy Brief / Economic Report',
                'Closed-door leadership roundtable access'
            ],
            status: 'ACTIVE'
        },
        {
            id: 'cat_bizjet',
            name: 'EXCLUSIVE BIZJET',
            price: 1500000,
            description: 'Ultimate elite privileges and investor visibility.',
            capacity: 5,
            features: [
                'Unrestricted VVIP Access',
                'Speakers & Partners VVIP Lounge access',
                'Executive SUV & Protocol Services',
                'Luxury VVIP Gift Box',
                'Priority Airport Shuttle & Parking',
                'Dedicated Personal Event Assistant',
                'Complimentary VVIP Attaché Pass',
                'Investor Introductions in Deal Room',
                'Partner Gold Award Trophy',
                'Media Brand Spotlight',
                'Premium Exhibition Arena allocation',
                'VVIP Partner Recognition on all materials',
                '6-12 Months Elite Network Membership',
                'Physical Book by Convener',
                'Guaranteed investor introduction'
            ],
            status: 'ACTIVE'
        }
    ];

    for (const cat of categories) {
        await prisma.ticketCategory.upsert({
            where: { id: cat.id },
            update: cat,
            create: cat,
        });
    }

    console.log('✅ Ticket Categories seeded');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
