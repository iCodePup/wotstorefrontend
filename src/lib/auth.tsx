import {configureAuth} from 'react-query-auth';

import {
    loginWithEmailAndPassword,
    getUser,
    registerWithEmailAndPassword,
    UserResponse,
    LoginCredentialsDTO,
    RegisterCredentialsDTO,
    AuthUser,
} from '@/features/authentification';
import storage from '@/utils/storage';
import React from "react";
import {CircularProgress} from "@mui/material";

async function handleUserResponse(data: UserResponse) {
    const {jwt, user} = data;
    storage.setToken(jwt);
    console.log("registered token" + jwt)
    return user;
}

async function userFn() {
    if (storage.getToken()) {
        const data = await getUser();
        console.log(data)
        return data;
    }
    return null;
}

async function loginFn(data: LoginCredentialsDTO) {
    console.log('loginFn called')
    const response = await loginWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
    const response = await registerWithEmailAndPassword(data);
    const user = await handleUserResponse(response);
    return user;
}

async function logoutFn() {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
}


//TODO refresh token....
//https://github.com/Flyrell/axios-auth-refresh


const authConfig = {
    userFn,
    loginFn,
    registerFn,
    logoutFn,
};
//
// const { useUser, useLogin, useRegister, useLogout } = configureAuth({
//     userFn: () => api.get('/me'),
//     loginFn: (credentials) => api.post('/login', credentials),
//     registerFn: (credentials) => api.post('/register', credentials),
//     logoutFn: () => api.post('/logout'),
// });


export const {AuthLoader, useUser, useLogin, useRegister, useLogout} = configureAuth<
    AuthUser | null,
    unknown,
    LoginCredentialsDTO,
    RegisterCredentialsDTO
>({
    userFn: () => userFn(),
    loginFn: (credentials) => loginFn(credentials),
    registerFn: (credentials) => registerFn(credentials),
    logoutFn: () => logoutFn(),
});