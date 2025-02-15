import { Button } from "@/components/buttons";
import { MintForm } from "@/components/forms";
import { CoinsIcon } from "@/components/icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-[2.2rem] mb-[30px] leading-none  font-bold text-center">
        Discover & collect <br /> Extraordinary NFTs
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
          <Button text="Watch demo" icon={<CoinsIcon />} />
        </div>
      </div>
      <div className="w-full justify-items-center mt-[100px]">
        <MintForm />
      </div>
    </div>
  );
}
