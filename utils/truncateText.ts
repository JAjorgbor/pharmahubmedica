export default function truncateText(text: string, clipCount: number) {
  return text.length >= 30 ? text.slice(0, clipCount) + '...' : text
}
