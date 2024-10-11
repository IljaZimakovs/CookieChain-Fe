import create from "zustand";

const useUserStore = create((set) => ({
  userId: null,
  userName: null,
  firstName: null,
  lastName: null,
  setUserData: (
    id: number,
    name: string,
    firstName: string,
    lastName: string | undefined
  ) =>
    set({
      userId: id,
      userName: name,
      firstName: firstName,
      lastName: lastName,
    }),
}));

export default useUserStore;
