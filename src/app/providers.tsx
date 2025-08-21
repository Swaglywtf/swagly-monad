// src/app/providers.tsx
"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config as wagmiConfig } from "@/config";
// --- CAMBIO AQUÍ ---
// Usamos la ruta relativa correcta para encontrar el archivo desde la raíz
import { monadTestnet } from "../config/chains"; 

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ["email", "google"],
        defaultChain: monadTestnet, 
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}