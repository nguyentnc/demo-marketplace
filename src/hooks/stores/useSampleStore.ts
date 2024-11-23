import { useAppSelector } from "@/stores";

function useUserStore() {
  const sampleStore = useAppSelector((state) => state.common);

  return {
    sampleStore,
  };
}

export default useUserStore;
