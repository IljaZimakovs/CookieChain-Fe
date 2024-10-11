import create from "zustand";

const useLoadingStore = create((set) => ({
  loading: true,
  setLoading: (loading: boolean) =>
    set({
      loading: loading,
    }),
}));

export default useLoadingStore;
