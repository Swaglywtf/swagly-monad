"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function NFCPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<'nfc' | 'airdrop' | 'success'>('nfc');

  const handleNFCScan = () => {
    // Simular escaneo NFC y creación automática de wallet
    console.log('NFC escaneado, creando wallet automáticamente...');
    setCurrentStep('airdrop');
  };

  const handleAirdropComplete = () => {
    setCurrentStep('success');
  };

  const handleAddToWallet = () => {
    // Simular añadir a Apple/Google Wallet
    alert("Añadiendo trofeo digital a tu wallet móvil...");
  };

  const handleGoBack = () => {
    router.push('/');
  };

  if (currentStep === 'success') {
    return (
      <div className="pages flex flex-col items-center justify-center min-h-screen p-6">
        <div className="modal">
          <div className="success-screen">
            <div className="success-icon">🏆</div>
            <h1 className="success-title">¡Onboarding Completado!</h1>
            <p className="success-description">
              Has forjado exitosamente tu identidad onchain en la red de Monad.
              <br />
              Tu Soulbound Token "Mobil3 Builder" y recompensas han sido enviadas a tu wallet.
            </p>
            <button className="wallet-button" onClick={handleAddToWallet}>
              <div className="wallet-button-content">
                <span>Añadir mi Trofeo Digital a mi</span>
                <div className="wallet-logos">
                  <svg className="google-wallet-logo" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Wallet</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'airdrop') {
    return (
      <div className="pages flex flex-col items-center justify-center min-h-screen p-6">
        <div className="modal">
          <div className="logo-container">
            <Image 
              src="/Swagly logo.svg" 
              alt="Swagly Logo" 
              width={480} 
              height={480} 
              className="logo-icon"
            />
          </div>
          
          <h1 className="title">Creando Wallet y Procesando Airdrop</h1>
          
          <p className="description">
            Tu wallet ha sido creada automáticamente.
            <br />
            Estamos enviando tu Soulbound Token y tokens de prueba...
          </p>
          
          <div className="loading-animation">
            <div className="spinner"></div>
            <p>Procesando transacción en Monad...</p>
          </div>
          
          <button className="cta-button" onClick={handleAirdropComplete}>
            Completar Airdrop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pages flex flex-col items-center justify-center min-h-screen p-6">
      <button className="back-button" onClick={handleGoBack}>
        ← Volver
      </button>
      
      <div className="nfc-container">
        <div className="nfc-buttons">
          <button
            onClick={handleNFCScan}
            className="nfc-button scan-button"
          >
            Escanear NFC
          </button>
        </div>

        <p className="nfc-instruction">
          Presiona el botón y acerca tu dispositivo al sticker NFC
        </p>
      </div>
    </div>
  );
}
