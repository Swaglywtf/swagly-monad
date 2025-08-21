"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Hex, http, parseAbi, encodeFunctionData, createPublicClient } from "viem";
import { monadTestnet } from "../config/chains";

// --- Configuración ---
const REOWN_CONTRACT_ADDRESS = "0x..."; // PEGA AQUÍ TU DIRECCIÓN DE CONTRATO
const REOWN_CONTRACT_ABI = parseAbi(["function claim(address to, uint256 tokenId)"]);
// Usamos la RPC pública de Monad para leer datos
const RPC_URL = monadTestnet.rpcUrls.public.http[0];

export function NfcClaim() {
    const searchParams = useSearchParams();
    const assetToClaim = searchParams.get("assetId");

    const { ready, authenticated, user, login } = usePrivy();

    const [status, setStatus] = useState("Esperando...");
    const [isClaimed, setIsClaimed] = useState(false);
    const [txHash, setTxHash] = useState<string | null>(null);

    useEffect(() => {
        const handleOnboarding = async () => {
            if (!assetToClaim || !authenticated || !user?.wallet || isClaimed) {
                if (ready && !authenticated && assetToClaim) {
                    setStatus(`Conéctate para reclamar el Activo #${assetToClaim}`);
                }
                return;
            }
            // Si todo está listo, llamamos directamente a la función de reclamo
            await claimReownAsset(user.wallet, assetToClaim);
        };

        handleOnboarding();
    }, [ready, authenticated, user, assetToClaim, isClaimed]);

    const claimReownAsset = async (privyWallet: any, assetId: string) => {
        setStatus(`Reclamando activo #${assetId}...`);
        try {
            // Aseguramos que la wallet esté en la red correcta
            await privyWallet.switchChain(monadTestnet.id);

            // Preparamos la transacción
            const calldata = encodeFunctionData({
                abi: REOWN_CONTRACT_ABI,
                functionName: 'claim',
                // El 'to' es la propia dirección de la wallet del usuario
                args: [privyWallet.address as Hex, BigInt(assetId)]
            });

            // Enviamos la transacción directamente desde la wallet de Privy
            const hash = await privyWallet.sendTransaction({
                to: REOWN_CONTRACT_ADDRESS as Hex,
                data: calldata,
            });
            
            setStatus("Procesando transacción...");
            
            // Esperamos a que la transacción se confirme
            const publicClient = createPublicClient({ chain: monadTestnet, transport: http(RPC_URL) });
            await publicClient.waitForTransactionReceipt({ hash });

            setTxHash(hash);
            setIsClaimed(true);
            setStatus(`¡Éxito! Activo #${assetId} reclamado.`);
        } catch (error: any) {
            console.error("Error en claimReownAsset:", error);
            setStatus("Error al reclamar el activo: " + error.message);
        }
    };

    if (!assetToClaim) return null;

    return (
        <div className="p-6 border rounded-xl text-center bg-white shadow-md max-w-sm mx-auto">
            <h2 className="text-xl font-bold mb-4">Reclama tu Activo Digital</h2>
            <p className="font-mono text-lg mb-4">Activo ID: {assetToClaim}</p>
            <div className="my-4 text-gray-600 min-h-[40px] p-2 bg-gray-100 rounded-md">
                <p>Estado: {status}</p>
            </div>

            {isClaimed && user?.wallet?.address && (
                <div className="mt-4 text-left text-sm space-y-2">
                    <p className="text-green-600 font-bold">¡Felicidades!</p>
                    <p>Tu wallet es: <span className="font-mono break-all">{user.wallet.address}</span></p>
                    <p>Tx Hash: <span className="font-mono break-all">{txHash}</span></p>
                </div>
            )}

            {ready && !authenticated && (
                <button
                    onClick={login}
                    className="bg-black text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors mt-4"
                >
                    Conectar para Reclamar
                </button>
            )}
        </div>
    );
}