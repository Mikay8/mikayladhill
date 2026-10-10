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

export interface CaseStudy {
  slug: string;
  title: string;
  kind: string;
  years: string;
  blurb: string;
  role: string;
  timeline: string;
  platform: string;
  stack: string[];
  github?: string;
  live?: string;
  cover: Shot;
  problem: {
    headline: string;
    highlight: string; // substring of headline to mark
    body: string[];
    goals: string[];
  };
  wireframes: Shot[];
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
    demo: 'crrnt' | 'iframe';
  };
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
];

export function findCaseStudy(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug);
}

// Section tags shown on project cards; mirror the case study page sections.
export const CASE_SECTIONS = [
  { id: 'problem', label: 'problem' },
  { id: 'wireframes', label: 'wireframes' },
  { id: 'visual-design', label: 'visual design' },
  { id: 'prototype', label: 'prototype' },
] as const;
