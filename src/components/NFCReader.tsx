"use client";
import { useState } from "react";

// --- (Las definiciones de tipo que agregamos antes se mantienen igual) ---
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

// --- Tu Componente Corregido ---

export default function NFCReader() {
  const [tag, setTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Función que se ejecuta al hacer clic en el botón
  const handleScanNFC = async () => {
    // Reseteamos los estados antes de cada escaneo
    setTag(null);
    setError(null);

    if ("NDEFReader" in window) {
      try {
        const reader = new window.NDEFReader();
        await reader.scan();

        reader.onreading = (event: NDEFReadingEvent) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            if (record.data) {
              setTag(decoder.decode(record.data));
            }
          }
        };

      } catch (err: unknown) { // Usamos 'unknown' para mayor seguridad
        if (err instanceof Error) {
          setError("Error al iniciar NFC: " + err.message);
        } else {
          setError("Ocurrió un error desconocido.");
        }
      }
    } else {
      setError("⚠️ Web NFC no está soportado en este dispositivo/navegador.");
    }
  };

  return (
    <div className="p-4 border rounded-xl flex flex-col items-center gap-4">
      <h2 className="text-lg font-bold">Demo NFC</h2>
      
      {/* Botón para iniciar el escaneo */}
      <button 
        onClick={handleScanNFC}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Escanear NFC
      </button>

      {error && <p className="text-red-500 text-center">{error}</p>}
      
      <p className="text-center">
        {tag ? `✅ Detectado: ${tag}` : "Presiona el botón y acerca tu dispositivo al sticker"}
      </p>
    </div>
  );
}