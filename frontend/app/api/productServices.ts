// api product services
import { Category, Product } from "@/types/types";
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