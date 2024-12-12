import {createContext} from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({children}) => {

    return <GlobalContext.Provider value={children}>{children}</GlobalContext.Provider>;

}