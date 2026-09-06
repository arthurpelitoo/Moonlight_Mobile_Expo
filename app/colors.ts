// Paleta oficial Moonlight — mantém coerência com o web (Tailwind custom tokens)
// bg-night, bg-night-soft, bg-blue-cta etc. traduzidos para hex

export const Colors = {
  // Fundos
  night:                '#0D1117',
  nightHover:           '#161B27',
  nightSoft:            '#1E2235',
  nightSoftMid:         '#252A3E',
  nightSoftTransparent: 'rgba(30, 34, 53, 0.7)',

  // CTA
  blueCta:              '#4F7EFF',
  blueCtaHover:         '#3A6BEF',
  blueCtaGlow:          'rgba(79, 126, 255, 0.2)',

  // Texto
  white:                '#FFFFFF',
  textPrimary:          '#E2E8F0',
  textSecondary:        '#94A3B8',
  textMuted:            '#4B5563',
  textNightHover:       '#CBD5E1',

  // Bordas
  border:               '#2D3557',
  borderFocus:          '#4F7EFF',
  borderError:          '#EF4444',

  // Status
  error:                '#EF4444',
  errorSurface:         'rgba(239, 68, 68, 0.08)',
  success:              '#10B981',
  successSurface:       'rgba(16, 185, 129, 0.1)',

  // Danger (consistência com Button)
  danger:               '#DC2626',
  dangerHover:          '#B91C1C',
} as const;

export type ColorKey = keyof typeof Colors;
