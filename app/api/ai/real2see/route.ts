export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import {
  REAL2SEE_JSON_SCHEMA,
  REAL2SEE_SYSTEM_PROMPT,
  SAMPLE_ANALYSES,
  type Real2SeeAnalysis,
} from '@/lib/gemini-schemas';

export async function POST(request: Request) {
  try {
    const session = await auth();
    const body = await request.json().catch(() => ({}));
    const sport = (body?.sport || 'mtb') as string;
    const videoBase64 = body?.videoBase64 as string | undefined;
    const videoMimeType = (body?.videoMimeType || 'video/mp4') as string;
    const riderNote = (body?.riderNote || '') as string;

    const apiKey = process.env.GEMINI_API_KEY;
    let analysis: Real2SeeAnalysis = SAMPLE_ANALYSES[sport] || SAMPLE_ANALYSES.mtb;
    let mode: 'gemini-live-api' | 'simulated-agentic' = 'simulated-agentic';

    // If GEMINI_API_KEY is configured, call Gemini 2.5 Flash / Pro with Agentic Video Understanding & Structured JSON Output
    if (apiKey) {
      const parts: any[] = [
        {
          text: `Analyze this ${sport.toUpperCase()} jump session on the Pack 2.0 ramp. ${
            riderNote ? `Rider note: "${riderNote}".` : ''
          } Dynamically zoom into the 1-3 second airtime window (from 3 bike-lengths before the lip to touchdown) and output strict JSON matching REAL2SEE_JSON_SCHEMA.`,
        },
      ];

      if (videoBase64) {
        parts.unshift({
          inlineData: {
            mimeType: videoMimeType,
            data: videoBase64,
          },
        });
      }

      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: REAL2SEE_SYSTEM_PROMPT }] },
            contents: [{ role: 'user', parts }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: 'application/json',
              responseSchema: REAL2SEE_JSON_SCHEMA,
            },
          }),
        }
      );

      if (geminiRes.ok) {
        const geminiJson = await geminiRes.json();
        const rawText = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          analysis = JSON.parse(rawText) as Real2SeeAnalysis;
          mode = 'gemini-live-api';
        }
      }
    }

    // Pillar 4: Adaptive Skill Tree — If user is logged in, persist CoachingProgress & Achievement in Prisma
    let dbSynced = false;
    if (session?.user?.id && analysis?.skillTreeUpdate) {
      try {
        await prisma.coachingProgress.upsert({
          where: {
            userId_lessonId: {
              userId: session.user.id,
              lessonId: analysis.skillTreeUpdate.missionIdUnlocked,
            },
          },
          create: {
            userId: session.user.id,
            lessonId: analysis.skillTreeUpdate.missionIdUnlocked,
            discipline: analysis.skillTreeUpdate.sport.toUpperCase(),
            saved: true,
          },
          update: { saved: true },
        });

        if (analysis.skillTreeUpdate.badgeEarned) {
          await prisma.achievement.create({
            data: {
              userId: session.user.id,
              type: 'REAL2SEE_UNLOCK',
              title: analysis.skillTreeUpdate.badgeEarned,
            },
          });
        }
        dbSynced = true;
      } catch (dbErr) {
        console.warn('Adaptive Skill Tree DB sync skipped:', dbErr);
      }
    }

    return NextResponse.json({
      mode,
      dbSynced,
      analysis,
    });
  } catch (err: any) {
    console.error('Real2See AI error:', err);
    return NextResponse.json({ error: 'Failed to analyze clip' }, { status: 500 });
  }
}
