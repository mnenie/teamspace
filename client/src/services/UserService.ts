import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { IUser } from "@/types/user.interface";

export default class UserService{
    static async registration(user :IUser) : Promise<AxiosResponse<string>>{
        const resp =  await $api.post("/users/register", user);
        localStorage.setItem("token", resp.data.token);
        return resp
    }

    static async login(loginData : {username : string, password : string}) : Promise<AxiosResponse<string>>{
        const resp = await $api.post("/users/login", loginData);
        localStorage.setItem("token", resp.data.token);
        return resp;
    }

    static logout() : void{
        localStorage.removeItem("token");
    }
}