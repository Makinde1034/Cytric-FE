"use client";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import {  darkTheme } from '@rainbow-me/rainbowkit';

const config = getDefaultConfig({
  appName: "Cytric",
  projectId: "c82e72996b427d925aea1d50eac50f46",
  chains: [sepolia],
  ssr: true,
});

const queryClient = new QueryClient();


export const RainbowProvider = (props: PropsWithChildren) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme()} >{props.children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
