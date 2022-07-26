import create from "zustand"

export const useCurrentUser = create((set) => ({
    get_CurrentUser: null,
    set_CurrentUser: (user) => set((state) => ({get_CurrentUser:user})),
    get_rolsCurrentUser: null,
    set_rolsCurrentUser: (roles) => set((state) => ({get_rolsCurrentUser:roles}))
}))