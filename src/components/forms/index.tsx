"use client";
import {
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { readContract } from "@wagmi/core";
import { Button } from "../buttons";
import {
  LogoIcon,
  MintIcon,
  ShareIcon,
  SuccessIcon,
  WalletIcon,
} from "../icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import nftABI from "../../abi/nft.json";
import { config } from "../../../config";
import { getRandomFiveDigitNumber } from "@/helpers";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { BASE_URL, NFTData, createNft } from "@/api";
import { useWalletClient } from "wagmi";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const CONTRACT_ADDRESS = "0x743f49311a82fe72eb474c44e78da2a6e0ae951c";

export const MintForm = () => {
  const [details, setDetails] = useState({
    name: "",
    description: "",
    imageUrl: "",
  });

  const [mintSuccess, setMintSuccess] = useState(false);
  const [id, setId] = useState(0);

  const mutation = useMutation({
    mutationFn: (data: NFTData) => {
      return createNft(data);
    },
  });

  const { data: walletClient, isError, isLoading } = useWalletClient();
  const queryClient = useQueryClient();

  const updateDetails = (value: string, key: keyof typeof details) => {
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const {
    data: hash,
    writeContract,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  // checks if mint is successful to display success modal
  useEffect(() => {
    if (isSuccess) {
      setMintSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    }
  }, [isSuccess]);

  const mint = async () => {
    if (!details.description || !details.imageUrl || !details.name) {
      return;
    }

    try {
      // check if ID already exists in contract
      const generateUniqueId = async () => {
        while (true) {
          const id = getRandomFiveDigitNumber();

          const result = await readContract(config, {
            abi: nftABI,
            address: CONTRACT_ADDRESS,
            functionName: "checkId",
            args: [BigInt(id)],
          });

          if (!result) {
            return id;
          }
        }
      };

      const uniqueId = await generateUniqueId();

      // store NFT details in DB
      mutation.mutate({
        name: details.name,
        description: details.description,
        logoUrl: details.imageUrl,
        nftId: String(uniqueId),
        wallet: walletClient?.account?.address as string,
      });

      // call mint function on NFT contract
      writeContract({
        address: CONTRACT_ADDRESS,
        abi: nftABI,
        functionName: "mint",
        args: [BigInt(uniqueId), `${BASE_URL}/nft/gallery/:id`],
      });
      setId(uniqueId);

      // console.log(hash);
    } catch (err) {
      toast("Failed to create NFT!");
    }
  };

  if (mintSuccess) {
    return (
      <div className="lg:w-[27%] w-full flex justify-center items-center flex-col  p-[20px] rounded-[16px] bg-gradient-to-r  from-[#0B101A] to-[#151C2B] border-[0.5px] border border-[#10B981]">
        <SuccessIcon />
        <h3 className="text-[#10B981] font-bold text-[1.2rem] mb-[5px]">
          NFT Minted Successfully!
        </h3>
        <p className="text-xs text-[#9CA3AF] mb-[10px]">
          Your NFT has been created and added to your collection
        </p>
        <div className="w-full bg-[#1F2937] rounded-[10px] p-[15px]">
          <div className="h-[200px] w-full  rounded-[5px]">
            <img
              style={{ objectFit: "fill" }}
              className="h-full w-full  rounded-[5px]"
              src={details.imageUrl}
              alt="nft image"
            />
          </div>
          <div className="w-full mt-[10px]">
            <p className="text-xs text-[#9CA3AF] mb-[2px]">NFT Name</p>
            <p className="text-[0.8rem] font-bold mb-[6px]">{details.name}</p>
          </div>
          <div className="w-full mt-[10px]">
            <p className="text-xs text-[#9CA3AF] mb-[2px]">Description</p>
            <p className="text-xs text-[#D1D5DB] mb-[6px]">
              {details.description}
            </p>
          </div>
          <div className="w-full mt-[10px]">
            <p className="text-xs text-[#9CA3AF] mb-[2px]">NFT ID</p>
            <p className="text-xs text-[#8B5CF6] mb-[6px]">{id}</p>
          </div>
        </div>
        <div className="flex mt-[15px]">
          <div className="mr-[10px]">
            <Button text="Share" height="40px" width="w-[170px]" icon={<ShareIcon />} />
          </div>
          <div className="ml-[10px]">
            <Button
             width="w-[170px]"
              onClick={() => setMintSuccess(false)}
              text="Mint Another"
              hasGradient
              height="40px"
              icon={<MintIcon />}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-[27%] w-full  p-[20px]  rounded-[16px]  bg-gradient-to-r  from-[#0B101A] to-[#151C2B] border-[0.5px] border border-[#374151]">
      <h3 className="font-bold mb-[25px]">Mint Your NFT</h3>
      <div>
        <p className="text-xs text-[#9CA3AF] mb-[6px]">NFT Name</p>
        <input
          type="text"
          onChange={(evt) => updateDetails(evt.target.value, "name")}
          placeholder="Enter NFT name"
          className="border-[0.5px] pl-[10px] mb-[20px] border h-[40px] text-xs rounded-[8px] border-[#374151] w-full bg-[#1f2937]"
        />
        <p className="text-xs text-[#9CA3AF] mb-[6px]">Description</p>
        <textarea
          onChange={(evt) => updateDetails(evt.target.value, "description")}
          placeholder="Describe your NFT"
          className="border-[0.5px] p-[10px] mb-[10px] border h-[80px] text-xs rounded-[8px] border-[#374151] w-full bg-[#1f2937]"
        />
        <p className="text-xs text-[#9CA3AF] mb-[6px]">Image URL</p>
        <input
          onChange={(evt) => updateDetails(evt.target.value, "imageUrl")}
          type="text"
          placeholder="Enter image URL"
          className="border-[0.5px] pl-[10px] border h-[40px] mb-[15px] text-xs rounded-[8px] border-[#374151] w-full bg-[#1f2937]"
        />
        <Button
          hasGradient
          text={isPending ? "Minting" : "Mint NFT"}
          height="40px"
          width="w-full"
          icon={<MintIcon />}
          onClick={mint}
          loading={isPending}
        />
      </div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="h-[60px] px-[20px] lg:px-[50px] w-full] bg-[#020305] flex items-center justify-between">
      <LogoIcon />

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }: any) => {
          return (
            <div>
              <Button
                onClick={
                  account?.displayName ? openAccountModal : openConnectModal
                }
                icon={<WalletIcon />}
                text={account?.displayName || "Connect Wallet"}
                hasGradient
                height="40px"
                radius="rounded-[20px]"
              />
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
};
