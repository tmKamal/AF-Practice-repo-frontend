import {createContext} from 'react';

export const AuthContext=createContext({
    isLoggedin:false,
    login:()=>{},
    logout:()=>{}
});//This is a object , we can use this for manage our logins

