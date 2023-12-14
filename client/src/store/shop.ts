import { defineStore } from "pinia";
import type { ISheet } from "@/types/Sheet";
import { ref } from "vue";
import DocumentationService from "@/services/DocumentationService";
import type { IProduct } from "@/types/Product";
import StoreService from "@/services/StoreService";

export const useStore = defineStore('store', () => {
    const products = ref<IProduct[]>([] as IProduct[]);


    const addProduct = async (sheet : IProduct) => {
        try{
            const resp = await StoreService.createProduct(sheet);
            products.value.push(resp.data);
        }catch(e){
            console.log(e);
        }
    }

    const getProducts =  async (projectId : number) => {
        try{
            const resp = await StoreService.getAllProducts(projectId);
            console.log(resp.data, projectId)
            products.value = resp.data; 
        } catch(e){
            console.log(e);
        }
    }

    const deleteProduct = async (sheetId : number) => {
        try{  
            const response = await StoreService.deleteProduct(sheetId)
            products.value = products.value.filter(elem => elem.id !== sheetId);
        } catch(e){
          console.log(e)
        }
    }

    return {
        deleteProduct,getProducts,addProduct,products
}
})