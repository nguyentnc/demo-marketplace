"use client";
import { clientThirdWeb, walletsThirdWeb } from "@/services/thirdweb";
import { sepolia } from "thirdweb/chains";
import { ConnectButton as ConnectButtonThird } from "thirdweb/react";
type Props = {};

export function ConnectButton({}: Props) {
  return (
    <ConnectButtonThird
      client={clientThirdWeb}
      appMetadata={{
        name: "Calm Down Marketplace",
        url: "https://dagora.xyz/",
        description: "Calm Down Marketplace",
        logoUrl: "https://dagora.xyz/images/logos/logo-simple.svg",
      }}
      chain={sepolia}
      wallets={walletsThirdWeb}
      connectButton={{
        label: "Connect wallet",
        style: {
          minWidth: 150,
        },
      }}
      autoConnect
    />
  );
}

export default ConnectButton;
