// src/app/page.tsx
"use client"; // Añadimos "use client" si no estaba, ya que usamos hooks.
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from "next/image";
import { Suspense } from 'react'; // 👈 1. Importamos Suspense
import { NfcClaim } from "@/components/NfcClaim"; // 👈 2. Importamos el componente correcto

export default function Home() {
  return (
    <div className="pages flex flex-col items-center justify-center min-h-screen p-6">
      <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
      
      <h1 className="text-2xl font-bold mt-4 mb-6">
        AppKit Wagmi Next.js App Router Example
      </h1>

      <ConnectButton />
      <ActionButtonList />

      {/* Demo de NFC */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2 text-center">Reclamar Activo por NFC</h2>
        {/* 3. Reemplazamos el componente antiguo y lo envolvemos en Suspense */}
        <Suspense fallback={<div>Cargando componente NFC...</div>}>
          <NfcClaim />
        </Suspense>
      </div>

      <div className="advice mt-10 text-center">
        <p>
          This projectId only works on localhost. <br />
          Go to{" "}
          <a
            href="https://cloud.reown.com"
            target="_blank"
            className="link-button"
            rel="Reown Cloud"
          >
            Reown Cloud
          </a>{" "}
          to get your own.
        </p>
      </div>
      
      <InfoList />
    </div>
  );
}