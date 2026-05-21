import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { OfflineNotice } from '@/components/OfflineNotice'
import { useLanguage } from '@/context/LanguageContext'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { AppShell } from './AppShell'
import { Container } from './Container'
import { LanguageToggle } from './LanguageToggle'
import { Main } from './Main'

export const AppLayout = memo(function AppLayout() {
  const { t } = useLanguage()
  const isOnline = useOnlineStatus()

  return (
    <AppShell>
      <OfflineNotice visible={!isOnline} />
      <header className="sticky top-0 z-10 border-b border-border bg-surface-raised/95 backdrop-blur-sm">
        <Container className="flex items-center justify-between gap-4 py-3.5 sm:py-4">
          <span className="type-overline">{t('app.title')}</span>
          <LanguageToggle />
        </Container>
      </header>

      <Main>
        <Outlet />
      </Main>
    </AppShell>
  )
})
