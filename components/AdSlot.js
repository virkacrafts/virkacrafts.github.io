export default function AdSlot({label = 'Advertisement'}) {
  return <aside className="ad-slot" aria-label={label}>{label}</aside>
}
