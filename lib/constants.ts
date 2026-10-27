// JumpXN Image Assets
export const IMAGES = {
  heroBmx: 'https://images.unsplash.com/photo-1548457126-c0af13f460b4?fm=jpg&q=80&w=2400',
  mtbJump: 'https://images.unsplash.com/photo-1728730172521-062ebd54246b?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400',
  skater: 'https://images.unsplash.com/photo-1760773766821-a3fea86fd44a?fm=jpg&q=80&w=2400',
  scooter: 'https://images.pexels.com/photos/40297876/pexels-photo-40297876.jpeg?cs=srgb&fm=jpg&w=2400',
  bmxSunset: 'https://images.unsplash.com/photo-1457299999196-427a06ea646d?fm=jpg&q=80&w=2400',
  heroBg: 'https://images.unsplash.com/photo-1745860795725-0def6094e371?fm=jpg&q=80&w=2400',
  foundingRiders: 'https://images.unsplash.com/photo-1507248853396-d0022bede9c6?fm=jpg&q=80&w=2400',
  skateCard: 'https://images.unsplash.com/photo-1704871132536-227e0e024348?fm=jpg&q=80&w=1200',
  mtbCard: 'https://images.unsplash.com/photo-1639745159169-db1d3c0cfe78?fm=jpg&q=80&w=1200',
  leaderboard: 'https://images.unsplash.com/photo-1770936994186-dfea62e840c8?fm=jpg&q=80&w=2400',
  coaching: 'https://images.unsplash.com/photo-1786327781245-ffe830cd907d?fm=jpg&q=80&w=2400',
  product: 'https://cdn.abacus.ai/images/a108a8a5-7860-4833-9beb-3d35c77f1a33.png',
} as const;

// Coaching Lessons
export const BMX_LESSONS = [
  { id: 'bmx-1', title: 'Getting Comfortable With the Ramp', discipline: 'BMX', duration: '8 min', level: 'Beginner' },
  { id: 'bmx-2', title: 'Building Confidence', discipline: 'BMX', duration: '10 min', level: 'Beginner' },
  { id: 'bmx-3', title: 'Body Position Basics', discipline: 'BMX', duration: '12 min', level: 'Beginner' },
  { id: 'bmx-4', title: 'Lifting the Front Wheel', discipline: 'BMX', duration: '10 min', level: 'Beginner' },
  { id: 'bmx-5', title: 'Building Speed', discipline: 'BMX', duration: '8 min', level: 'Intermediate' },
  { id: 'bmx-6', title: 'Pumping and Generating Momentum', discipline: 'BMX', duration: '15 min', level: 'Intermediate' },
  { id: 'bmx-7', title: 'Safe Jump Progression', discipline: 'BMX', duration: '12 min', level: 'Intermediate' },
  { id: 'bmx-8', title: 'Introduction to 180s', discipline: 'BMX', duration: '15 min', level: 'Advanced' },
  { id: 'bmx-9', title: 'Introduction to 360s', discipline: 'BMX', duration: '18 min', level: 'Advanced' },
  { id: 'bmx-10', title: 'Landing Technique', discipline: 'BMX', duration: '12 min', level: 'Advanced' },
];

export const MTB_LESSONS = [
  { id: 'mtb-1', title: 'Laying Off the Brakes at the Right Moment', discipline: 'MTB', duration: '10 min', level: 'Beginner' },
  { id: 'mtb-2', title: 'Pumping for Speed', discipline: 'MTB', duration: '12 min', level: 'Beginner' },
  { id: 'mtb-3', title: 'Generating More Lift', discipline: 'MTB', duration: '10 min', level: 'Intermediate' },
  { id: 'mtb-4', title: 'Body Positioning', discipline: 'MTB', duration: '12 min', level: 'Intermediate' },
  { id: 'mtb-5', title: 'Timing Your Take-Off', discipline: 'MTB', duration: '10 min', level: 'Intermediate' },
  { id: 'mtb-6', title: 'Improving Air Control', discipline: 'MTB', duration: '15 min', level: 'Advanced' },
  { id: 'mtb-7', title: 'Progressive Trick Development', discipline: 'MTB', duration: '18 min', level: 'Advanced' },
];

export const SKATE_LESSONS = [
  { id: 'sk-1', title: 'Approaching the Ramp', discipline: 'Skateboarding', duration: '8 min', level: 'Beginner' },
  { id: 'sk-2', title: 'Speed Control Fundamentals', discipline: 'Skateboarding', duration: '10 min', level: 'Beginner' },
  { id: 'sk-3', title: 'Ollie Off the Ramp', discipline: 'Skateboarding', duration: '12 min', level: 'Intermediate' },
  { id: 'sk-4', title: 'Kickflip Progression', discipline: 'Skateboarding', duration: '15 min', level: 'Advanced' },
];

export const SCOOTER_LESSONS = [
  { id: 'sc-1', title: 'Ramp Basics for Scooter', discipline: 'Scooter', duration: '8 min', level: 'Beginner' },
  { id: 'sc-2', title: 'Building Air Time', discipline: 'Scooter', duration: '10 min', level: 'Intermediate' },
  { id: 'sc-3', title: 'Tailwhip Fundamentals', discipline: 'Scooter', duration: '15 min', level: 'Advanced' },
];

export const ALL_LESSONS = [...BMX_LESSONS, ...MTB_LESSONS, ...SKATE_LESSONS, ...SCOOTER_LESSONS];

export const SAMPLE_CHALLENGES = [
  { id: 'ch-1', title: 'First Jump Club', discipline: 'All', difficulty: 'Beginner', description: 'Land your first jump off the JumpPack 2.0. Record it, post it, own it.', rewardBadge: 'First Flight' },
  { id: 'ch-2', title: '30-Day Pump Challenge', discipline: 'BMX', difficulty: 'Intermediate', description: 'Master the pump technique over 30 days. Build speed without pedalling.', rewardBadge: 'Pump Master' },
  { id: 'ch-3', title: '180 Milestone', discipline: 'BMX', difficulty: 'Advanced', description: 'Land a clean 180 off the ramp. Fakie or regular — your call.', rewardBadge: 'Spin Doctor' },
  { id: 'ch-4', title: 'The Founding Rider Challenge', discipline: 'All', difficulty: 'All Levels', description: 'Complete 5 coaching lessons, post your first clip, and refer a friend.', rewardBadge: 'Founding Legend' },
  { id: 'ch-5', title: 'Trail Builder', discipline: 'MTB', difficulty: 'Intermediate', description: 'Set up your JumpPack at 3 different outdoor locations. Document each session.', rewardBadge: 'Trail Blazer' },
  { id: 'ch-6', title: 'Style Points', discipline: 'Skateboarding', difficulty: 'Advanced', description: 'Land 3 different tricks off the ramp in a single session. Creativity counts.', rewardBadge: 'Style King' },
];
