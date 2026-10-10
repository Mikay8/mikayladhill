// Presnt lo-fi wireframes, grouped by role. Generated from the wireframe canvas;
// images live in /public/case-studies/presnt/wireframes/.

import type { WireframeSet } from './caseStudies';

export const presntWireframes: WireframeSet[] = [
  {
    id: 'auth',
    title: 'Auth',
    mobileNote: 'Sign in, onboarding, chapter setup',
    desktopNote: 'Split layout with branded panel',
    mobile: [
      { label: 'login', src: '/case-studies/presnt/wireframes/auth-m-00-login.png' },
      { label: 'register', src: '/case-studies/presnt/wireframes/auth-m-01-register.png' },
      { label: 'onboarding', src: '/case-studies/presnt/wireframes/auth-m-02-onboarding.png' },
      { label: 'create-chapter', src: '/case-studies/presnt/wireframes/auth-m-03-create-chapter.png' },
      { label: 'join-chapter', src: '/case-studies/presnt/wireframes/auth-m-04-join-chapter.png' },
    ],
    desktop: [
      { label: 'login', src: '/case-studies/presnt/wireframes/auth-d-05-login.jpg' },
      { label: 'register', src: '/case-studies/presnt/wireframes/auth-d-06-register.jpg' },
      { label: 'onboarding', src: '/case-studies/presnt/wireframes/auth-d-07-onboarding.jpg' },
      { label: 'create-chapter', src: '/case-studies/presnt/wireframes/auth-d-08-create-chapter.jpg' },
      { label: 'join-chapter', src: '/case-studies/presnt/wireframes/auth-d-09-join-chapter.jpg' },
    ],
  },
  {
    id: 'member',
    title: 'Member',
    mobileNote: 'Tab bar nav · 4 sections',
    desktopNote: 'Sidebar + content · same 5 pages',
    mobile: [
      { label: 'index', src: '/case-studies/presnt/wireframes/member-m-10-index.png' },
      { label: 'calendar', src: '/case-studies/presnt/wireframes/member-m-11-calendar.png' },
      { label: 'event/[id]', src: '/case-studies/presnt/wireframes/member-m-12-event-id.png' },
      { label: 'status', src: '/case-studies/presnt/wireframes/member-m-13-status-dial.png' },
      { label: 'profile', src: '/case-studies/presnt/wireframes/member-m-14-profile.png' },
    ],
    desktop: [
      { label: 'index', src: '/case-studies/presnt/wireframes/member-d-15-index.jpg' },
      { label: 'calendar', src: '/case-studies/presnt/wireframes/member-d-16-calendar.jpg' },
      { label: 'event/[id]', src: '/case-studies/presnt/wireframes/member-d-17-event-id.jpg' },
      { label: 'status', src: '/case-studies/presnt/wireframes/member-d-18-status-dial.jpg' },
      { label: 'profile', src: '/case-studies/presnt/wireframes/member-d-19-profile.jpg' },
    ],
  },
  {
    id: 'officer',
    title: 'Officer',
    mobileNote: 'Event ops surface',
    desktopNote: 'Tables + bulk actions',
    mobile: [
      { label: 'events', src: '/case-studies/presnt/wireframes/officer-m-20-events.png' },
      { label: 'event/new', src: '/case-studies/presnt/wireframes/officer-m-21-event-new.png' },
      { label: 'event/[id]/edit', src: '/case-studies/presnt/wireframes/officer-m-22-event-id-edit.png' },
      { label: 'location picker (sheet)', src: '/case-studies/presnt/wireframes/officer-m-23-location-picker-sheet.png' },
      { label: 'saved locations', src: '/case-studies/presnt/wireframes/officer-m-24-saved-locations.png' },
      { label: 'attendance/[id]', src: '/case-studies/presnt/wireframes/officer-m-25-attendance-id.png' },
      { label: 'excuses', src: '/case-studies/presnt/wireframes/officer-m-26-excuses.png' },
      { label: 'members', src: '/case-studies/presnt/wireframes/officer-m-27-members.png' },
    ],
    desktop: [
      { label: 'events', src: '/case-studies/presnt/wireframes/officer-d-28-events.jpg' },
      { label: 'event/new', src: '/case-studies/presnt/wireframes/officer-d-29-event-new.jpg' },
      { label: 'event/[id]/edit', src: '/case-studies/presnt/wireframes/officer-d-30-event-id-edit.jpg' },
      { label: 'saved locations', src: '/case-studies/presnt/wireframes/officer-d-31-saved-locations.jpg' },
      { label: 'attendance/[id]', src: '/case-studies/presnt/wireframes/officer-d-32-attendance-id.jpg' },
      { label: 'excuses', src: '/case-studies/presnt/wireframes/officer-d-33-excuses.jpg' },
      { label: 'members', src: '/case-studies/presnt/wireframes/officer-d-34-members.jpg' },
    ],
  },
  {
    id: 'admin',
    title: 'Admin',
    mobileNote: 'Compressed read-only views; full control on desktop',
    desktopNote: 'Full control surface · tables + config panels',
    mobile: [
      { label: 'dashboard', src: '/case-studies/presnt/wireframes/admin-m-35-dashboard.png' },
      { label: 'members', src: '/case-studies/presnt/wireframes/admin-m-36-members.png' },
      { label: 'roles', src: '/case-studies/presnt/wireframes/admin-m-37-roles.png' },
      { label: 'committees', src: '/case-studies/presnt/wireframes/admin-m-38-committees.png' },
      { label: 'dues', src: '/case-studies/presnt/wireframes/admin-m-39-dues.png' },
      { label: 'status', src: '/case-studies/presnt/wireframes/admin-m-40-status.png' },
      { label: 'settings', src: '/case-studies/presnt/wireframes/admin-m-41-settings.png' },
    ],
    desktop: [
      { label: 'dashboard', src: '/case-studies/presnt/wireframes/admin-d-42-dashboard.jpg' },
      { label: 'members', src: '/case-studies/presnt/wireframes/admin-d-43-members.jpg' },
      { label: 'roles', src: '/case-studies/presnt/wireframes/admin-d-44-roles.jpg' },
      { label: 'committees', src: '/case-studies/presnt/wireframes/admin-d-45-committees.jpg' },
      { label: 'dues', src: '/case-studies/presnt/wireframes/admin-d-46-dues.jpg' },
      { label: 'status', src: '/case-studies/presnt/wireframes/admin-d-47-status.jpg' },
      { label: 'settings · branding', src: '/case-studies/presnt/wireframes/admin-d-48-settings-branding.jpg' },
    ],
  },
  {
    id: 'super-user',
    title: 'Super User',
    mobileNote: 'Dark theme · platform-wide control over orgs, users, billing, flags & config',
    desktopNote: 'Dark theme · platform-wide control over orgs, users, billing, flags & config',
    mobile: [
      { label: 'mobile', src: '/case-studies/presnt/wireframes/super-user-m-49-super-user-mobile.png' },
    ],
    desktop: [
      { label: 'desktop overview', src: '/case-studies/presnt/wireframes/super-user-d-50-super-user-desktop-overview.jpg' },
    ],
  },
];
