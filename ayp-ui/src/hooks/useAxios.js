import axios from "axios";

const baseURL = "https://localhost:7223/ayb/api/";

const useAxios = () => {
    const axiosInstance = axios.create({
        baseURL,
        headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")?.toString() ?? null}` }
    })

    const validateSteamId = (steamid) => {
        return axiosInstance.get(`Users/validate/steamId/${steamid}`)
    }
    const handleEmailVerification = async (email) => {
        const response = await axiosInstance.get(`Users/validate/email/${email}`)
        return response.data;
    }
    const handleLogin = async (email, password) => {
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
    const handleNickNameVerification = async (nickName) => {
        const response = await axiosInstance.get(`Users/validate/nickName/${nickName}`)
        return response.data;
    }

    const handleUserDetailsUpdate = async (user) => {
        const response = await axiosInstance.put("Account", {
            email: user.email,
            nickName: user.nickName,
            phoneNumber: user.phoneNumber,
            nationality: user.nationality,
            password: user.password
        });
        return response.data;
    }
    const handleGetFriendsQuery = async (steamid, queryParams) => {
        const response = await axiosInstance.get(`Users/friendsLists/${steamid}`, {
            params: {
                pageSize: queryParams.pageSize,
                pageNumber: queryParams.pageNumber,
                sortBy: queryParams.sortBy,
                sortDirection: queryParams.sortDirection,
                searchPhrase: queryParams.searchPhrase
            }
        })
        return response.data;
    }
    const handleSearchPlayer = async (phrase) => {

        const response = await axiosInstance.get(`Users/searchPlayer?phrase=${phrase}`)
        const t = response.status;
        if(response.status !== 200 ){
            throw new Error("Not Found")
        }
        return response.data;
    }
    const handlePlayerStats = async (param) => {
        const response = await axiosInstance.get(`Stats/userStats/${param}`);
        return response.data;
    }

    return {
        axiosInstance,
        validateSteamId,
        handleEmailVerification,
        handleRegister,
        handleNickNameVerification,
        handleUserDetailsUpdate,
        handleLogin,
        handleGetFriendsQuery,
        handleSearchPlayer,
        handlePlayerStats
    };
}

export default useAxios;