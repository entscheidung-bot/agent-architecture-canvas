import { describe, it, expect } from 'vitest'
import guidance from './guidance.json'

describe('plain-language bank examples', () => {
  it('provides 84 distinct banking answers and useful prompts without unexplained jargon', () => {
    const entries = Object.values(guidance)
    expect(entries).toHaveLength(84)
    expect(new Set(entries.map(x => x.example)).size).toBe(84)
    expect(new Set(entries.map(x => x.placeholder)).size).toBe(84)
    for (const entry of entries) {
      expect(entry.example).toMatch(/bank|account|customer|support|ticket|fee|card|saving|loan/i)
      expect(entry.placeholder).not.toMatch(/approach, boundaries, and verification/)
      expect(entry.example + entry.placeholder).not.toMatch(/\b(tenant|telemetry|idempotency|canonical|ingress|egress|token|span|L2|immutable|canary|provenance)\b/i)
    }
  })
})
