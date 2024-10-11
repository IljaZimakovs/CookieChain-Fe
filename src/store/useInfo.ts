import create from "zustand";

const useInfoStore = create((set) => ({
  user_id: null,
  user_name: null,
  first_name: null,
  wallet_address: "",
  twitter_follow: false,
  tg_follow: false,
  rt_follow: false,
  tpost_follow: false,
  verified: false,
  sequence_no: null,
  point: null,
  setInfoData: (
    id: number,
    name: string,
    first_name: string,
    wallet_address: string,
    twitter_follow: boolean,
    tg_follow: boolean,
    rt_follow: boolean,
    tpost_follow: boolean,
    verified: boolean,
    sequence_no: number,
    point: number
  ) =>
    set({
      user_id: id,
      user_name: name,
      first_name: first_name,
      wallet_address: wallet_address,
      twitter_follow: twitter_follow,
      rt_follow: rt_follow,
      tpost_follow: tpost_follow,
      tg_follow: tg_follow,
      verified: verified,
      sequence_no: sequence_no,
      point: point,
    }),
}));

export default useInfoStore;
