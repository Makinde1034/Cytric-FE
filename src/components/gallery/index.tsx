import { NFTData, getGallery } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../buttons";

export const Gallery = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["gallery"],
    queryFn: getGallery,
    enabled: !!localStorage.getItem("access_token"),
  });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="w-full ">
      <h3 className="font-bold text-[1.3rem] mb-[30px]">Your NFT Gallery</h3>
      {data.length ? (
        <div className="grid  grid-cols-3 gap-6">
          {data.reverse().map((item: NFTData, index: number) => (
            <Card {...item} key={index} />
          ))}
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

const Card = ({ description, name, logoUrl }: NFTData) => {
  return (
    <div className="h-[300px] bg-gradient-to-r rounded-[15px] from-[#0B101A] to-[#151C2B] border-[0.5px] border-[#374151] ">
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

// border-[#10B981]
