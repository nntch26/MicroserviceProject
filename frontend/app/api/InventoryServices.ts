import axios from "axios";
import { ProductInventoryData } from "@/types/types";

export const fetchInventoryProduct = async () => {
    try {
        const res = await axios.get("http://localhost:8080/apiInventory/inventory");

        if (res.data && res.data.status !== "error") {
            console.log("Product response:", res.data);
            return res.data;
        } else {
            console.warn("ไม่พบข้อมูลสินค้า:", res.data.message);
            return [];
        }
    } catch (error: any) {
        console.error("Error fetching inventory products:", error.message);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const res = await axios.get("http://localhost:8080/apiProducts/categories");

        if (res.data && res.data.status !== "error") {
            console.log("Category response:", res.data);
            return res.data.data;
        } else {
            console.warn("ไม่มีข้อมูลหมวดหมู่:", res.data.message);
            return [];
        }
    } catch (error: any) {
        console.error("Error fetching categories:", error.message);
        return [];
    }
};

export const AddInventoryPrduct = async (Inventorydata: ProductInventoryData) => {

    try{
        const res = await axios.post('http://localhost:8080/apiInventory/inventory/create', Inventorydata)
        console.log("respone : ",res)
        console.log("added successfully:", res);

        return res

    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error adding :", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}
