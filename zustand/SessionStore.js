import create from "zustand"

export const useUsername = create((set) => ({
    get_username: null,
    set_username: (username) => set((state) => ({get_username:username}))
}))