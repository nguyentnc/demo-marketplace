import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain, sepolia } from "thirdweb/chains";
import { createWallet, inAppWallet } from "thirdweb/wallets";

// create the client with your clientId, or secretKey if in a server environment

export const THIRDWEB_PROJECT_ID = "bbf2c8ad938527588325b0e69ef01147";
export const THIRDWEB_MARKET_PLACE =
  "0x1162365BCde8A0F91C36D07A1264992A5C2Db983";
export const THIRDWEB_COLLECTION = "0x576D9EaC14780aE017b61c33e69D2BABFCBda6bE";

export const createThirdWeb = createThirdwebClient({
  clientId: THIRDWEB_PROJECT_ID,
});

export const walletsThirdWeb = [
  inAppWallet(),
  createWallet("com.coin98"),
  createWallet("io.metamask"),
];
// connect to your contract
export const contractMarketplace = getContract({
  client: createThirdWeb,
  chain: defineChain(sepolia.id),
  address: THIRDWEB_MARKET_PLACE,
});
export const contractCollection = getContract({
  client: createThirdWeb,
  chain: defineChain(sepolia.id),
  address: THIRDWEB_COLLECTION,
});
