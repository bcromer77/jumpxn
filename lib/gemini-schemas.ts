// JumpXN Pro Coaching Engine — Simple, Zero-Jargon Player Data & Hype Coaching

export interface Real2SeeAnalysis {
  sendWindow: {
    rollInStartSec: number;
    lipLaunchSec: number;
    peakFloatSec: number;
    touchdownSec: number;
    samplingFps: number;
  };
  metrics: {
    hangtimeSec: number;
    estimatedBoostMeters: number;
    shoulderLeanDeg: number;
    brakeReleaseBikeLengths: number;
    headTurnDeg: number;
    snowboardEdgeTiltDeg: number;
    landingQualityScore: number; // 0-100
  };
  trajectoryPoints: {
    pct: number;
    x: number;
    y: number;
    phase: 'ROLL-IN' | 'LIP POP' | 'PEAK FLOAT' | 'STOMPED LANDING';
  }[];
  biomechanics: {
    status: 'LOCKED IN' | 'LATE BRAKE' | 'LEANING BACK' | 'UNDER-ROTATED' | 'EDGE CATCH RISK';
    primaryHabitDetected: string;
    proSecretUnlocked: string;
    voiceCoachSummary: string;
  };
  skillTreeUpdate: {
    sport: 'bmx' | 'mtb' | 'skate' | 'snow' | 'scoot';
    missionIdUnlocked: string;
    xpAwarded: number;
    badgeEarned?: string;
    nextThreeSendsDrill: [string, string, string];
    safetyCue: string;
  };
}

export const REAL2SEE_JSON_SCHEMA = {
  type: 'OBJECT',
  required: ['sendWindow', 'metrics', 'trajectoryPoints', 'biomechanics', 'skillTreeUpdate'],
  properties: {
    sendWindow: {
      type: 'OBJECT',
      required: ['rollInStartSec', 'lipLaunchSec', 'peakFloatSec', 'touchdownSec', 'samplingFps'],
      properties: {
        rollInStartSec: { type: 'NUMBER' },
        lipLaunchSec: { type: 'NUMBER' },
        peakFloatSec: { type: 'NUMBER' },
        touchdownSec: { type: 'NUMBER' },
        samplingFps: { type: 'NUMBER' },
      },
    },
    metrics: {
      type: 'OBJECT',
      required: [
        'hangtimeSec',
        'estimatedBoostMeters',
        'shoulderLeanDeg',
        'brakeReleaseBikeLengths',
        'headTurnDeg',
        'snowboardEdgeTiltDeg',
        'landingQualityScore',
      ],
      properties: {
        hangtimeSec: { type: 'NUMBER' },
        estimatedBoostMeters: { type: 'NUMBER' },
        shoulderLeanDeg: { type: 'NUMBER' },
        brakeReleaseBikeLengths: { type: 'NUMBER' },
        headTurnDeg: { type: 'NUMBER' },
        snowboardEdgeTiltDeg: { type: 'NUMBER' },
        landingQualityScore: { type: 'NUMBER' },
      },
    },
    trajectoryPoints: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        required: ['pct', 'x', 'y', 'phase'],
        properties: {
          pct: { type: 'NUMBER' },
          x: { type: 'NUMBER' },
          y: { type: 'NUMBER' },
          phase: { type: 'STRING' },
        },
      },
    },
    biomechanics: {
      type: 'OBJECT',
      required: ['status', 'primaryHabitDetected', 'proSecretUnlocked', 'voiceCoachSummary'],
      properties: {
        status: { type: 'STRING' },
        primaryHabitDetected: { type: 'STRING' },
        proSecretUnlocked: { type: 'STRING' },
        voiceCoachSummary: { type: 'STRING' },
      },
    },
    skillTreeUpdate: {
      type: 'OBJECT',
      required: ['sport', 'missionIdUnlocked', 'xpAwarded', 'nextThreeSendsDrill', 'safetyCue'],
      properties: {
        sport: { type: 'STRING' },
        missionIdUnlocked: { type: 'STRING' },
        xpAwarded: { type: 'NUMBER' },
        badgeEarned: { type: 'STRING' },
        nextThreeSendsDrill: {
          type: 'ARRAY',
          items: { type: 'STRING' },
        },
        safetyCue: { type: 'STRING' },
      },
    },
  },
};

export const REAL2SEE_SYSTEM_PROMPT = `You are the JumpXN Pro Coach — a super encouraging, high-energy action-sports coach for young riders.
Never use complicated science or engineering words. Speak in simple, fun, crystal-clear instructions:
1. Find the exact moment the rider hits the Pack 2.0 ramp.
2. Check the 4 Pro Secrets:
   - Bike Brake Rule: Did they take their finger off the brake 3 bike-lengths before the ramp?
   - Skateboard Lean: Did they lean their front shoulder forward (+16°) into the ramp curve so the board stayed under their feet?
   - BMX 360 Spin: Did they look over their shoulder with their chin to finish the spin?
   - Snowboard Flat Base: Did they keep the bottom of their snowboard flat (0°) on the jump instead of digging an edge?
3. Output JSON to power the slow-motion replay screen and unlock their next trick mission.`;

export const SAMPLE_ANALYSES: Record<string, Real2SeeAnalysis> = {
  mtb: {
    sendWindow: {
      rollInStartSec: 14.2,
      lipLaunchSec: 15.1,
      peakFloatSec: 15.49,
      touchdownSec: 15.88,
      samplingFps: 240,
    },
    metrics: {
      hangtimeSec: 0.78,
      estimatedBoostMeters: 1.42,
      shoulderLeanDeg: 15,
      brakeReleaseBikeLengths: 3.4,
      headTurnDeg: 0,
      snowboardEdgeTiltDeg: 0,
      landingQualityScore: 94,
    },
    trajectoryPoints: [
      { pct: 0, x: 310, y: 415, phase: 'LIP POP' },
      { pct: 0.25, x: 441, y: 292, phase: 'PEAK FLOAT' },
      { pct: 0.5, x: 572, y: 257, phase: 'PEAK FLOAT' },
      { pct: 0.75, x: 703, y: 345, phase: 'PEAK FLOAT' },
      { pct: 1, x: 835, y: 520, phase: 'STOMPED LANDING' },
    ],
    biomechanics: {
      status: 'LOCKED IN',
      primaryHabitDetected: 'Let go of the brakes 3.4 bike-lengths early + pushed hard with your legs!',
      proSecretUnlocked:
        'On Try #1 (the grey ghost line), you tapped your brakes too close to the ramp and pulled up with your arms. On Try #4, you let go of the brakes early and pushed through your feet — giving you way more air!',
      voiceCoachSummary:
        'Awesome jump! You let go of the brakes early and pushed with your legs right at the top of the ramp for huge air!',
    },
    skillTreeUpdate: {
      sport: 'mtb',
      missionIdUnlocked: 'mtb-3',
      xpAwarded: 250,
      badgeEarned: 'No-Brake Boss',
      nextThreeSendsDrill: [
        'Jump #1: Pick a spot on the ground 3 bike-lengths before the ramp and wrap all 5 fingers on the bars there.',
        'Jump #2: Stand tall on your pedals and push down with your feet as you ride up the curve.',
        'Jump #3: In mid-air, push your handlebars slightly forward so both wheels land at the exact same time.',
      ],
      safetyCue: 'Strap your helmet tight and make sure your landing zone is 100% clear!',
    },
  },
  bmx: {
    sendWindow: {
      rollInStartSec: 8.4,
      lipLaunchSec: 9.2,
      peakFloatSec: 9.62,
      touchdownSec: 10.04,
      samplingFps: 240,
    },
    metrics: {
      hangtimeSec: 0.84,
      estimatedBoostMeters: 1.56,
      shoulderLeanDeg: 16,
      brakeReleaseBikeLengths: 4.0,
      headTurnDeg: 68,
      snowboardEdgeTiltDeg: 0,
      landingQualityScore: 96,
    },
    trajectoryPoints: [
      { pct: 0, x: 310, y: 415, phase: 'LIP POP' },
      { pct: 0.5, x: 572, y: 245, phase: 'PEAK FLOAT' },
      { pct: 1, x: 835, y: 520, phase: 'STOMPED LANDING' },
    ],
    biomechanics: {
      status: 'LOCKED IN',
      primaryHabitDetected: 'Turned your chin over your shoulder to lock in the full 360 spin!',
      proSecretUnlocked:
        'On Try #1, you looked down at your front tire so your spin stopped early. On Try #4, you turned your chin over your shoulder and looked at the landing — and your bike followed your eyes all the way around!',
      voiceCoachSummary:
        'Sick 360! You kept your chin turned over your shoulder and spotted your landing early. Total pro move!',
    },
    skillTreeUpdate: {
      sport: 'bmx',
      missionIdUnlocked: 'bmx-5',
      xpAwarded: 300,
      badgeEarned: '360 Spin King',
      nextThreeSendsDrill: [
        'Jump #1: Roll in smoothly with all fingers wrapped around the grips.',
        'Jump #2: Pop tall off the top of the ramp before you start twisting your shoulders.',
        'Jump #3: Turn your chin over your shoulder and stare at your landing spot until both tires touch down.',
      ],
      safetyCue: 'BMX helmet, gloves, and knee pads on before trying spins!',
    },
  },
  skate: {
    sendWindow: {
      rollInStartSec: 4.1,
      lipLaunchSec: 4.8,
      peakFloatSec: 5.16,
      touchdownSec: 5.52,
      samplingFps: 240,
    },
    metrics: {
      hangtimeSec: 0.72,
      estimatedBoostMeters: 1.18,
      shoulderLeanDeg: 16,
      brakeReleaseBikeLengths: 5.0,
      headTurnDeg: 15,
      snowboardEdgeTiltDeg: 0,
      landingQualityScore: 92,
    },
    trajectoryPoints: [
      { pct: 0, x: 310, y: 415, phase: 'LIP POP' },
      { pct: 0.5, x: 572, y: 270, phase: 'PEAK FLOAT' },
      { pct: 1, x: 835, y: 520, phase: 'STOMPED LANDING' },
    ],
    biomechanics: {
      status: 'LOCKED IN',
      primaryHabitDetected: 'Leaned your front shoulder forward (+16°) so the board stayed glued to your feet!',
      proSecretUnlocked:
        'On Try #1, standing straight up pushed the skateboard out in front of you. On Try #4, leaning your front shoulder forward into the ramp kept the board locked under your shoes!',
      voiceCoachSummary:
        'So clean! Leaning your front shoulder forward into the ramp kept your weight balanced right over both trucks.',
    },
    skillTreeUpdate: {
      sport: 'skate',
      missionIdUnlocked: 'sk-3',
      xpAwarded: 250,
      badgeEarned: 'Sweet-Spot Skater',
      nextThreeSendsDrill: [
        'Jump #1: Bend your knees and lean your front shoulder slightly forward as you roll onto the ramp.',
        'Jump #2: Wait until your front wheels reach the top edge before snapping the tail.',
        'Jump #3: Land with your feet over the bolts and bend your knees like shock absorbers.',
      ],
      safetyCue: 'Helmet, wrist guards, and knee pads on dry pavement!',
    },
  },
  snow: {
    sendWindow: {
      rollInStartSec: 6.0,
      lipLaunchSec: 6.9,
      peakFloatSec: 7.35,
      touchdownSec: 7.8,
      samplingFps: 240,
    },
    metrics: {
      hangtimeSec: 0.9,
      estimatedBoostMeters: 1.65,
      shoulderLeanDeg: 14,
      brakeReleaseBikeLengths: 4.5,
      headTurnDeg: 10,
      snowboardEdgeTiltDeg: 0,
      landingQualityScore: 95,
    },
    trajectoryPoints: [
      { pct: 0, x: 310, y: 415, phase: 'LIP POP' },
      { pct: 0.5, x: 572, y: 240, phase: 'PEAK FLOAT' },
      { pct: 1, x: 835, y: 520, phase: 'STOMPED LANDING' },
    ],
    biomechanics: {
      status: 'LOCKED IN',
      primaryHabitDetected: 'Kept the bottom of your snowboard 100% flat (0°) for a super clean pop!',
      proSecretUnlocked:
        'On Try #1, leaning on your heel edge made the board slip sideways. On Try #4, riding up the jump with a flat board gave you a straight, balanced launch for the grab!',
      voiceCoachSummary:
        'Huge float! Keeping your snowboard flat on the ramp gave you a super steady pop and plenty of time to grab the board.',
    },
    skillTreeUpdate: {
      sport: 'snow',
      missionIdUnlocked: 'sn-3',
      xpAwarded: 250,
      badgeEarned: 'Snow Cloud Flyer',
      nextThreeSendsDrill: [
        'Jump #1: Finish your speed turns early and ride onto the jump with the bottom of your board completely flat.',
        'Jump #2: Jump up off both feet evenly as the nose of your board leaves the lip.',
        'Jump #3: Pull your knees up to your hand to grab the board instead of bending your back down.',
      ],
      safetyCue: 'Snow helmet and wrist guards on; check the landing snow first!',
    },
  },
  scoot: {
    sendWindow: {
      rollInStartSec: 5.2,
      lipLaunchSec: 6.0,
      peakFloatSec: 6.38,
      touchdownSec: 6.76,
      samplingFps: 240,
    },
    metrics: {
      hangtimeSec: 0.76,
      estimatedBoostMeters: 1.32,
      shoulderLeanDeg: 15,
      brakeReleaseBikeLengths: 4.0,
      headTurnDeg: 0,
      snowboardEdgeTiltDeg: 0,
      landingQualityScore: 93,
    },
    trajectoryPoints: [
      { pct: 0, x: 310, y: 415, phase: 'LIP POP' },
      { pct: 0.5, x: 572, y: 265, phase: 'PEAK FLOAT' },
      { pct: 1, x: 835, y: 520, phase: 'STOMPED LANDING' },
    ],
    biomechanics: {
      status: 'LOCKED IN',
      primaryHabitDetected: 'Kept your handlebars straight on take-off + caught the deck clean!',
      proSecretUnlocked:
        'On Try #1, twisting the bars early threw you off balance. On Try #4, jumping straight up with square bars first gave you plenty of time to spin the deck and land both feet!',
      voiceCoachSummary:
        'Stomped it! Keeping your handlebars straight on take-off gave you all the height you needed to catch that tailwhip.',
    },
    skillTreeUpdate: {
      sport: 'scoot',
      missionIdUnlocked: 'sc-2',
      xpAwarded: 250,
      badgeEarned: 'Tailwhip Hero',
      nextThreeSendsDrill: [
        'Jump #1: Hold the grips tight and keep your handlebars 100% straight as you roll up the ramp.',
        'Jump #2: Jump tall off both feet first before flicking the deck with your back foot.',
        'Jump #3: Spot the deck coming around, catch it with your front foot, and bend your knees on landing.',
      ],
      safetyCue: 'Helmet, knee pads, and elbow pads locked on!',
    },
  },
};
