"use client";
import { useState, useEffect } from "react";

// --- (Las definiciones de tipo se mantienen igual) ---
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

// --- Componente con Lógica de Fallback Manual ---

export default function NFCReader() {
  const [tag, setTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNfcSupported, setIsNfcSupported] = useState<boolean>(true);
  
  // NUEVO: Estado para guardar la clave manual
  const [manualKey, setManualKey] = useState<string>("");

  useEffect(() => {
    // Comprobamos la compatibilidad una sola vez
    if (!("NDEFReader" in window)) {
      setIsNfcSupported(false);
    }
  }, []);

  const handleScanNFC = async () => {
    setTag(null);
    setError(null);
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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError("Error al escanear: " + err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    }
  };

  // NUEVO: Función para manejar el envío manual
  const handleManualSubmit = () => {
    if (manualKey.trim() === "") {
      setError("Por favor, introduce una clave.");
      return;
    }
    setError(null);
    setTag(manualKey); // Usamos el mismo estado "tag" para mostrar el resultado
    console.log("Clave manual enviada:", manualKey);
  };

  return (
    <div className="p-4 border rounded-xl flex flex-col items-center gap-4 w-full max-w-sm">
      <h2 className="text-lg font-bold">
        {isNfcSupported ? "Verificación NFC" : "Verificación Manual"}
      </h2>

      {isNfcSupported ? (
        // --- Interfaz para navegadores compatibles ---
        <>
          <button
            onClick={handleScanNFC}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Escanear NFC
          </button>
          <p className="text-center text-sm text-gray-500">
            Presiona el botón y acerca tu dispositivo al sticker.
          </p>
        </>
      ) : (
        // --- Interfaz para navegadores NO compatibles ---
        <>
          <p className="text-center text-sm text-yellow-700 bg-yellow-50 p-2 rounded-md">
            ⚠️ Tu navegador no es compatible con NFC. Por favor, introduce la clave manualmente.
          </p>
          <input
            type="text"
            value={manualKey}
            onChange={(e) => setManualKey(e.target.value)}
            placeholder="Escribe tu clave aquí..."
            className="border rounded-md p-2 w-full text-center"
          />
          <button
            onClick={handleManualSubmit}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors"
          >
            Enviar Clave
          </button>
        </>
      )}

      {/* --- Área de Resultados (común para ambos métodos) --- */}
      <div className="mt-4 text-center">
        {error && <p className="text-red-500">{error}</p>}
        {tag && (
          <p className="text-green-600 font-bold text-lg">
            ✅ Clave Procesada: {tag}
          </p>
        )}
      </div>
    </div>
  );
}