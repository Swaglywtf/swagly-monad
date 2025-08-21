// src/config/chains.ts
import { defineChain } from 'viem'

const ZERODEV_PROJECT_ID = process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID!;
const BUNDLER_URL = `https://rpc.zerodv.app/api/v2/bundler/${ZERODEV_PROJECT_ID}`;
const PUBLIC_RPC_URL = 'https://testnet-rpc.monad.xyz/'; // La RPC pública de Monad

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'Monad', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    // CORRECCIÓN: Se añade la propiedad 'public'
    default: { http: [BUNDLER_URL] }, 
    public: { http: [PUBLIC_RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com/' },
  },
  testnet: true,
})