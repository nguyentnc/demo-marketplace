"use client";
import {
  createThirdWeb,
  THIRDWEB_PROJECT_ID,
  walletsThirdWeb,
} from "@/services/thirdweb";
import { sepolia } from "thirdweb/chains";
import { ConnectButton as ConnectButtonThird } from "thirdweb/react";
type Props = {};

export function ConnectButton({}: Props) {
  return (
    <ConnectButtonThird
      client={createThirdWeb}
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
      walletConnect={{
        projectId: THIRDWEB_PROJECT_ID,
      }}
      autoConnect
    />
  );
}

export default ConnectButton;
