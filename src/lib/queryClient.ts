import { QueryClient } from '@tanstack/react-query'

/**
 * Singleton React Query client shared across the application.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})
