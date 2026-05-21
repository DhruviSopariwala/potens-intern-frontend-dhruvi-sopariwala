import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { RouteFallback } from '@/components/layout/RouteFallback'

const CategoryScreen = lazy(() =>
  import('@/screens/CategoryScreen').then((m) => ({
    default: m.CategoryScreen,
  })),
)
const DetailsScreen = lazy(() =>
  import('@/screens/DetailsScreen').then((m) => ({
    default: m.DetailsScreen,
  })),
)
const ConfirmationScreen = lazy(() =>
  import('@/screens/ConfirmationScreen').then((m) => ({
    default: m.ConfirmationScreen,
  })),
)

function LazyScreen({ Screen }) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Screen />
    </Suspense>
  )
}

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LazyScreen Screen={CategoryScreen} />,
      },
      {
        path: 'details/:categoryId',
        element: <LazyScreen Screen={DetailsScreen} />,
      },
      {
        path: 'confirmation',
        element: <LazyScreen Screen={ConfirmationScreen} />,
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
])
