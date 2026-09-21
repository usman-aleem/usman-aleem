export type FlowStep = { label: string; detail: string }

// Placeholder flow, generic on purpose until real project details are finalized.
const placeholder: FlowStep[] = [
  { label: 'Client', detail: 'Uses the application' },
  { label: 'Flutter UI', detail: 'Presentation layer' },
  { label: 'App logic', detail: 'State and business logic' },
  { label: 'Backend', detail: 'Details coming soon' },
]

export const architecture: Record<string, FlowStep[]> = {
  'crochet-by-urooj': placeholder,
  'azu-wears': placeholder,
  sakinah: placeholder,
  'younas-sweet-bakers': placeholder,
}
