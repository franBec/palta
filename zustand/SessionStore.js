import create from "zustand"
import { persist } from "zustand/middleware"

export const useCurrentUser = create(persist((set) => ({

    //usuario actual
    get_CurrentUser: null,
    set_CurrentUser: (user) => set((state) => ({get_CurrentUser:user})),

    //permisos del usuario actual
    get_permisosCurrentUser: null,
    set_permisosCurrentUser: (permisos) => set((state) => ({get_permisosCurrentUser:permisos}))
})))