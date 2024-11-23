"use client";
import Container from "@/components/Layouts/Container";
import { contractCollection, THIRDWEB_COLLECTION } from "@/services/thirdweb";
import { mintTo } from "thirdweb/extensions/erc721";

import { Form } from "@/components/Base/Form";
import LoadingButton from "@/components/Base/LoadingButton";
import { FormInput } from "@/components/Common/Form/FormItem";
import { useToast } from "@/hooks/internals";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import useCollectionInfo from "./useCollectionInfo";

type Props = {};

type TFormData = {
  name: string;
  description: string;
  image: string;
};
export function Collection({}: Props) {
  const toast = useToast();
  const { data, isLoading } = useCollectionInfo({
    address: THIRDWEB_COLLECTION,
  });

  const methods = useForm<TFormData>({
    defaultValues: {
      name: "",
      description: "",
      image:
        "https://inventory.coin98.com/images/nftvisual-sg1ci5zX8FFQvy5m.png",
    },
  });
  const {
    formState: { isSubmitting, isValid },
    reset,
  } = methods;
  const { mutateAsync: sendTransaction, status } =
    useSendAndConfirmTransaction();
  const activeAccount = useActiveAccount();

  const onSubmit = async (data: TFormData) => {
    try {
      if (!activeAccount) {
        return;
      }

      const transaction = mintTo({
        contract: contractCollection,
        to: activeAccount?.address,
        nft: data,
      });

      const receipt = await sendTransaction(transaction);

      if (!receipt) {
        throw new Error("Transaction failed");
      }

      console.log("🚀 ~ onSubmit ~ receipt:", receipt);
      toast.success("NFT minted successfully");
      reset();
    } catch (error) {
      toast.error(get(error, "message", "An error occurred"));
    }
  };

  return (
    <Container className="py-10">
      <div>
        <Form
          methods={methods}
          onSubmit={onSubmit}
          className="max-w-screen-sm mx-auto"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {data.image && (
                <div className="w-8 h-8 object-cover object-center rounded-sm">
                  <img src={data.image} alt={data.name} />
                </div>
              )}
              <h1 className="text-2xl font-bold">Mint NFT from {data.name} </h1>
            </div>
            <div className="font-bold text-xl">
              Description: {data.description}
            </div>
            <FormInput
              name="name"
              label="Name"
              rules={{
                required: "Name is required",
              }}
            />
            <FormInput
              name="description"
              label="Description"
              rules={{
                required: "Description is required",
              }}
            />
            <FormInput
              name="image"
              label="Image URL"
              rules={{
                required: "Image URL is required",
                validate: {
                  validateUrl: (value: string) =>
                    /^(https?|chrome):\/\/[^\s$.?#].[^\s]*\.(jpg|jpeg|png|gif|bmp|webp)$/.test(
                      value
                    ) || "Invalid image URL format",
                },
              }}
            />
          </div>
          <LoadingButton
            loading={isSubmitting}
            fullWidth
            disabled={isSubmitting}
            type="submit"
            className="mt-8"
            size="lg"
          >
            Mint Nft
          </LoadingButton>
        </Form>
      </div>
    </Container>
  );
}

export default Collection;
