import create from "zustand"

export const useLoadingBlockingAnimation = create((set) => ({

    //booleano que determina si debo bloquear la pagina porque algo importante está cargando
    get_isLoading: false,
    set_isLoading: (boo) => set((state) => ({get_isLoading:boo})),
}))