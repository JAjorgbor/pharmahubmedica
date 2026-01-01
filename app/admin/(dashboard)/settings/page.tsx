import SettingsSection from '@/components/admin/settings/settings-section'
import SetHeaderTitle from '@/components/scaffold/set-header-title'

export const metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <>
      <SetHeaderTitle title="Settings" />
      <SettingsSection />
    </>
  )
}
