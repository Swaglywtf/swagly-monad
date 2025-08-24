'use client'

interface ConnectButtonProps {
  onConnect?: () => void;
}

export const ConnectButton = ({ onConnect }: ConnectButtonProps) => {
  const handleConnect = () => {
    // Simular conexión de wallet
    console.log("Conectando wallet con Privy...");
    
    // Simular delay de conexión
    setTimeout(() => {
      if (onConnect) {
        onConnect();
      }
    }, 1000);
  };

  return (
    <button 
      onClick={handleConnect}
      className="cta-button"
    >
      Conectar Wallet
    </button>
  )
}
