import { presntWireframes } from './presntWireframes';

// Case study content. Images live in /public/case-studies/<slug>/ — leave `src`
// undefined to show a labeled placeholder frame until the file exists.

export interface Shot {
  label: string;
  caption: string;
  src?: string;
  compactSrc?: string; // 3:2 version for phones and project cards
}

export interface WireframeSet {
  id: string;
  title: string;
  mobileNote: string;
  desktopNote: string;
  mobile: { label: string; src: string }[];
  desktop: { label: string; src: string }[];
}

export interface Exploration {
  file: string; // shown in the window title bar
  title: string;
  caption: string;
  src: string;
}

export interface ColorToken {
  name: string;
  hex: string;
}

export interface TypeToken {
  sample: string;
  spec: string;
  size: number;
  weight: number;
  caps?: boolean;
  font?: string; // defaults to the page font
  tracking?: string;
}

export interface BarChart {
  title: string;
  note: string;
  items: { label: string; pct: number; display: string }[]; // pct = bar length, 0–100
}

export interface Distribution {
  label: string;
  mean: string;
  counts: number[]; // responses for each score, 0 → 10
}

export interface Research {
  intro: string;
  methods: { value: string; label: string; note: string }[];
  heuristics?: { app: string; src: string; source: string; notes: { label: string; text: string }[] }[];
  interviews?: { title: string; points: string[] };
  insights: { stat: string; title: string; body: string }[];
  charts?: BarChart[];
  distributions?: { title: string; note: string; series: Distribution[] };
}

export interface Concept {
  name: string;
  src: string;
  idea: string;
  score: number; // mean likelihood to use, out of 10
  picks: number; // participants who chose it as their favorite
  liked: string;
  disliked: string;
}

export interface ConceptTest {
  intro: string;
  participants: number;
  concepts: Concept[];
  stats: string;
  outcome: string;
  carried: string[];
}

export interface Results {
  score: string;
  scoreLabel: string;
  intro: string;
  findings: { title: string; body: string }[];
  next: string[];
}

export interface CaseStudy {
  slug: string;
  school?: string; // set for coursework; shows a "school project" badge
  title: string;
  kind: string;
  years: string;
  blurb: string;
  role: string;
  timeline: string;
  platform: string;
  stack: string[];
  stackLabel?: string; // meta label for `stack`, defaults to 'Stack'
  github?: string;
  live?: string;
  cover: Shot;
  problem: {
    headline: string;
    highlight: string; // substring of headline to mark
    body: string[];
    goals: string[];
  };
  research?: Research; // adds a research section after the problem
  wireframes: Shot[];
  conceptTest?: ConceptTest; // concept testing results, shown in the wireframes section
  wireframesTag?: string; // section subtitle, defaults to 'sketches → low-fi'
  wireframeDemo?: string; // clickable lo-fi prototype, embedded under the stills
  wireframeSets?: WireframeSet[]; // full wireframe set, tabbed by role
  explorations?: Exploration[]; // component deep dives shown after the wireframes
  screens: Shot[];
  brand?: { mark: 'crrnt'; colors: ColorToken[] };
  brandGallery?: Exploration[]; // logo + palette exploration boards
  desktopScreens?: Exploration[]; // shown after the phone screens
  colors?: ColorToken[];
  type?: TypeToken[];
  prototype: {
    headline: string;
    body: string;
    note?: string;
    demo: 'crrnt' | 'iframe' | 'video';
    video?: string; // YouTube id for demo: 'video'
  };
  results?: Results; // adds a results section after the prototype
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'crrnt',
    title: 'CRRNT',
    kind: 'Mobile app',
    years: '2026 → now',
    blurb:
      'A finance-meets-pop-culture news app for young adults. Every trending story comes with what it means for you, your wallet, and the stock it moves, plus audio playback.',
    role: 'Product design + engineering',
    timeline: 'Apr 2026 → now',
    platform: 'iOS / Android / Web',
    stack: ['React Native', 'FastAPI', 'Claude'],
    github: 'https://github.com/Mikay8/CRRNT',
    live: 'https://web-production-a1d60.up.railway.app',
    cover: { label: 'CRRNT cover image', caption: 'crrnt-cover.jpg', src: '/case-studies/crrnt/cover.jpg',
      compactSrc: '/case-studies/crrnt/cover-compact.jpg',
    },
    problem: {
      headline: 'Young adults see the headline, but never what it means for them.',
      highlight: 'what it means for them',
      body: [
        'Trending news shows up in a feed with no context. Finding out whether a story touches your rent, your job, or the stocks you hold means jumping between a news app, a brokerage, and a search engine, and most people never make the jump.',
        'CRRNT pairs every story across Celebrity, Entertainment, Tech, Government, Sports, Business, Science, World, and Health with a plain-language summary, a personal and financial impact read, the stock it moves, and audio for when you can\'t look at a screen.',
      ],
      goals: [
        'Every story answers "how does it affect me?" and "what does it do to my wallet?"',
        'Only tie a story to a stock when one is genuinely related, and say so when none is',
        'Keep the feed current: stories expire after seven days',
        'Every story works hands-free through audio',
      ],
    },
    wireframes: [
      { label: 'Lo-fi: feed', caption: 'Feed: category pills, play on every card', src: '/case-studies/crrnt/lofi-feed.png' },
      { label: 'Lo-fi: story detail', caption: 'Detail: listen first, mini player docks', src: '/case-studies/crrnt/lofi-detail.png' },
      { label: 'Lo-fi: full player', caption: 'Full player: skip ±15, speed, transcript', src: '/case-studies/crrnt/lofi-player.png' },
    ],
    wireframeDemo: '/case-studies/crrnt/lofi-prototype.html',
    screens: [
      { label: 'Feed', caption: 'Feed: category filter + story cards', src: '/case-studies/crrnt/feed.jpg' },
      { label: 'Story detail', caption: 'Story detail + audio', src: '/case-studies/crrnt/story.jpg' },
      { label: 'Impact', caption: 'How does it affect me? + wallet impact', src: '/case-studies/crrnt/impact.jpg' },
    ],
    brand: {
      mark: 'crrnt',
      colors: [
        { name: 'Sky', hex: '#38BDF8' },
        { name: 'Accent', hex: '#06B6D4' },
        { name: 'Accent dim', hex: '#0891B2' },
        { name: 'Teal', hex: '#2DD4BF' },
        { name: 'Paper', hex: '#EEF8FF' },
        { name: 'Ink', hex: '#061828' },
      ],
    },
    colors: [
      { name: 'Background', hex: '#090D12' },
      { name: 'Surface', hex: '#152030' },
      { name: 'Text', hex: '#E8F4FF' },
      { name: 'Accent', hex: '#06B6D4' },
      { name: 'Affect me', hex: '#7B68EE' },
      { name: 'Positive', hex: '#10B981' },
      { name: 'Negative', hex: '#F87171' },
      { name: 'Muted', hex: '#7098B4' },
    ],
    type: [
      { sample: 'CRRNT', spec: 'wordmark · Outfit 700', size: 26, weight: 700, font: 'Outfit', caps: true, tracking: '.04em' },
      { sample: 'Story title', spec: 'title · 26/700', size: 26, weight: 700, font: 'Inter' },
      { sample: 'Summary, the one thing to know.', spec: 'insight · 18/700', size: 18, weight: 700, font: 'Inter' },
      { sample: 'Impact body copy for each section.', spec: 'body · 15/400', size: 15, weight: 400, font: 'Inter' },
      { sample: 'How does it affect me?', spec: 'label · 12/700 caps', size: 12, weight: 700, caps: true, font: 'Inter' },
    ],
    prototype: {
      headline: 'Tap through it.',
      body: 'A React recreation of the CRRNT feed and story screens. Filter by category, open a story, switch the chart range, and hit play on the audio.',
      note: 'Stories and prices shown are sample data.',
      demo: 'crrnt',
    },
  },
  {
    slug: 'presnt',
    title: 'Presnt',
    kind: 'Web + mobile app',
    years: '2025 → now',
    blurb:
      'Attendance tracking for extracurricular groups: QR and geofence check-in, excuses, dues and member status in one place, replacing group chats and sign-up sheets.',
    role: 'Product design + engineering',
    timeline: '2025 → now',
    platform: 'Web / iOS / Android',
    stack: ['React Native', 'Express', 'Supabase'],
    github: 'https://github.com/Mikay8/Presnt',
    live: 'https://www.presnt.link',
    cover: {
      label: 'Presnt cover image',
      caption: 'presnt-cover.jpg',
      src: '/case-studies/presnt/cover.jpg',
      compactSrc: '/case-studies/presnt/cover-compact.jpg',
    },
    problem: {
      headline: 'Chapters run attendance on group chats, sign-up sheets, and memory.',
      highlight: 'group chats, sign-up sheets',
      body: [
        "Officers track who showed up, who's excused, who paid dues, and who's falling behind across a patchwork of chats, paper sheets, and spreadsheets. Nothing agrees, and the officer who knows how it works graduates.",
        'Presnt gives every org one source of truth, with a surface for each role: members check in and see their status, officers run events and attendance, admins manage dues and compliance, and a platform view sits above every chapter.',
      ],
      goals: [
        'Checking in takes zero taps when you are there: QR + geofence',
        'Excuses, dues and status live in one place',
        'Each role gets its own surface on the same data, on mobile and desktop',
        'Feel warm and community-first, not like enterprise software',
      ],
    },
    wireframes: [
      { label: 'Member: event detail', caption: 'Member event: RSVP or check in', src: '/case-studies/presnt/wf-event.png' },
      { label: 'Member: status', caption: 'Status dial: attendance at a glance', src: '/case-studies/presnt/wf-status.png' },
      { label: 'Officer: location picker', caption: 'Officer flow: pick a saved location', src: '/case-studies/presnt/wf-location.png' },
    ],
    wireframeSets: presntWireframes,
    explorations: [
      {
        file: 'date-picker.jpg',
        title: 'Date picker: three mobile and three desktop patterns',
        caption: 'Bottom sheet, wheel, and full-screen range on mobile; popover, dual-month range, and inline calendar on desktop. The desktop popover keeps the input visible so officers can keep typing dates.',
        src: '/case-studies/presnt/explore-date.jpg',
      },
      {
        file: 'location-picker.jpg',
        title: 'Location picker: event form, new pin, saved library',
        caption: 'Covers the three places location shows up: picking inside the event form, dropping a pin when nothing matches, and managing the chapter’s saved locations.',
        src: '/case-studies/presnt/explore-location.jpg',
      },
    ],
    brandGallery: [
      {
        file: 'logo-directions.jpg',
        title: 'Four logo directions',
        caption: 'Roll Call, Check-P, Tally, and Pulse + Check. Pulse + Check won: concentric rings around a checkmark read as “check-in confirmed” and as location-aware.',
        src: '/case-studies/presnt/brand-directions.jpg',
      },
      {
        file: 'logo-refinements.jpg',
        title: 'Refining direction 4',
        caption: 'Clean Rings, Badge, and Signal. Clean Rings shipped: quiet, technical, and legible down to about 20px.',
        src: '/case-studies/presnt/brand-refine.jpg',
      },
      {
        file: 'palettes.jpg',
        title: 'Palette exploration',
        caption: 'Sage (education-calm), Court (athletic lime), and Hearth (warm coral). Hearth won because it feels community-first, made for clubs and youth groups rather than enterprise.',
        src: '/case-studies/presnt/brand-palettes.jpg',
      },
      {
        file: 'app-icon.jpg',
        title: 'Final app icon',
        caption: 'Two concentric rings and a coral checkmark, with dark (primary) and light versions and a scale check.',
        src: '/case-studies/presnt/brand-icon.jpg',
      },
    ],
    screens: [
      { label: 'Member profile', caption: 'Member: profile with check-in QR', src: '/case-studies/presnt/hf-member-profile.jpg' },
      { label: 'Admin status', caption: 'Admin: chapter-wide compliance', src: '/case-studies/presnt/hf-admin-status.jpg' },
      { label: 'Admin dues', caption: 'Admin: dues by member', src: '/case-studies/presnt/hf-admin-dues.jpg' },
    ],
    desktopScreens: [
      {
        file: 'admin/status',
        title: 'Admin · Status',
        caption: 'The officer console from the wireframes, built: sidebar navigation, compliance stats on the left, and every member’s standing on the right.',
        src: '/case-studies/presnt/admin-desk-status.jpg',
      },
      {
        file: 'member/profile',
        title: 'Member · Profile',
        caption: 'Every member carries a personal check-in QR, the second check-in path alongside geofencing, next to their contact details and dues status.',
        src: '/case-studies/presnt/member-desk-profile.jpg',
      },
      {
        file: 'admin/calendar',
        title: 'Admin · Calendar',
        caption: 'Recurring chapter meetings land on a month grid that officers can add events to directly.',
        src: '/case-studies/presnt/admin-desk-calendar.jpg',
      },
    ],
    colors: [
      { name: 'Background', hex: '#1A1411' },
      { name: 'Surface', hex: '#251B17' },
      { name: 'Surface alt', hex: '#2E2520' },
      { name: 'Primary', hex: '#F08862' },
      { name: 'Text', hex: '#FBF6EE' },
      { name: 'Muted', hex: '#A89687' },
      { name: 'Accent', hex: '#E0B250' },
      { name: 'Success', hex: '#7BA776' },
    ],
    type: [
      { sample: 'Drama Club · Thursday', spec: 'h1 · 32', size: 32, weight: 700, font: 'Space Grotesk' },
      { sample: '12 of 14 present', spec: 'xxl · 26', size: 26, weight: 600, font: 'Space Grotesk' },
      { sample: 'Mark attendance', spec: 'xl · 20', size: 20, weight: 500, font: 'Space Grotesk' },
      { sample: 'Tap a name to toggle', spec: 'md · 15', size: 15, weight: 400, font: 'Space Grotesk' },
    ],
    prototype: {
      headline: 'Try the live site.',
      body: 'Presnt is deployed. Hit “Try a demo” to explore it as an admin or a member, no account needed, right here or in a new tab.',
      demo: 'iframe',
    },
  },
  {
    slug: 'weatherbot',
    title: "Mikayla's Weather Bot",
    kind: 'Web app',
    years: '2026 → now',
    blurb:
      'A trading dashboard that forecasts the NYC daily high, prices it against Kalshi’s KXHIGHNY market, and paper-trades the edge, built to make one decision readable at a glance.',
    role: 'Product design + engineering',
    timeline: '2026 → now',
    platform: 'Web, desktop-first',
    stack: ['Next.js', 'FastAPI', 'PostgreSQL'],
    github: 'https://github.com/Mikay8/mikaylas-weather-bot',
    live: 'https://web-demo-production-f7a9.up.railway.app',
    cover: {
      label: 'Weather Bot cover image',
      caption: 'weatherbot-cover.jpg',
      src: '/case-studies/weatherbot/cover.jpg',
      compactSrc: '/case-studies/weatherbot/cover-compact.jpg',
    },
    problem: {
      headline: 'The forecast and the market disagree. Is that an edge, or noise?',
      highlight: 'an edge, or noise',
      body: [
        'Kalshi lists contracts on New York’s daily high temperature in 2°F brackets, and the National Weather Service publishes a forecast for the same day. When a calibrated model and the market price disagree, there may be money on the table, but only if you can trust the model and see how it has actually done.',
        'The bot pulls NWS forecasts and KXHIGHNY market snapshots, compares model probability to price, paper-trades the gap, and settles every bet against the official NWS high. The dashboard turns that loop into one readable decision with the track record right beside it.',
      ],
      goals: [
        'Lead with one decision: the top model pick, with market, model and edge side by side',
        'Make simulated and real money impossible to confuse',
        'Show the model’s track record next to its picks: forecast vs. actual, P&L, every trade',
        'Color only carries signal: blue forecast, amber actual, green buy, red sell',
      ],
    },
    wireframes: [],
    wireframesTag: 'lo-fi → mid-fi',
    explorations: [
      {
        file: 'dashboard-lofi.jpg',
        title: 'Lo-fi: one page, top to bottom',
        caption: 'Tomorrow’s forecast and the recommended bracket up top, system health under it, then forecast vs. actual, today’s contract, cumulative P&L and recent trades. The simulated-trading banner is there from the first sketch.',
        src: '/case-studies/weatherbot/process-lofi.jpg',
      },
      {
        file: 'dashboard-midfi.jpg',
        title: 'Mid-fi: the instrument panel',
        caption: 'Same structure with real values: a gradient forecast hero, buy and sell actions priced in cents, a bracket table with model edge per row, and P&L measured against the backtest.',
        src: '/case-studies/weatherbot/process-midfi.jpg',
      },
    ],
    brandGallery: [
      {
        file: 'design-kit.jpg',
        title: 'Design kit: instrument-panel foundations',
        caption: 'Dark neutrals for the chrome, and a small set of signal colors that each mean one thing. Includes the simulated and live-money banners, status badges, a 24px weather icon set, and shape and spacing rules.',
        src: '/case-studies/weatherbot/design-kit.jpg',
      },
    ],
    screens: [
      { label: 'Today', caption: 'Today: top model pick and active position', src: '/case-studies/weatherbot/hf-today.jpg' },
      { label: 'Paper wallet', caption: 'Paper wallet and open positions', src: '/case-studies/weatherbot/hf-wallet.jpg' },
      { label: 'Markets', caption: 'KXHIGHNY brackets: bid/ask and market odds', src: '/case-studies/weatherbot/hf-markets.jpg' },
    ],
    desktopScreens: [
      {
        file: 'dashboard/today',
        title: 'Dashboard · Today and tomorrow',
        caption: 'Today’s top model pick shows market, model and edge together, with a countdown to market close and the bot’s active position underneath.',
        src: '/case-studies/weatherbot/desk-hero.jpg',
      },
      {
        file: 'dashboard/forecast-vs-actual',
        title: 'Forecast vs. actual',
        caption: 'One point per day, NWS and Open-Meteo forecasts against the settled high, so the model’s error is always visible next to its picks.',
        src: '/case-studies/weatherbot/desk-forecast.jpg',
      },
      {
        file: 'dashboard/markets',
        title: 'KXHIGHNY markets',
        caption: 'Every bracket with bid/ask, market probability, model probability, fee-adjusted edge and a buy signal.',
        src: '/case-studies/weatherbot/desk-markets.jpg',
      },
      {
        file: 'dashboard/trade-history',
        title: 'Trade history',
        caption: 'The paper balance over time and every trade with its result, including the losing ones.',
        src: '/case-studies/weatherbot/desk-history.jpg',
      },
      {
        file: 'analytics',
        title: 'Analytics · Nightly post-mortems',
        caption: 'Claude reviews every settled trade each night and classifies it as bad luck, a data bug or systematic bias. A calibration change is only proposed when several trades point to the same bias and the fix backtests better, and it is never auto-merged.',
        src: '/case-studies/weatherbot/desk-analytics.jpg',
      },
    ],
    colors: [
      { name: 'Page', hex: '#0B0E12' },
      { name: 'Panel', hex: '#12161C' },
      { name: 'Border', hex: '#232A33' },
      { name: 'Text', hex: '#E8ECF0' },
      { name: 'Mercury', hex: '#6FA8DC' },
      { name: 'Amber', hex: '#D9A441' },
      { name: 'Profit', hex: '#5FB88A' },
      { name: 'Hazard', hex: '#E2564F' },
    ],
    type: [
      { sample: '89°', spec: 'hero temp · sans 300/56', size: 48, weight: 300, font: 'Inter' },
      { sample: 'System Health', spec: 'section · sans 700/20', size: 20, weight: 700, font: 'Inter' },
      { sample: '+$142.30', spec: 'data · mono 700/18', size: 18, weight: 700, font: 'JetBrains Mono' },
      { sample: 'Forecast vs. actual high', spec: 'eyebrow · sans 600/11', size: 12, weight: 600, caps: true, tracking: '.14em', font: 'Inter' },
    ],
    prototype: {
      headline: 'Watch it run.',
      body: 'The live demo is view-only: real forecasts, markets and paper trades, with trading and settings switched off.',
      demo: 'iframe',
    },
  },
  {
    slug: 'beyond-the-swipe',
    school: 'Georgia Tech · Human-Computer Interaction',
    title: 'Beyond the Swipe',
    kind: 'HCI research',
    years: '2025',
    blurb:
      'A school project for my Human-Computer Interaction course at Georgia Tech: redesigning the dating profile so people read who someone is before they decide, backed by interviews, a survey and two rounds of testing.',
    role: 'Solo: research, design, testing',
    timeline: 'One semester · 2025',
    platform: 'Mobile concept',
    stack: ['Interviews', 'Survey', 'Heuristic eval', 'Usability testing', 'Figma'],
    stackLabel: 'Methods',
    cover: {
      label: 'Beyond the Swipe cover image',
      caption: 'beyond-the-swipe-cover.jpg',
      src: '/case-studies/beyond-the-swipe/cover.jpg',
      compactSrc: '/case-studies/beyond-the-swipe/cover-compact.jpg',
    },
    problem: {
      headline: 'Swipe apps reward a split-second judgment on a photo.',
      highlight: 'split-second judgment',
      body: [
        'Swipe-based dating apps are built for speed: a big photo, a yes-or-no gesture, then the next profile. That makes it easy to judge on looks alone and hard to find anything to talk about, so matches stall or fade out.',
        'For my individual project in Georgia Tech’s Human-Computer Interaction course, I focused on one task: looking through a profile and deciding whether to like it. I ran needfinding, built three lo-fi concepts, tested them, and combined the strongest ideas into a final prototype.',
      ],
      goals: [
        'Get people to spend more time on a profile before they decide',
        'Put personality and shared interests up front, next to the photos',
        'Give people something specific to open with, so fewer matches go quiet',
        'Keep the controls familiar to anyone who has used a swipe app',
      ],
    },
    research: {
      intro:
        'I started by evaluating the three biggest apps, then interviewed five people while they walked me through how they read a profile, and used what came up to write a survey.',
      methods: [
        { value: '3', label: 'apps evaluated', note: 'Tinder, Bumble and Hinge, for consistency, affordance and tolerance' },
        { value: '5', label: 'interviews', note: 'Each with a walkthrough of how they read a profile' },
        { value: '23', label: 'survey responses', note: 'What drives a like, how long it takes, what goes wrong' },
        { value: '10', label: 'test sessions', note: 'Five rating three concepts, five walking through the final prototype' },
      ],
      heuristics: [
        {
          app: 'Tinder',
          src: '/case-studies/beyond-the-swipe/heuristic-tinder.jpg',
          source: 'tinder.com',
          notes: [
            { label: 'Consistency', text: 'Sets the standard: right to like, left to pass, up to super like. Interests sit far below the photo.' },
            { label: 'Affordance', text: 'Strong: carousel dashes and icon buttons. Boost and undo still need explaining.' },
            { label: 'Tolerance', text: 'Undo exists, but it’s paywalled and only works on passes.' },
          ],
        },
        {
          app: 'Bumble',
          src: '/case-studies/beyond-the-swipe/heuristic-bumble.jpg',
          source: 'bumble.com',
          notes: [
            { label: 'Consistency', text: 'Same swipe gestures, but it leads with job and education, then bio, photos and prompts.' },
            { label: 'Affordance', text: 'Weaker: it assumes you already know the swipe directions. A star marks the super swipe.' },
            { label: 'Tolerance', text: 'Paywalled undo, passes only.' },
          ],
        },
        {
          app: 'Hinge',
          src: '/case-studies/beyond-the-swipe/heuristic-hinge.jpg',
          source: 'hinge.co',
          notes: [
            { label: 'Consistency', text: 'Photo first like the others, but no age or job up top. Prompts and photos alternate.' },
            { label: 'Affordance', text: 'Good: every like and message button carries an icon.' },
            { label: 'Tolerance', text: 'Best of the three, with undo for passes, but still none for likes.' },
          ],
        },
      ],
      interviews: {
        title: 'What the interviews showed',
        points: [
          'Every walkthrough started at the photo, and most ended by going back to it before deciding.',
          'Most people decided in 30 seconds or less.',
          'All five described feeling disappointed, discouraged or hopeless after using the apps for a while.',
          'Boring profiles were a common complaint: one-word prompt answers, half-empty bios, photos that didn’t match the person.',
        ],
      },
      insights: [
        {
          stat: '57%',
          title: 'decide in under 30 seconds',
          body: '13 of 23 respondents spend 0–30 seconds on a profile before sending a like. Only two spend more than a minute.',
        },
        {
          stat: '8.4 vs 7.3',
          title: 'personality beats looks, until you watch what people do',
          body: 'Asked directly, people rated personality (8.4/10) above attractiveness (7.3/10). Asked to rank what actually drives a like, they put profile photos first. The layout leads with the photo, so the photo decides.',
        },
        {
          stat: '78%',
          title: 'name ghosting or poor communication',
          body: '18 of 23 chose it as a frustration, ahead of a lack of matches (61%) and superficial profiles (52%).',
        },
        {
          stat: '82%',
          title: 'say matches rarely or never become meaningful',
          body: '18 of the 22 people who answered. Most also get fewer than five in-person dates a month from the apps.',
        },
      ],
      charts: [
        {
          title: 'What influences a like the most',
          note: 'Mean rank out of 6, where 1 = most influential (n = 23)',
          items: [
            { label: 'Profile photo', pct: 75, display: '2.26' },
            { label: 'Shared interests', pct: 62, display: '2.91' },
            { label: 'Bio', pct: 53, display: '3.35' },
            { label: 'Age', pct: 48, display: '3.61' },
            { label: 'Location', pct: 38, display: '4.09' },
            { label: 'Height', pct: 24, display: '4.78' },
          ],
        },
        {
          title: 'Biggest frustrations',
          note: 'Share of respondents, select all that apply (n = 23)',
          items: [
            { label: 'Poor communication / ghosting', pct: 78, display: '78%' },
            { label: 'Lack of matches', pct: 61, display: '61%' },
            { label: 'Superficial', pct: 52, display: '52%' },
            { label: 'Time-consuming', pct: 35, display: '35%' },
            { label: 'Overwhelmed by choice', pct: 17, display: '17%' },
          ],
        },
      ],
      distributions: {
        title: 'How important is it when deciding to like a profile?',
        note: 'Responses on a 0–10 scale (n = 23)',
        series: [
          { label: 'Attractiveness', mean: '7.3', counts: [0, 0, 1, 0, 0, 0, 2, 8, 9, 3, 0] },
          { label: 'Personality', mean: '8.4', counts: [0, 0, 0, 1, 0, 2, 0, 2, 3, 8, 7] },
        ],
      },
    },
    wireframes: [],
    wireframesTag: 'three concepts → testing',
    conceptTest: {
      intro:
        'With help from a brainstorm in ChatGPT, I sketched three lo-fi concepts in Figma, each attacking a different finding. Five people who use dating apps rated each one and told me what they liked and didn’t.',
      participants: 5,
      concepts: [
        {
          name: 'Personality snapshots',
          src: '/case-studies/beyond-the-swipe/concept-snapshots.jpg',
          idea: 'Smaller photos inline with text, like a social profile, so no single photo dominates.',
          score: 5.4,
          picks: 1,
          liked: '“I like that you are forced to see multiple photos in one screen, so it reduces quick swipe-ability.”',
          disliked: '4 of 5 said it felt cluttered or congested.',
        },
        {
          name: 'Video first',
          src: '/case-studies/beyond-the-swipe/concept-video.jpg',
          idea: 'A full-screen video intro, then interests and prompts.',
          score: 6.4,
          picks: 3,
          liked: '“Video of the person gives you a better sense of their personality.”',
          disliked: '2 of 5 wanted more information on the opening screen.',
        },
        {
          name: 'Mutual interests',
          src: '/case-studies/beyond-the-swipe/concept-mutual.jpg',
          idea: 'Opens with what you have in common, then the photo, then prompts.',
          score: 7.4,
          picks: 1,
          liked: '“I like the this is what you have in common section, it helps for conversation starters.”',
          disliked: 'One participant worried about too much text.',
        },
      ],
      stats:
        'A one-way ANOVA found no significant difference between the three scores (F = 0.20, p = 0.82). With five participants that isn’t surprising, so I treated the scores as a direction rather than a verdict and leaned on what people said.',
      outcome:
        'Mutual interests scored highest, but video first was the favorite. People wanted both: something visual to pull them in, and something to talk about.',
      carried: [
        'The large media box from video first',
        'Mutual interests pinned to the top',
        'Structured blocks of text and images from snapshots',
      ],
    },
    screens: [],
    desktopScreens: [
      {
        file: 'profile.fig',
        title: 'Profile: opening screen and the scroll',
        caption:
          'Mutual interests sit above the photo, so the first thing you read is what you share. The photo is a single media box, not a carousel, which nudges you to scroll. Below it, bio, info, prompts and photos alternate, and every text block has its own comment button. Comment replaces like, so every like starts a conversation.',
        src: '/case-studies/beyond-the-swipe/final-profile.jpg',
      },
      {
        file: 'message.fig',
        title: 'Messaging: a suggested opener, or your own words',
        caption:
          'A suggested opener based on a shared interest makes it easier to start. Writing your own takes at least three words, so “hey” isn’t an option. A clear confirmation shows the message went through.',
        src: '/case-studies/beyond-the-swipe/final-message.jpg',
      },
    ],
    colors: [
      { name: 'Card', hex: '#3B414A' },
      { name: 'Modal', hex: '#50565F' },
      { name: 'Input', hex: '#26252A' },
      { name: 'Pass', hex: '#4D3A38' },
      { name: 'Comment', hex: '#324832' },
      { name: 'Suggested', hex: '#76B2F9' },
      { name: 'Sent', hex: '#65C366' },
    ],
    prototype: {
      headline: 'Walk through it.',
      body: 'A video walkthrough of the final Figma prototype: the opening screen, the scroll into the full profile, and sending a message.',
      note: 'Profile images were AI-generated with ChatGPT for the prototype.',
      demo: 'video',
      video: 'tUVzEoF3fPI',
    },
    results: {
      score: '7.8',
      scoreLabel: 'average likelihood to use, out of 10 (n = 5)',
      intro:
        'Five more people, some who use dating apps and some who don’t, walked through the prototype while thinking aloud, then answered questions about each screen. Ratings ranged from 6 to 10.',
      findings: [
        {
          title: 'Familiar controls, nothing to learn',
          body: 'All five found the controls intuitive. The icons and colors (a red X to pass, a green comment to message) matched what they knew from other apps.',
        },
        {
          title: 'Mutual interests pulled people in',
          body: 'The shared-interest banner at the top was the feature people mentioned most for making them read further.',
        },
        {
          title: 'The three-word minimum made people read',
          body: 'Because a message needs real words, participants read the prompts first so they’d have something to say.',
        },
        {
          title: 'The up arrow didn’t say “more info”',
          body: '2 of 5 weren’t sure what it did. It’s the clearest fix for another round.',
        },
      ],
      next: [
        'Label the up-arrow button, or let scrolling do the work',
        'Test with a larger and more varied group: everyone here was a friend or classmate, close in age and mostly in one metro area',
        'Measure real time on a profile in a working build instead of self-reported time',
        'Alternate text and images more evenly, as one participant suggested',
      ],
    },
  },
];

export function findCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug);
}

// Sections on a case study page, also used as the tags on its project card.
export function caseSections(c: CaseStudy) {
  return [
    { id: 'problem', label: 'problem' },
    ...(c.research ? [{ id: 'research', label: 'research' }] : []),
    { id: 'wireframes', label: 'wireframes' },
    { id: 'visual-design', label: 'visual design' },
    { id: 'prototype', label: 'prototype' },
    ...(c.results ? [{ id: 'results', label: 'results' }] : []),
  ];
}
