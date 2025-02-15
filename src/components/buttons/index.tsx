import { JSX } from "react";

export const Button = ({
  text,
  hasGradient,
  icon,
  height,
  width,
}: {
  text: string;
  hasGradient?: boolean;
  icon?: JSX.Element;
  height?: string;
  width?: string;
}) => {
  const gradient = hasGradient
    ? "bg-gradient-to-r  from-[#E64A9F] to-[#915AF0]"
    : "bg-gradient-to-r  from-[#141B26] to-[#151C2B] border-1 border border-[#374151]";

  const h = height ? `h-[${height}]` : "h-[46px]";

  const w = width ? `${width}` : "w-[160px]";

  return (
    <button
      className={`${h} ${w} ${gradient} rounded-[7px] flex items-center justify-center`}
    >
      {icon}
      <p className=" text-sm font-bold ml-[6px]">{text}</p>
    </button>
  );
};
