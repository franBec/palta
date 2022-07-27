import create from "zustand"
import { persist } from "zustand/middleware"

export const useCurrentUser = create(persist((set) => ({
    get_CurrentUser: null,
    set_CurrentUser: (user) => set((state) => ({get_CurrentUser:user})),
    get_permisosCurrentUser: null,
    set_permisosCurrentUser: (permisos) => set((state) => ({get_permisosCurrentUser:permisos}))
})))