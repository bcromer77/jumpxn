import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding JumpXN database...');

  // Hidden test admin account
  const adminHash = await bcrypt.hash('p*rr6qJ0LW', 12);
  await prisma.user.upsert({
    where: { email: 'abacus-32505efb@example.com' },
    update: {},
    create: {
      email: 'abacus-32505efb@example.com',
      hashedPassword: adminHash,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  // Seed challenges
  const challenges = [
    { id: 'ch-1', title: 'First Jump Club', discipline: 'All', difficulty: 'Beginner', description: 'Land your first jump off the JumpPack 2.0. Record it, post it, own it.', rewardBadge: 'First Flight', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
    { id: 'ch-2', title: '30-Day Pump Challenge', discipline: 'BMX', difficulty: 'Intermediate', description: 'Master the pump technique over 30 days. Build speed without pedalling.', rewardBadge: 'Pump Master', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
    { id: 'ch-3', title: '180 Milestone', discipline: 'BMX', difficulty: 'Advanced', description: 'Land a clean 180 off the ramp. Fakie or regular \u2014 your call.', rewardBadge: 'Spin Doctor', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
    { id: 'ch-4', title: 'The Founding Rider Challenge', discipline: 'All', difficulty: 'All Levels', description: 'Complete 5 coaching lessons, post your first clip, and refer a friend.', rewardBadge: 'Founding Legend', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
    { id: 'ch-5', title: 'Trail Builder', discipline: 'MTB', difficulty: 'Intermediate', description: 'Set up your JumpPack at 3 different outdoor locations. Document each session.', rewardBadge: 'Trail Blazer', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
    { id: 'ch-6', title: 'Style Points', discipline: 'Skateboarding', difficulty: 'Advanced', description: 'Land 3 different tricks off the ramp in a single session. Creativity counts.', rewardBadge: 'Style King', startDate: new Date('2024-01-01'), endDate: new Date('2025-12-31') },
  ];

  for (const ch of challenges) {
    await prisma.challenge.upsert({
      where: { id: ch.id },
      update: {},
      create: ch,
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
