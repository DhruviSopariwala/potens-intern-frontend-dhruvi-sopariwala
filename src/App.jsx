import { RouterProvider } from 'react-router-dom'
import { LanguageProvider } from '@/context/LanguageContext'
import { router } from '@/routes'

function App() {
  return (
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  )
}

export default App
