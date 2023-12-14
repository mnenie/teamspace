import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { IProject } from "@/types/Project";
import type { IMember } from "@/types/Member";

/**
 * Service class for managing projects.
 */
export default class ProjectService {

    /**
     * Creates a new project.
     * @param proj - The project details to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created project.
     */
    static async create(proj: IProject): Promise<AxiosResponse<IProject>> {
        const resp = await $api.post("/project", proj);
        return resp;
    }

    /**
     * Deletes a project by its ID.
     * @param id - The ID of the project to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async delete(id: string | number): Promise<AxiosResponse<void>> {
        const resp = await $api.delete("/project/" + id);
        return resp;
    }

    /**
     * Renames a project.
     * @param id - The ID of the project to be renamed.
     * @param name - The new name for the project.
     * @returns A Promise resolving to the AxiosResponse containing the updated project name.
     */
    static async rename(id: string | number, name: string): Promise<AxiosResponse<string>> {
        const resp = await $api.put("/project/", { params: { id, name } });
        return resp;
    }

    /**
     * Retrieves all projects in which a user is a member.
     * @param userId - The ID of the user.
     * @returns A Promise resolving to the AxiosResponse containing an array of projects.
     */
    static async getAll(userId: string | number): Promise<AxiosResponse<IProject[]>> {
        const resp = await $api.get("/all/" + userId);
        return resp;
    }

    static async getMembers(projId: number): Promise<AxiosResponse<IMember[]>> {
        const resp = await $api.get("/project/members/" + projId);
        return resp;
    }
}
