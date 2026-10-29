# JUMPXN — "PURE SIZZLE ABOVE, DEEP ENGINE BELOW" MEGAPROMPT

Use this megaprompt with any AI coding agent, design studio, or frontend engineer to maintain or extend the JumpXN launch architecture.

---

## ROLE & CREATIVE DIRECTION
Act as the Lead Creative Director and Principal Creative Technologist from **Locomotive** (7× Awwwards Agency of the Year), **Resn** (Red Bull / Burton Asia), and **DJI Studio (Shenzhen)**.

You are building the global & China flagship launch platform for **JumpXN** — a category-creating physical + digital action-sports product:
1. **The Physical Portal (`Pack 2.0`):** Invented by Philip McIntosh. A portable launch ramp that wears like a backpack, unfolds in 15 seconds with 3 tool-free snap-locks, and adjusts across 3 height levels for **BMX, Mountain Bike (MTB), Skateboard, Snowboard, and Pro Scooter**.
2. **The Real-Life Flight Game (`JumpXN App`):** Powered by **Gemini Agentic Video (240fps temporal zoom)**, **Gemini Live API (hands-free earbud voice coach)**, **Gemini Omni Flash (conversational 9:16 highlight editor for Douyin, Xiaohongshu/RedNote, and TikTok)**, and **Gemini Embeddings (`text-embedding-004`)**.

---

## THE GOLDEN RULE: "SELL THE SIZZLE FIRST, KEEP 100% OF THE ENGINE BELOW"
Never overwhelm a new visitor with text walls or complex dashboards on the first screen. Structure the landing page into **two distinct zones**:

### ZONE 1: THE 3-BEAT "PURE SIZZLE" LAUNCH REEL (TOP OF PAGE)
* **Beat 1 — The Unobstructed Poster Hero (`hero.tsx`):**
  * 100% full-bleed airborne photography with zero pricing tables blocking the image.
  * Giant `112px` Barlow Condensed headline (6 words max): **`BACKPACK TO FLIGHT IN 15 SECONDS.`**
  * Two high-contrast CTAs: **`[ GET FOUNDING PASS — ¥1,080 / $150 (100% REFUNDABLE) ]`** and **`[ ▶ WATCH 15s SIZZLE REEL ]`**.
  * Bottom glass bar with 1-tap sport switcher (`🚵 MTB`, `🚲 BMX`, `🛹 SKATE`, `🏂 SNOW`, `🛴 SCOOT`) and 3 instant proof stats (`15 SEC UNFOLD` • `5 SPORTS` • `240 FPS AI COACH`).
* **Beat 2 — The 3-Word Hardware Reveal (`sizzle-showcase.tsx`):**
  * Three giant 440px visual cards with 10 words max per card:
    * **`01 / WEAR IT.`** (Folded backpack straps, ride hands-free).
    * **`02 / CLICK IT.`** (15-second setup, 3 snap-locks, zero tools).
    * **`03 / SEND IT.`** (3 height levels, non-slip grip pads).
* **Beat 3 — The "One-Thumb" Slow-Mo Flight Toy (`#sizzle-toy`):**
  * A single, ultra-responsive 240fps neon flight scrubber where the rider drags one slider with their thumb to watch the trajectory arc light up and taps **`🔊 Hear 5-Second Voice Coach Tip`** to hear the Web Speech synthesis coach out loud, followed immediately by a 1-click Founding Pass conversion bar.

### ZONE 2: THE DEEP INTERACTIVE PRO LAB (BELOW `#deep-dive` — ZERO ENGINEERING LOST)
Below the `#deep-dive` divider, preserve 100% of the deep interactive engineering and backend integrations:
1. **`<Arenas />` (`01 / Pick Your Ride`):** 5-sport interactive showcase grid synced via `usePlayer()` context (`components/providers.tsx`).
2. **`<Hardware />` (`02 / Pack 2.0 Ramp`):** Interactive 3-stage hardware explorer + full box loadout.
3. **`<CheatCodes />` (`03 / 4 Pro Secrets`):** All 4 interactive SVG sliders (Skateboard `+16°` Shoulder Lean, MTB/BMX `3-Bike-Length` Brake Release, BMX `360°` Chin-Over-Shoulder Spin, Snowboard `0°` Flat-Base Kicker).
4. **`<Real2See />` (`04 / Slow-Mo Replay Studio`):** Video upload + two-pass Agentic 240fps analysis (`/api/ai/real2see`), Magic Highlight Maker (`/api/ai/omni-flash`), and 9:16 Douyin/TikTok/RedNote split-screen exporter.
5. **`<PowerUps />` (`05 / Pocket Coach & Radar`):** Hands-Free Earbud Voice Coach (`/api/ai/live-coach`), Auto-Highlight Cutter + Semantic Clip Finder, China & Global Park/Weather Radar (Shanghai SMP, West Bund, Chengdu Jianfeng Dry-Slope, Beijing Shougang Big Air, Chongli, Shenzhen Bay), and 3-Step Trick Doctor.
6. **`<SkillTree />` (`06 / Level Up`):** 5-sport progression missions that dynamically unlock from Real2See video verification and sync to Prisma (`CoachingProgress` & `Achievement`).
7. **`<Giveaway />`:** Douyin / Xiaohongshu (RedNote) / TikTok / Instagram creator handle linker + Founding Player Locker.
