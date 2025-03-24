import axios from "axios";
import { InventoryProducts, Category } from "@/types/types";


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