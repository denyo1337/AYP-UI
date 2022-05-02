import axios from "axios";
import { useAuthContext } from "./useAuthContext";

const baseURL = "https://localhost:7223/ayb/api/";

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")?.toString() ?? null}` }
    })

    const validateSteamId = (steamid) => {
        return axiosInstance.get(`Account/validate/${steamid}`)
    }
    const handleEmailVerification = async (email) => {
        const response = await axiosInstance.get(`Users/validate/email/${email}`)
        return response.data;
    }
    const handleLogin = async (email, password) =>{
        const response = await axiosInstance.post('Users/sign-in', {
            email,
            password
        });
        return response.data;
    }
    const handleRegister = async (user) => {
        const response = await axiosInstance.post("Users/register", {
            email: user.email,
            nickName: user.nick,
            natonality: user.nationality,
            password: user.password,
            confirmPassword: user.confirmPassword,
            gender: user.gender
        })
        return response;
    }
    const handleNickNameVerification = async (nickName) =>{
        const response = await axiosInstance.get(`Users/validate/nickName/${nickName}`)
        return response.data;
    }

    const handleUserDetailsUpdate = async (user) => {
        const response = await axiosInstance.put("Account",{
            email : user.email,
            nickName : user.nickName,
            phoneNumber : user.phoneNumber,
            nationality : user.nationality,
            password : user.password
        });
        return response.data;
    }

    return {
        axiosInstance,
        validateSteamId,
        handleEmailVerification,
        handleRegister,
        handleNickNameVerification,
        handleUserDetailsUpdate,
        handleLogin
    };
}

export default useAxios;