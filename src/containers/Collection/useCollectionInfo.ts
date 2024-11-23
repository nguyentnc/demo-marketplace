import {
  getContractCollection,
  getImageFromIPFS,
  getStorageData,
} from "@/services/thirdweb";
import { useEffect, useState } from "react";
import { useReadContract } from "thirdweb/react";

type Props = {
  address: string;
};

function useCollectionInfo({ address }: Props) {
  const [collectionData, setCollectionData] = useState({
    description: "",
    image: "",
    name: "",
    symbol: "",
  });
  const { data: collectionUri, isPending: isPendingUri } = useReadContract({
    contract: getContractCollection(address),
    method: "function contractURI() view returns (string)",
    params: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  async function getCollectionData() {
    try {
      if (collectionUri) {
        const result = await getStorageData(collectionUri);
        console.log(result);
        setCollectionData({
          ...result,
          image: getImageFromIPFS(result.image),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCollectionData();
  }, [collectionUri]);
  return {
    isLoading: isLoading || isPendingUri,
    data: collectionData,
  };
}

export default useCollectionInfo;
