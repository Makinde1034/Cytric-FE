"use client";

import { Button } from "@/components/buttons";
import { MintForm } from "@/components/forms";
import { CoinsIcon, VideoIcon } from "@/components/icons";

import { useWalletClient } from "wagmi";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createJwt } from "@/api";
import { Gallery } from "@/components/gallery";

export default function Home() {
  const { data: walletClient } = useWalletClient();

  const mutation = useMutation({
    mutationFn: (walletAddress: string) => {
      return createJwt(walletAddress);
    },
  });

  useEffect(() => {
    if (walletClient) {
      // create JWT when wallet connets for secure connetction to BE
      mutation.mutate(walletClient.account.address);
    }
  }, [walletClient]);

  return (
    <div className=" items-center justify-items-center min-h-screen  py-10 lg:px-[100px]   font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[2.7rem] mb-[30px] leading-none  font-bold text-center">
        Discover & Collect <br /> Extraordinary NFTs
      </h1>
      <p className="text-[#D1D5DB] text-center">
        Enter the world of digital art and collectibles. Explore unique NFTs
        created by artists worldwide.
      </p>
      <div className="mt-[30px] flex  ">
        <div className="mr-[5px]">
          <Button text="Start creating" icon={<CoinsIcon />} hasGradient />
        </div>
        <div className="ml-[5px]">
          <Button text="Watch Demo" icon={<VideoIcon />} />
        </div>
      </div>
      <div className="w-full justify-items-center mt-[80px]">
        <MintForm />
      </div>
      <div className="w-full mt-[50px]">
        <Gallery />
      </div>
    </div>
  );
}
