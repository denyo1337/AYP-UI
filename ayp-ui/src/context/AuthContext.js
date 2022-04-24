import jwtDecode from "jwt-decode";
import { createContext, useReducer } from "react";
import { useEffect } from "react";

let user = {
    nickName: null,
    email: null,
    role: null,
    userId: null
}
export const AuthContext = createContext();

export const authReducer = (state, action) => {
    const mapUser = (userFromToken) => {
        user.email = userFromToken.emailaddress;
        user.nickName = userFromToken.nickName;
        user.role = userFromToken.role;
        user.userId = userFromToken.userId
    }

    switch (action.type) {
        case 'LOGIN':
            console.log("Dispatching ")
            let token = action.payload;
            let userFromToken = jwtDecode(token);
            localStorage.setItem("jwtToken", token)
            mapUser(userFromToken)
            let toJson = JSON.stringify(user);
            localStorage.setItem("user", toJson);
            return { ...state, jwtToken: action.payload, user: user }
        case 'LOGOUT':
            localStorage.clear();
            return { ...state, user: null, jwtToken:null  }
        default:
            return state;
    }
}
export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, {
        user: JSON.parse(localStorage.getItem("user")),
        jwtToken: null
    });

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}