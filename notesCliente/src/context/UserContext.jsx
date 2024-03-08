import React, {useState} from "react"

export const UsersContext = React.createContext([])

export function UsersContextProvider({children}) {

    const [user, setUser] = useState()

    return (
        <UsersContext.Provider value={{
            setUser,
            user,
        }}>
            {children}
        </UsersContext.Provider>
    )
}



