import {defineStore} from "pinia";
import {ref} from "vue";
import {userRegisterService} from "@/api/user.js";

//用户模块
export const userUserStore=defineStore(
    'big-user',
    ()=>{
        const token =ref('')
        const userName=ref('')
        const userPwd=ref('')
        const isAdmin=ref('')
    const setToken = (newToken)=>{
        token.value=newToken
    }
    const setUser=(newUserName,newUserPwd)=>{
        userName.value=newUserName
        userPwd.value=newUserPwd
    }
    const setIsAdmin=(newIsAdmin)=>{
        isAdmin.value=newIsAdmin
    }
    const removeToken=()=>{
        token.value=''
    }
    const removeUser=()=>{
        userName.value=''
        userPwd.value=''
    }
    const removeIsAdmin=()=>{
        isAdmin.value=''
    }
    return{
        token,
        setToken,
        removeToken,
        setUser,
        removeUser,
        userName,
        userPwd,
        isAdmin,
        setIsAdmin,
        removeIsAdmin
    }
},{
    persist:true
})