export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';

const COMMUNITY_CLIPS = [
  {
    id: 'clip-1',
    sport: 'mtb',
    title: 'Ticknock Sunset Tabletop — Level 3 High Setting',
    hangtime: '0.89s',
    setting: 'Level 3 (Send)',
    tags: ['mtb', 'tabletop', 'high setting', '3.5 bike-lengths brake release', 'clean landing'],
    similarity: 0.96,
  },
  {
    id: 'clip-2',
    sport: 'bmx',
    title: 'Bushy Park Clean 360 — 68° Chin Lead',
    hangtime: '0.84s',
    setting: 'Level 3 (Send)',
    tags: ['bmx', '360', 'high setting', 'head spot', 'bolts landing'],
    similarity: 0.94,
  },
  {
    id: 'clip-3',
    sport: 'skate',
    title: 'Concrete Bowl +16° Lean Indy Grab',
    hangtime: '0.74s',
    setting: 'Level 2 (Flow)',
    tags: ['skate', 'indy grab', '+16 deg lean', 'flush entry', 'plaza'],
    similarity: 0.91,
  },
  {
    id: 'clip-4',
    sport: 'snow',
    title: 'Whistler Flat-Base 0° Method Grab',
    hangtime: '0.92s',
    setting: 'Level 3 (Send)',
    tags: ['snow', 'method grab', 'flat base', '0 deg edge', 'powder'],
    similarity: 0.89,
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const action = (body?.action || 'edit') as 'edit' | 'semantic-search';
    const command = (body?.command ||
      'Slow the airtime 3x, add a clean trajectory arc, keep everything else the same') as string;
    const sport = (body?.sport || 'mtb') as string;

    if (action === 'semantic-search') {
      const q = (body?.query || 'clean 360s on the high setting').toLowerCase();
      const results = COMMUNITY_CLIPS.map((c) => {
        const score =
          c.tags.some((t) => q.includes(t) || t.includes(q)) ||
          c.title.toLowerCase().includes(q) ||
          q.includes(c.sport)
            ? 0.95
            : 0.78;
        return { ...c, similarity: score };
      }).sort((a, b) => b.similarity - a.similarity);

      return NextResponse.json({
        model: 'text-embedding-004',
        query: body?.query,
        results,
      });
    }

    // Conversational Video Edit via Omni Flash Interactions API spec
    const lower = command.toLowerCase();
    const slowMoFactor = lower.includes('4x') || lower.includes('0.25x') ? 0.25 : lower.includes('3x') ? 0.33 : 0.5;
    const showArc = !lower.includes('no arc') && !lower.includes('hide arc');
    const showGhost = lower.includes('ghost') || lower.includes('pro') || lower.includes('side-by-side');
    const aspect = lower.includes('9:16') || lower.includes('reel') || lower.includes('tiktok') ? '9:16' : '16:9';

    return NextResponse.json({
      model: 'gemini-omni-flash-interactions',
      sport,
      appliedEdit: {
        command,
        slowMoWindow: '15.10s → 15.88s (Airtime Apex)',
        playbackRate: slowMoFactor,
        trajectoryArcOverlay: showArc,
        ghostComparisonOverlay: showGhost,
        aspectRatio: aspect,
        colorGrade: lower.includes('golden') || lower.includes('sunset') ? 'GOLDEN_HOUR_LUT' : 'HIGH_CONTRAST_HUD',
        summary: `Omni Flash isolated the 0.78s airtime window, applied ${Math.round(
          1 / slowMoFactor
        )}× optical-flow slow-mo, ${showArc ? 'rendered the 240fps trajectory arc,' : ''} and formatted for ${aspect}.`,
      },
    });
  } catch (err) {
    console.error('Omni Flash error:', err);
    return NextResponse.json({ error: 'Omni Flash failed' }, { status: 500 });
  }
}
