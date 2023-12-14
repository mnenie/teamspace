import type { AxiosResponse } from "axios";
import $api from "@/api/index";
import type { IBoard } from "@/types/Board";
import type { ITask } from "@/types/Task";
import type { IColumn } from "@/types/Column";

/**
 * Service class for managing boards and associated tasks.
 */
export default class BoardService {

    /**
     * Creates a new board.
     * @param board - The details of the board to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created board.
     */
    static async createBoard(board: IBoard): Promise<AxiosResponse<IBoard>> {
        const resp = await $api.post("/board", board);
        return resp;
    }

    
    /**
     * Service method for creating a new task on a board.
     * @param task - The details of the task to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created task.
     */
    static async createTask(task: ITask): Promise<AxiosResponse<ITask>> {
        const resp = await $api.post("/board/task", task);
        return resp;
    }

    /**
     * Service method for creating a new column on a board.
     * @param column - The details of the column to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created column.
     */
    static async createColumn(column: IColumn): Promise<AxiosResponse<IColumn>> {
        const resp = await $api.post("/board/column", column);
        return resp;
    }

    /**
     * Retrieves tasks and columns associated with a board by its ID.
     * @param id - The ID of the board.
     * @returns A Promise resolving to the AxiosResponse containing board info, columns and tasks.
     */
    static async getTasksByBoard(id: string | number): Promise<AxiosResponse<
    { board : IBoard,
      info : {column: IColumn, tasks: ITask[] }[]}>> {
        const resp = await $api.get("/board/tasks/" + id);
        return resp;
    }

    /**
     * Retrieves all boards associated with a project by project ID.
     * @param id - The ID of the project.
     * @returns A Promise resolving to the AxiosResponse containing an array of boards.
     */
    static async getAllBoards(id: string | number): Promise<AxiosResponse<IBoard[]>> {
        const resp = await $api.get("/board/project/" + id);
        return resp;
    }

    /**
     * Renames a board by its ID.
     * @param id - The ID of the board to be renamed.
     * @param newName - The new name for the board.
     * @returns A Promise resolving to the AxiosResponse containing the updated board.
     */
    static async renameBoard(id: string | number, newName: string): Promise<AxiosResponse<IBoard>> {
        const resp = await $api.put("/board/rename" + id, { name: newName });
        return resp;
    }

    /**
     * Deletes a board by its ID.
     * @param id - The ID of the board to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async deleteBoard(id: string | number): Promise<AxiosResponse<void>> {
        const resp = await $api.delete("/board/" + id);
        return resp;
    }

    /**
     * Marks a task as complete by its ID.
     * @param id - The ID of the task to be marked as complete.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the operation.
     */
    static async completeTask(id: string | number, memberId : number): Promise<AxiosResponse<void>> {
        const resp = await $api.put("/board/task/complete/" + id, {memberId: memberId});
        console.log(resp)
        return resp;
    }

    /**
     * Drags a task to a new position on the board by its ID.
     * @param id - The ID of the task to be dragged.
     * @param newTaskPosition - The new importance or position of the task.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the operation.
     */
    static async dragTask(id: string | number, newTaskPosition: number): Promise<AxiosResponse<void>> {
        const resp = await $api.post("/board/task/drag" + id, { importance: newTaskPosition });
        return resp;
    }
}