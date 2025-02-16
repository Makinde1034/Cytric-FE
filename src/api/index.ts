import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "http://172.20.10.9:4191/api/v1";

export type NFTData = {
  name: string;
  description: string;
  nftId: string;
  logoUrl: string;
  wallet: string;
};

export const createJwt = async (walletAddress: string) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/auth
    `,
      method: "post",
      data: {
        wallet: walletAddress,
      },
    });

    if (response.data.success) {
      localStorage.setItem("access_token", response.data.data.accessToken);
    }

    return response.data;
  } catch {}
};

export const createNft = async (data: NFTData) => {
  try {
    const response = await axios({
      url: `${BASE_URL}/nft/create`,
      method: "post",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data;
  } catch (err) {
    toast("Failed to create NFT!");
  }
};

export const getGallery = async () => {
  try {
    const response = await axios({
      url: `${BASE_URL}/nft/gallery`,
      method: "get",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });

    return response.data.data;
  } catch {}
};
