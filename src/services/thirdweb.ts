import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain, sepolia } from "thirdweb/chains";
import { download } from "thirdweb/storage";
import { createWallet, inAppWallet } from "thirdweb/wallets";

// create the client with your clientId, or secretKey if in a server environment

export const THIRDWEB_PROJECT_ID = process.env
  .NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string;
export const THIRDWEB_MARKET_PLACE =
  "0x1162365BCde8A0F91C36D07A1264992A5C2Db983";
export const THIRDWEB_COLLECTION = "0x576D9EaC14780aE017b61c33e69D2BABFCBda6bE";

export const clientThirdWeb = createThirdwebClient({
  clientId: THIRDWEB_PROJECT_ID,
});

export const walletsThirdWeb = [
  inAppWallet(),
  createWallet("com.coin98"),
  createWallet("io.metamask"),
];
// connect to your contract
export const contractMarketplace = getContract({
  client: clientThirdWeb,
  chain: defineChain(sepolia.id),
  address: THIRDWEB_MARKET_PLACE,
});

export const getContractCollection = (address: string) => {
  return getContract({
    client: clientThirdWeb,
    chain: defineChain(sepolia.id),
    address,
  });
};

export const contractCollection = getContractCollection(THIRDWEB_COLLECTION);

export const getStorageData = async (uri: string) => {
  const data = await download({
    client: clientThirdWeb,
    uri,
  });
  return data.json().then((data) => data);
};

export const getImageFromIPFS = (uri: string) => {
  return uri?.replace("ipfs://", "https://ipfs.io/ipfs/");
};
