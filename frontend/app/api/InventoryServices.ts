import axios from "axios";
import { ProductInventoryData, InventoryMovement, MovementData } from "@/types/types";

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

export const AddInventoryPrduct = async (Inventorydata: ProductInventoryData) => {

    try {
        const res = await axios.post('http://localhost:8080/apiInventory/inventory/create', Inventorydata)
        console.log("respone : ", res)
        console.log("added successfully:", res);

        return res

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error("Error adding :", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }

}

export const deleteInventoryProduct = async (id: string) => {
    try {
        const res = await axios.delete(`http://localhost:8080/apiInventory/inventory/${id}`);
        console.log("Delete product successfully:", res);
        return res;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};


// ดึง inventory แต่ละอัน
export const fetchInventory = async (inventoryId:string) => {
    try {
        const res = await axios.get(`http://localhost:8080/apiInventory/inventory/${inventoryId}`);

        if (res.data && res.data.status !== "error") {
            console.log("fetchInventory response:", res.data);
            return res.data;
        } else {
            console.warn("ไม่พบข้อมูล:", res.data.message);
            return [];
        }
    } catch (error: any) {
        console.error("Error fetching inventory :", error.message);
        return [];
    }
};


// inventory movement  get data
export const fetchInventoryMovement = async () => {
    try {
        const { data } = await axios.get("http://localhost:8080/apiInventory/movements/");

        console.log("Inventory Movement response:", data);
        return data;
        

    } catch (error: any) {
        console.error("Error fetching Inventory Movement:", error.message);
        return [];
    }
};

// inventory movement สร้าง

export const AddInventoryMovement  = async (newdata:MovementData) => {

    try{
        const res = await axios.post('http://localhost:8080/apiInventory/movements/create', newdata)
        console.log("respone : ",res)
        console.log("CreateMovement successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error adding :", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}



// ดึง inventory movement แต่ละอัน
export const fetchInventoryMovementByID = async (inventoryId: string) => {
    try {
        const res = await axios.get(`http://localhost:8080/apiInventory/movements/${inventoryId}`);

        console.log("fetchInventory response:", res.data);
        return res.data;
    } catch (error: any) {
        if (error.response && error.response.status === 404) {
            console.warn(`ไม่พบข้อมูลสำหรับ Inventory ID: ${inventoryId}`);
            return [];
        }

        console.error("Error fetching inventory:", error.message);
        return [];
    }
};
