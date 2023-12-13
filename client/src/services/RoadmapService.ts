import type { AxiosResponse } from 'axios';
import $api from '@/api';
import type {IRoadmap} from '@/types/Roadmap'
import type { IInterval } from '@/types/Interval';
export default class RoadmapService {

    /**
     * Creates a new roadmap.
     * @param roadmapInput - The details of the roadmap to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created roadmap.
     */
    static async createRoadmap(roadmapInput: IRoadmap): Promise<AxiosResponse<IRoadmap>> {
        const resp = await $api.post('/roadmap', roadmapInput);
        return resp;
    }

    /**
     * Retrieves all roadmaps associated with a project by project ID.
     * @param projectId - The ID of the project.
     * @returns A Promise resolving to the AxiosResponse containing an array of roadmaps.
     */
    static async getAllRoadmaps(projectId: string): Promise<AxiosResponse<IRoadmap[]>> {
        const resp = await $api.get(`/roadmap/project/${projectId}`);
        return resp;
    }

    /**
     * Retrieves intervals associated with a roadmap by its ID.
     * @param roadmapId - The ID of the roadmap.
     * @returns A Promise resolving to the AxiosResponse containing an array of intervals.
     */
    static async getIntervalsByRoadmap(roadmapId: string): Promise<AxiosResponse<IInterval[]>> {
        const resp = await $api.get(`/roadmap/${roadmapId}`);
        return resp;
    }

    /**
     * Deletes a roadmap by its ID.
     * @param roadmapId - The ID of the roadmap to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async deleteRoadmap(roadmapId: string): Promise<AxiosResponse<void>> {
        const resp = await $api.delete(`/roadmap/${roadmapId}`);
        return resp;
    }

    /**
     * Adds a new interval to a roadmap.
     * @param intervalInput - The details of the interval to be added.
     * @returns A Promise resolving to the AxiosResponse containing the created interval.
     */
    static async addIntervalToRoadmap(intervalInput: IInterval): Promise<AxiosResponse<IInterval>> {
        const resp = await $api.post('/roadmap/interval', intervalInput);
        return resp;
    }

    /**
     * Renames a roadmap by its ID.
     * @param roadmapId - The ID of the roadmap to be renamed.
     * @param newName - The new name for the roadmap.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the rename operation.
     */
    static async renameRoadmap(roadmapId: string, newName: string): Promise<AxiosResponse<void>> {
        const resp = await $api.put(`/roadmap/rename/${roadmapId}`, { name: newName });
        return resp;
    }
}
