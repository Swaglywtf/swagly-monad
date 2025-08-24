"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleBuilderPackClick = () => {
    console.log('Botón clickeado, navegando a /nfc');
    router.push('/nfc');
  };

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
        
        <h1 className="title">Phygital Identity Forge</h1>
        
        <p className="description">
          Estás a punto de forjar tu identidad
          <br />
          onchain en la red de Monad
        </p>
        
        <div className="powered-by">
          Impulsado por<Image 
            src="/Merch3-Logo white-transparentBG.svg" 
            alt="MERCH3" 
            width={160} 
            height={40} 
            className="merch3-logo"
          />
        </div>
        
        <button className="cta-button" onClick={handleBuilderPackClick}>
          Reclama tu Builder Pack
        </button>
      </div>
    </div>
  );
}
