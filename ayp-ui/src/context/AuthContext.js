import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";
import { useHistory } from "react-router-dom";

let user =  {
    email: null,
    nickName: null,
    steamNickName: null,
    phoneNumber: null,
    nationality: null,
    gender: null,
    role: null,
    userId: null,
    avatarImage: null,
    lastLogOn: null,
    steamProfileUrl: null,
    realName: null,
    steamAccountCreatedAt: null,
    steamId: null,
}
export const AuthContext = createContext();

export const authReducer = (state, action) => {

    const mapUserFromToken = (userFromToken) => {
        user.email = userFromToken.emailaddress;
        user.nickName = userFromToken.nickName;
        user.role = userFromToken.role;
        user.userId = userFromToken.userId;
        user.loggedIn = true;
    }
    const mapUpdateUser = (userData) => {
        user.email = userData.email;
        user.nickName = userData.nickName;
        user.steamNickName = userData.steamNickName;
        user.phoneNumber = userData.phoneNumber ?? "";
        user.gender = userData.gender;
        user.lastLogOn = userData.lastLogOn;
        user.steamProfileUrl = userData.profileUrl;
        user.realName = userData.realName;
        user.steamId = userData.steamId;
        user.nationality = userData.nationality;
        user.steamAccountCreatedAt = userData.steamAccountCreatedAt;
        user.userId = user.userId;
        user.role = user.role;
        user.avatarImage = userData.avatarUrl;
        return user;
    }

    
    switch (action.type) {
        case 'LOGIN':{
            console.log("Dispatching ")
            let token = action.payload;
            let userFromToken = jwtDecode(token);
            localStorage.setItem("jwtToken", token)
            mapUserFromToken(userFromToken)
            let toJson = JSON.stringify(user);
            localStorage.setItem("user", toJson);
            return { ...state, jwtToken: action.payload, user: user }
        }
        case 'UPDATE_USER_STEAMDATA':{
            let user = mapUpdateUser(action.payload)
            localStorage.setItem("user", JSON.stringify(user))
            return { ...state, user: user }
        }
        case "UPDATE_TOKEN":{
            localStorage.setItem('jwtToken', action.payload);
            return {...state, jwtToken: action.payload}
        }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, user: null, jwtToken: null }
        default:
            return state;
    }
}
export const AuthContextProvider = ({ children }) => {
    const history = useHistory();
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        history.push("/");
    }
    const [state, dispatch] = useReducer(authReducer, {
        user: user.userId ?? JSON.parse(localStorage.getItem("user")),
        jwtToken: localStorage.getItem("jwtToken")?.toString()
    });

    return (
        <AuthContext.Provider value={{ ...state, dispatch, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}