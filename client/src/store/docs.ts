import { defineStore } from "pinia";
import type { ISheet } from "@/types/Sheet";
import { ref } from "vue";
import DocumentationService from "@/services/DocumentationService";

export const useDoc = defineStore('doc', () => {
    const sheets = ref<ISheet[]>([] as ISheet[]);
    const sheetInfo = ref<ISheet>({} as ISheet);

    const getSheetInfo = async (id: number) => {
        try{
            const resp = await DocumentationService.getOne(id);
            sheetInfo.value = resp.data;
        }catch(e){
            console.log(e);
        }
    }

    const addSheet = async (sheet : ISheet) => {
        try{
            const resp = await DocumentationService.create(sheet);
            sheets.value.push(resp.data);
        }catch(e){
            console.log(e);
        }
    }

    const getSheets =  async (projectId : number) => {
        try{
            const resp = await DocumentationService.getAll(projectId);
            sheets.value = resp.data; 
        } catch(e){
            console.log(e);
        }
    }

    const saveSheet = async (body : string ) => {
        try{
            const resp = await DocumentationService.saveBody(sheetInfo.value.id!,body);
        }catch(e){
            console.log(e)
        }
    }

    const deleteSheet = async (sheetId : number) => {
        try{  
            const response = await DocumentationService.delete(sheetId)
            sheets.value = sheets.value.filter(elem => elem.id !== sheetId);
        } catch(e){
          console.log(e)
        }
    }

    return {
        getSheets,sheets,addSheet,getSheetInfo,sheetInfo,saveSheet, deleteSheet
}
})