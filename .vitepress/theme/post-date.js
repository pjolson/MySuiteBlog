// Frontmatter dates are bare days (2026-09-25), which YAML reads as midnight
// UTC. Formatting in UTC keeps the printed day the same for every visitor and
// identical between the build and the browser.
export function formatPostDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export function isoPostDate(date) {
  return new Date(date).toISOString().slice(0, 10)
}
