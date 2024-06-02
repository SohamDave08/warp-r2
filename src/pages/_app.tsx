import { AlertProvider } from "@/hooks/useAlerts";
import { ModalProvider } from "@/hooks/useModal";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <AlertProvider>
          <Component {...pageProps} />
        </AlertProvider>
      </ModalProvider>
    </QueryClientProvider>
  )
}
