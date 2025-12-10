import TeamSection from '@/components/admin/team/team-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Team' }

export default function TeamPage() {
  return (
    <>
      <SetHeaderTitle title="Team" />
      <TeamSection />
    </>
  )
}
