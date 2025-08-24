"use client";
import { useState, useEffect } from "react";

interface NDEFReadingEvent extends Event {
  serialNumber: string;
  message: NDEFMessage;
}
interface NDEFMessage {
  records: ReadonlyArray<NDEFRecord>;
}
interface NDEFRecord {
  readonly recordType: string;
  readonly mediaType?: string;
  readonly id?: string;
  readonly data?: DataView;
  readonly encoding?: string;
  readonly lang?: string;
}
interface NDEFReader {
  scan: () => Promise<void>;
  onreading: (event: NDEFReadingEvent) => void;
  onreadingerror: (event: Event) => void;
}
declare global {
  interface Window {
    NDEFReader: new () => NDEFReader;
  }
}

interface NFCReaderProps {
  onScan?: () => void;
}

export default function NFCReader({ onScan }: NFCReaderProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanNFC = async () => {
    if (!("NDEFReader" in window)) {
      setError("NFC no soportado en este navegador");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      const reader = new window.NDEFReader();
      await reader.scan();
      
      reader.onreading = (event: NDEFReadingEvent) => {
        setIsScanning(false);
        if (onScan) {
          onScan();
        }
      };

      reader.onreadingerror = () => {
        setIsScanning(false);
        setError("Error al leer NFC");
      };
    } catch (err) {
      setIsScanning(false);
      setError("Error al iniciar NFC");
    }
  };

  const handleCreateWallet = () => {
    if (onScan) {
      onScan();
    }
  };

  return (
    <div className="nfc-container">
      <h2 className="nfc-title">Demo NFC</h2>
      
      <div className="nfc-buttons">
        <button
          onClick={handleScanNFC}
          disabled={isScanning}
          className="nfc-button scan-button"
        >
          {isScanning ? "Escaneando..." : "Escanear NFC"}
        </button>

        <button
          onClick={handleCreateWallet}
          className="nfc-button wallet-button"
        >
          Crear Wallet
        </button>
      </div>

      <p className="nfc-instruction">
        Presiona el botón y acerca tu dispositivo al sticker NFC
      </p>

      {error && (
        <p className="nfc-error">{error}</p>
      )}
    </div>
  );
}