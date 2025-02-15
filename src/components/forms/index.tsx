import { Button } from "../buttons";
import { MintIcon } from "../icons";

export const MintForm = () => {
  return (
    <div className="w-[30%] h-[300px] p-[20px] rounded-[16px]  bg-gradient-to-r  from-[#0B101A] to-[#151C2B] border-[0.5px] border border-[#374151]">
      <h3 className="font-bold mb-[25px]">Mint Your NFT</h3>
      <form>
        <p className="text-xs text-[#9CA3AF] mb-[6px]">NFT Name</p>
        <input
          type="text"
          placeholder="Enter NFT name"
          className="border-[0.5px] pl-[10px] mb-[20px] border h-[40px] text-xs rounded-[8px] border-[#374151] w-full bg-[#1f2937]"
        />
        <p className="text-xs text-[#9CA3AF] mb-[6px]">Image URL</p>
        <input
          type="text"
          placeholder="Enter image URL"
          className="border-[0.5px] pl-[10px] border h-[40px] mb-[20px] text-xs rounded-[8px] border-[#374151] w-full bg-[#1f2937]"
        />
        <Button
          hasGradient
          text="Mint NFT"
          height="40px"
          width="w-full"
          icon={<MintIcon />}
        />
      </form>
    </div>
  );
};
