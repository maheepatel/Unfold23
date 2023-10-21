import { WagmiConfig, createConfig, configureChains } from "wagmi";
import {
  polygonMumbai,
  localhost,
  hardhat,
  sepolia,
  avalancheFuji,
} from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { publicClient, webSocketPublicClient, chains } = configureChains(
  [
    sepolia,
    // polygonMumbai,
    localhost,
    // hardhat
    avalancheFuji,
  ],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors: [new InjectedConnector({ chains })],
});

export default function ({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
}
