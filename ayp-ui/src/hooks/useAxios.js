import axios from "axios";
import jwtDecode from "jwt-decode"; 
import dayjs from "dayjs";
import { useAuthContext } from "./useAuthContext";

const baseURL = "https://localhost:7223/ayb/api/Users/";

const useAxios = () => {
    const { jwtToken, dispatch } = useAuthContext();
    
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${jwtToken}` }
    })

    return axiosInstance;
}

export default useAxios;