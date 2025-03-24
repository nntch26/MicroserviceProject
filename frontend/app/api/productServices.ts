// api product services
import { Category, Product, ProductData } from "@/types/types";
import axios from "axios";
import { redirect } from "next/navigation";




// product ทั้งหมด
export const fetchProduct = async () => {

    try{
        const { data } = await axios.get<{ data: Product[] }>('http://localhost:8080/apiProducts/products')

        console.log("Product respone: " , data.data)
        return data.data

    }catch(error: any){
        console.log(error)
        return []

    }
    
}


// เพิ่ม product ใหม่
export const AddPrdouct = async (newdata:ProductData) => {

    try{
        const res = await axios.post('http://localhost:8080/apiProducts/products/add', newdata)
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








// Category ทั้งหมด
export const fetchCategory = async () => {

    try{
        const { data } = await axios.get<{ data: Category[] }>('http://localhost:8080/apiProducts/categories')

        console.log("Category respone: " , data.data)
        return data.data

    }catch(error: any){
        console.log(error)
        return []

    }
    
}