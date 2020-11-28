import Axios from 'axios';
import React from 'react';
import * as URL from '../../constants';
import { createContext, useState } from "react";
import { getFromLocalStorage, deleteFromLocalStorage, loginUser, saveInLocalStorage, readCookie, setCookie, deleteCookie, registerUser } from "./authActions";

export const AuthContext = createContext();

const user_details = getFromLocalStorage('user-details')

const initAuthState = {
    isAuthenticated: Boolean(user_details),
    isVerifying: false,
    userDetails: user_details,
    authenticationError: null,
    jwt: readCookie('auth-jwt')
};

const AuthContextProvider = ({ children }) => {

    const [authStatus, setAuthStatus] = useState(() => {
        return initAuthState;
    });

    const register = async (username, email, password) => {
        setAuthStatus({ ...authStatus, isVerifying: true });

        try {
            const registerResponse = await registerUser(username, email, password);

            if (registerResponse.status === 200) {
                setAuthStatus({ isAuthenticated: true, userDetails: registerResponse.data.user, authenticationError: null, jwt: registerResponse.data.jwt, isVerifying: false });
                saveInLocalStorage('user-details', registerResponse.data.user);
                setCookie('auth-jwt', registerResponse.data.jwt);

                return registerResponse;
            }

            setAuthStatus({ isAuthenticated: false, userDetails: {}, authenticationError: 'Unidentified error', jwt: '', isVerifying: false });
            return registerResponse;
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }

    const login = async (email, password) => {
        setAuthStatus({ ...authStatus, isVerifying: true });
        try {

            const loginResponse = await loginUser(email, password);

            if (loginResponse.status === 200) {
                setAuthStatus({ isAuthenticated: true, userDetails: loginResponse.data.user, authenticationError: null, jwt: loginResponse.data.jwt, isVerifying: false });
                saveInLocalStorage('user-details', loginResponse.data.user);
                setCookie('auth-jwt', loginResponse.data.jwt);

                return loginResponse;
            }

            setAuthStatus({ isAuthenticated: false, userDetails: {}, authenticationError: 'Unidentified error', jwt: '', isVerifying: false });
            return loginResponse;

        } catch (error) {
            console.log(error.response);
            setAuthStatus({ isAuthenticated: false, userDetails: {}, authenticationError: error, jwt: '', isVerifying: false });
            return error.response;
        }
    };

    const logout = () => {
        deleteFromLocalStorage('user-details');
        deleteCookie('auth-jwt');

        setAuthStatus({ ...authStatus, isAuthenticated: false, userDetails: null, jwt: null });
    };

    const updateUserDetails = async () => {
        try {
            const response = await Axios.get(`${URL.BACKEND_URL}/users/${authStatus.userDetails.id}`);

            if (response.status === 200) {
                setAuthStatus({ ...authStatus, userDetails: response.data });
                saveInLocalStorage('user-details', response.data);
            }
        } catch (error) {
            console.log(error.response);
            window.location.reload();
        }
    };

    return (
        <AuthContext.Provider value={{ authStatus, login, logout, register, updateUserDetails }}>
            { children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
