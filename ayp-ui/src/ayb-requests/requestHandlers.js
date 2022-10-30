import axios from "axios";

const baseURL = "http://localhost:5223/ayb/api/";

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem("jwtToken")?.toString() ?? null}` }
});

export const validateSteamId = (steamid) => {
    return axiosInstance.get(`Users/validate/steamId/${steamid}`)
}
export const handleEmailVerification = async (email) => {
    const response = await axiosInstance.get(`Users/validate/email/${email}`)
    return response.data;
}
export const handleLogin = async (email, password) => {
    debugger;
    const response = await axiosInstance.post('Users/sign-in', {
        email,
        password
    });
    debugger;
    return response.data;
}
export const handleRegister = async (user) => {
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
export const handleNickNameVerification = async (nickName) => {
    const response = await axiosInstance.get(`Users/validate/nickName/${nickName}`)
    return response.data;
}

export const handleUserDetailsUpdate = async (user) => {
    const response = await axiosInstance.put("Account", {
        email: user.email,
        nickName: user.nickName,
        phoneNumber: user.phoneNumber,
        nationality: user.nationality,
        password: user.password
    });
    return response.data;
}
export const handleGetFriendsQuery = async (steamid, queryParams) => {
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
export const handleSearchPlayer = async (phrase) => {

    const response = await axiosInstance.get(`Users/searchPlayer?phrase=${phrase}`)
    const t = response.status;
    if (response.status !== 200) {
        throw new Error("Not Found")
    }
    return response.data;
}
export const handlePlayerStats = async (param) => {
    const response = await axiosInstance.get(`Stats/userStats/${param}`);
    return response.data;
}
export const handleUpdateSteamId = async (steamId) => {
    const response = await axiosInstance.put("Account/setSteamId", {
        steamId: steamId,
        resetValue: false
    })
    return response
}
export const handleUpdateSteamDataByPreviousSteamIdChange = async () =>{
    const response = await axiosInstance.put("Account/updateSteamData")
    return response;
}
export const handleGetAccountData = async () => {
    const response = await axiosInstance.get("Account")
    return response;
}

