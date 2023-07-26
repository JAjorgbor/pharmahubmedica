export default function useTruncateText(text, clipCount) {
  return text.length >= 30 ? text.slice(0, clipCount) + '...' : text
}
