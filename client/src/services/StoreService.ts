import type { AxiosResponse } from 'axios';
import $api from '@/api';
import type { IProduct } from '@/types/Product';
import type { IPurchaseInfo } from '@/types/PurschaseInfo';
export default class StoreService {

    /**
     * Creates a new product.
     * @param productInput - The details of the product to be created.
     * @returns A Promise resolving to the AxiosResponse containing the created product.
     */
    static async createProduct(productInput: IProduct): Promise<AxiosResponse<IProduct>> {
        const resp = await $api.post('/store/product', productInput);
        return resp;
    }

    /**
     * Retrieves all products associated with a project by project ID.
     * @param projectId - The ID of the project.
     * @returns A Promise resolving to the AxiosResponse containing an array of products.
     */
    static async getAllProducts(projectId: number): Promise<AxiosResponse<IProduct[]>> {
        const resp = await $api.get(`/store/${projectId}`);
        return resp;
    }

    /**
     * Deletes a product by its ID.
     * @param productId - The ID of the product to be deleted.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the deletion.
     */
    static async deleteProduct(productId: number): Promise<AxiosResponse<void>> {
        const resp = await $api.delete(`/store/product/${productId}`);
        return resp;
    }

    /**
     * Makes a purchase for a product.
     * @param purchaseInfo - Information about the purchase, including product and member details.
     * @returns A Promise resolving to the AxiosResponse indicating the success of the purchase.
     */
    static async makePurchase(purchaseInfo: IPurchaseInfo): Promise<AxiosResponse<void>> {
        const resp = await $api.post('/store/purchase', purchaseInfo);
        return resp;
    }
}
