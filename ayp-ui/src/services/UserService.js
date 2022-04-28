import useAxios from "../hooks/useAxios";



export const RegisterUser = async (user) => {
    debugger;
    const axios = useAxios();
    return await axios.post("register", { user })
}

