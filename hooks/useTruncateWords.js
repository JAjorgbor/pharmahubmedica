export default function useTruncateText(text, clipCount) {
  return text.slice(0, clipCount) + '...'
}
