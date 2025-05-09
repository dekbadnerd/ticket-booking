import { User } from "@/types/user"
import AsyncStorage from "@react-native-async-storage/async-storage" //Store token/user
import { createContext, PropsWithChildren, useContext, useEffect } from "react"
import { useState } from "react"
import { router } from "expo-router"
import { userService } from "@/services/user"

//Data format for other components
interface AuthContextProps {
    isLoggedIn: boolean
    isLoadingAuth: boolean
    authenticate: (authMode: "login" | "register", email:string, password:string) => Promise<void>
    logout: VoidFunction
    user: User | null
}

const AuthContext = createContext({} as AuthContextProps)

//Create a custom useAuth hook
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthenticationProvider({ children }: PropsWithChildren) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isLoadingAuth, setIsLoadingAuth] = useState(false)
    const [user, setUser] = useState<User | null>(null)

    //When app loading -> Check if token/user on device
    useEffect(() => {
        async function checkIfLoggedIn() {
            const token = await AsyncStorage.getItem("token")
            const user = await AsyncStorage.getItem("user")

            if(token && user) {
                setIsLoggedIn(true)
                setUser(JSON.parse(user)) //Conevert string -> obj
                router.replace("/(authed)/(tabs)/(events)");
            } else {
                setIsLoggedIn(false)
            }
        }

        checkIfLoggedIn()
    }, [])

    //login & register
    async function authenticate(authMode: "login" | "register", email:string, password:string): Promise<void> {
        try {
            setIsLoadingAuth(true) 

            const response = await userService[authMode]({email, password}) //Call login/register API

            if (response) {
                const {data} =response
                const {user, token} = data

                //Save token/user to device
                await AsyncStorage.setItem("token", token)
                await AsyncStorage.setItem("user", JSON.stringify(user))

                setUser(user)
                router.replace("/(authed)/(tabs)/(events)")
                setIsLoggedIn(true)
            }
        } catch (error) {
            setIsLoadingAuth(false)
        } finally {
            setIsLoadingAuth(false)
        }
    }

    async function logout() {
        setIsLoggedIn(false)
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
    }

    //Send all values ​​to child components 
    return (
        <AuthContext.Provider
            value={{
                isLoadingAuth,
                isLoggedIn,
                authenticate,
                user,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}