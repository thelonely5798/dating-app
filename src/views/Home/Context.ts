import { createContext } from "react";



type IContext = {
    indexScreen: number,
    setIndexScreen: (index: number) => void,
}

export const HomeContext = createContext<IContext>({
    indexScreen: 0,
    setIndexScreen: () =>  {}
})

export const HomeProvider = HomeContext.Provider


