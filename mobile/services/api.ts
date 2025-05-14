import { Platform } from "react-native";
import axios, { AxiosInstance, AxiosResponse, AxiosError} from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const url = Platform.OS === "android" ? "http://10.0.2.2:3000" : "http://127.0.0.1:3000"
const url = "https://683c-2405-9800-b870-3e32-8b7-720f-e240-d630.ngrok-free.app"


const Api: AxiosInstance = axios.create({baseURL: url + "/api"});

//Before send request
//if have token in storage 
Api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("token")//Get logged in token

    if(token) config.headers.set("Authorization", `Bearer ${token}`)//Attach token in header

    return config
})

Api.interceptors.response.use(
    async (res: AxiosResponse) => res.data, 
    async (err: AxiosError) => Promise.reject(err)
)

export { Api }