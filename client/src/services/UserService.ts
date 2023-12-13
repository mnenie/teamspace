import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { IUser } from "@/types/User";
import type { IUserAuth } from "@/types/UserAuth";

/**
 * Service class for user-related operations, including registration, login, and logout.
 */
export default class UserService {

    /**
     * Registers a new user.
     * @param user - The user details for registration.
     * @returns A Promise resolving to the AxiosResponse containing the registration token.
     */
    static async registration(user: IUser): Promise<AxiosResponse<IUserAuth>> {
        const resp = await $api.post("/users/register", user);
        return resp;
    }

    /**
     * Logs in a user with the provided credentials.
     * @param loginData - The user's login credentials (username and password).
     * @returns A Promise resolving to the AxiosResponse containing the login token.
     */
    static async login(loginData: { email: string, password: string }): Promise<AxiosResponse<IUserAuth>> {
        const resp = await $api.post("/users/login", loginData);
        return resp;
    }

    /**
     * Logs the current user out by removing the authentication token from local storage.
     */
    static logout(): void {
        localStorage.removeItem("token");
    }
}