export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { SAMPLE_ANALYSES } from '@/lib/gemini-schemas';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const sport = (body?.sport || 'mtb') as string;
    const question = (body?.question || 'Did I tap my brakes too close to the lip?') as string;
    const mode = (body?.mode || 'voice-coach') as 'voice-coach' | 'trick-doctor' | 'spot-radar';
    const city = (body?.city || 'Dublin, Ireland') as string;

    const priorAnalysis = body?.priorAnalysis || SAMPLE_ANALYSES[sport] || SAMPLE_ANALYSES.mtb;
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Live WebSocket Ephemeral Config + Context-Injected Voice Response
    if (apiKey) {
      const useSearchGrounding = mode === 'spot-radar';
      const systemPrompt =
        mode === 'spot-radar'
          ? `You are the JumpXN Local Session Radar with Google Search Grounding. Recommend 3 real, legal public bike parks, pump tracks, or skate plazas near ${city} suitable for setting up a portable ramp, plus a quick weather-aware riding tip.`
          : mode === 'trick-doctor'
          ? `You are Philip McIntosh's JumpXN Trick Doctor. Build a punchy, encouraging 3-step trailside progression drill for a ${sport.toUpperCase()} rider based on their goal and their latest Real2See telemetry: ${JSON.stringify(
              priorAnalysis.metrics
            )}.`
          : `You are the JumpXN Hands-Free Earbud Coach (Gemini Live API). The rider just landed and asked a question through their earbuds with gloves on. Answer in 2-3 encouraging, ultra-specific spoken sentences using their latest Real2See telemetry: ${JSON.stringify(
              priorAnalysis
            )}.`;

      const payload: any = {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: question }] }],
        generationConfig: { temperature: 0.4 },
      };

      if (useSearchGrounding) {
        payload.tools = [{ googleSearch: {} }];
      }

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return NextResponse.json({
            source: 'gemini-2.5-flash',
            reply,
            liveWebSocketUrl: `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`,
            injectedContext: priorAnalysis.metrics,
          });
        }
      }
    }

    // Fallback high-precision coaching response injected with the rider's active Real2See telemetry
    const m = priorAnalysis.metrics;
    const drill = priorAnalysis.skillTreeUpdate.nextThreeSendsDrill;
    const fallbackReply =
      mode === 'trick-doctor'
        ? `✓ CUSTOM ${sport.toUpperCase()} 3-STEP PROGRESSION DRILL (Telemetry Synced: ${m.hangtimeSec}s Hangtime):
1️⃣ ${drill[0]}
2️⃣ ${drill[1]}
3️⃣ ${drill[2]}`
        : `${priorAnalysis.biomechanics.voiceCoachSummary} Next run focus: ${drill[0]}`;

    return NextResponse.json({
      source: 'telemetry-context-engine',
      reply: fallbackReply,
      injectedContext: m,
    });
  } catch (err) {
    console.error('Live coach error:', err);
    return NextResponse.json({ error: 'Coach unavailable' }, { status: 500 });
  }
}
