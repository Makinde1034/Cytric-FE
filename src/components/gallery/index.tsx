"use client";

import { NFTData, getGallery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../buttons";

export const Gallery = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
    enabled:
      typeof window !== "undefined"
        ? !!localStorage.getItem("access_token")
        : false,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full ">
      <h3 className="font-bold text-[1.3rem] mb-[30px]">Your NFT Gallery</h3>
      {data?.length ? (
        <div className="grid  lg:grid-cols-3 gap-6">
          {data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ?.map((_: any, i: number, a: NFTData[]) => a[a.length - 1 - i])
            .map((item: NFTData, index: number) => {
              return <Card {...item} key={index} isFirst={index === 0} />;
            })}
        </div>
      ) : (
        <div>
          <p>
            No NFTs found, please mint your first one using the widget above
          </p>
        </div>
      )}
    </div>
  );
};

const Card = ({
  description,
  name,
  logoUrl,
  isFirst,
}: NFTData & { isFirst?: boolean }) => {
  return (
    <div
      className={`h-[300px] bg-gradient-to-r rounded-[15px] from-[#0B101A] to-[#151C2B] border-[1px] ${
        isFirst ? "border-[#10B981]" : "border-[#374151]"
      } `}
    >
      <img
        className="h-[200px] w-full rounded-tr-[15px] rounded-tl-[15px]"
        src={logoUrl}
        alt={`${name}-image`}
      />
      <div className="px-[20px]">
        <p className="font-bold mt-[10px] mb-[5px]">{name}</p>
        <p className="text-[#9CA3AF] text-sm">{description}</p>
      </div>
    </div>
  );
};

export const NewBadge = () => {
  return (
    <div className="h-[80px] w-[40px] bg-[#10B981]">
      <p>New</p>
    </div>
  );
};
