import { JSX } from "react";

export const Button = ({
  text,
  hasGradient,
  icon,
  height,
  width,
  radius,
  onClick,
  loading,
}: {
  text: string;
  hasGradient?: boolean;
  icon?: JSX.Element;
  height?: string;
  width?: string;
  radius?: string;
  onClick?: () => void;
  loading?: boolean;
}) => {
  const gradient = hasGradient
    ? "bg-gradient-to-r  from-[#E64A9F] to-[#915AF0]"
    : "bg-gradient-to-r  from-[#141B26] to-[#151C2B] border-1 border border-[#374151]";

  const h = height ? `h-[${height}]` : "h-[46px]";

  const w = width ? `${width}` : "w-[160px]";

  const r = radius || "rounded-[7px]";

  return (
    <button
      onClick={onClick}
      className={`${h} ${w} ${gradient} ${r} flex items-center justify-center hover:brightness-[130%]`}
    >
      {loading ? (
        <Loader />
      ) : (
        <>
          {icon}
          <p className=" text-sm font-bold ml-[6px]">{text}</p>
        </>
      )}
    </button>
  );
};

export const Loader = () => {
  return (
    <div
      className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    ></div>
  );
};
