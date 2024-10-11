import create from "zustand";

const useVerifyStore = create((set) => ({
  verify: false,
  setVerify: (verify: boolean) =>
    set({
      verify: verify,
    }),
}));

export default useVerifyStore;
