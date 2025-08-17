// import { cookieStorage, createStorage, http } from '@wagmi/core'
import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import NFCReader from "@/components/NFCReader"; // 👈 importamos tu lector NFC
import Image from "next/image";


export default function Home() {
  return (
    <div className="pages flex flex-col items-center justify-center min-h-screen p-6">
      <Image src="/reown.svg" alt="Reown" width={150} height={150} priority />
      

      <h1 className="text-2xl font-bold mt-4 mb-6">
        AppKit Wagmi Next.js App Router Example
      </h1>

      {/* Botón de conexión de AppKit */}
      <ConnectButton />

      {/* Acciones de prueba */}
      <ActionButtonList />

      {/* Demo de NFC */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Demo NFC</h2>
        <NFCReader /> {/* 👈 Aquí se muestra el lector NFC */}
      </div>

      {/* Nota */}
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

      {/* Info de conexión */}
      <InfoList />
    </div>
  );
}
