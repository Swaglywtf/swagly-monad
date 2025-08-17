"use client";
import { useEffect, useState } from "react";

export default function NFCReader() {
  const [tag, setTag] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("NDEFReader" in window) {
      const reader = new (window as any).NDEFReader();
      reader.scan().then(() => {
        reader.onreading = (event: any) => {
          const decoder = new TextDecoder();
          for (const record of event.message.records) {
            setTag(decoder.decode(record.data));
          }
        };
      }).catch((err: any) => {
        setError("Error al iniciar NFC: " + err);
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
