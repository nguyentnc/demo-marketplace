"use client";
import { Button } from "@/components/Base";
import Container from "@/components/Layouts/Container";
import { contractCollection } from "@/services/thirdweb";
import { mintTo } from "thirdweb/extensions/erc721";
import { useActiveAccount, useSendTransaction } from "thirdweb/react";

type Props = {};

export function Collection({}: Props) {
  // contractCollection
  const { mutateAsync: sendTransaction, status } = useSendTransaction();
  const activeAccount = useActiveAccount();

  const onClick = async () => {
    if (!activeAccount) {
      return;
    }

    const transaction = mintTo({
      contract: contractCollection,
      to: activeAccount?.address,
      nft: {
        image:
          "https://inventory.coin98.com/images/nftvisual-sg1ci5zX8FFQvy5m.png",
        name: "NFT Name",
        description: "NFT Description",
      },
    });

    const result = await sendTransaction(transaction);
    console.log("🚀 ~ onClick ~ result:", result);
  };

  return (
    <Container>
      <Button onClick={onClick}>Mint {status}</Button>
    </Container>
  );
}

export default Collection;
