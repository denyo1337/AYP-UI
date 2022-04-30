import useAxios from "../hooks/useAxios";



export const RegisterUser = async (user) => {
    const axios = useAxios();
    return await axios.post("register", { user })
}

