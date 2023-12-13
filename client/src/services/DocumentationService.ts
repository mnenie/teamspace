import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { ISheet } from "@/types/Sheet";

/**
 * Service class for managing documentation sheets.
 */
export default class DocumentationService {

    /**
     * Creates a new documentation sheet.
     * @param sheet - The documentation sheet to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created documentation sheet.
     */
    static async create(sheet: ISheet): Promise<AxiosResponse<ISheet>> {
        const resp = await $api.post("/documentation/", sheet);
        return resp;
    }

    /**
     * Retrieves all documentation sheets from a project by project ID.
     * @param id - The ID of the project.
     * @returns A Promise resolving to the AxiosResponse containing an array of documentation sheets.
     */
    static async getAll(id: string | number): Promise<AxiosResponse<ISheet[]>> {
        const resp = await $api.get("/documentation/project/" + id);
        return resp;
    }

    /**
     * Retrieves data for a specific documentation sheet by sheet ID.
     * @param id - The ID of the documentation sheet.
     * @returns A Promise resolving to the AxiosResponse containing the documentation sheet data.
     */
    static async getOne(id: string | number): Promise<AxiosResponse<ISheet>> {
        const resp = await $api.get("/documentation/" + id);
        return resp;
    }

    /**
     * Deletes a documentation sheet by its ID.
     * @param id - The ID of the documentation sheet to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async delete(id: string | number): Promise<AxiosResponse<void>> {
        const resp = await $api.delete("/documentation/" + id);
        return resp;
    }

    static async rename(id: number, newName : string) : Promise<AxiosResponse<void>>{
        return await $api.put("documentation/rename/" + id, {name : newName})
    }

    static async saveBody(id: number, body : string) : Promise<AxiosResponse<void>>{
        const resp = await $api.put("documentation/" + id, {body : body})
        return resp;
    }
}