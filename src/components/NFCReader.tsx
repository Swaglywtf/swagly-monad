"use client";
import { useEffect, useState } from "react";

// --- Definiciones de Tipo para la Web NFC API ---
// Esto le enseña a TypeScript cómo son NDEFReader y sus eventos relacionados,
// eliminando la necesidad de usar "any".

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

// Aquí extendemos la interfaz global "Window" para incluir NDEFReader
declare global {
  interface Window {
    NDEFReader: new () => NDEFReader;
  }
}

// --- Tu Componente Corregido ---

export default function NFCReader() {
  const [tag, setTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("NDEFReader" in window) {
      const reader = new window.NDEFReader();

      reader.scan().then(() => {
        // Se usa el tipo específico NDEFReadingEvent en lugar de "any"
        reader.onreading = (event: NDEFReadingEvent) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            // Aseguramos que "record.data" exista antes de decodificarlo
            if (record.data) {
              setTag(decoder.decode(record.data));
            }
          }
        };
      }).catch((err: Error) => { // Se usa el tipo Error en lugar de "any"
        setError("Error al iniciar NFC: " + err.message);
      });
    } else {
      setError("⚠️ Web NFC no está soportado en este dispositivo/navegador.");
    }
  }, []);

  return (
    <div className="p-4 border rounded-xl">
      <h2 className="text-lg font-bold">Escanea tu NFC</h2>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>{tag ? `✅ Detectado: ${tag}` : "📱 Acerca tu teléfono al sticker"}</p>
      )}
    </div>
  );
}