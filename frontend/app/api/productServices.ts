// api product services
import { Category, Product, ProductData } from "@/types/types";
import axios from "axios";
import { redirect } from "next/navigation";




// product ทั้งหมด
export const fetchAllProduct = async () => {

    try{
        const { data } = await axios.get<{ data: Product[] }>('http://localhost:8080/apiProducts/products')

        console.log("Product  respone: " , data.data)
        return data.data

    }catch(error: any){
        console.log(error)
        return []

    }
    
}


// product บางตัว ทั้งหมด
export const fetchProductById = async (productId:string) => {

    try{
        const response  = await axios.get<{ product: Product[] }>(`http://localhost:8080/apiProducts/products/${productId}`)

        console.log("fetchProductById respone: " , response.data)
        return response.data.product[0];  // เข้าถึงสินค้าตัวแรกจาก array

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

// แก้ไข product
export const updateProduct = async (productId:string, productData:ProductData) => {

    try{
        const res = await axios.put(`http://localhost:8080/apiProducts/products/${productId}`, productData)
        console.log("respone : ",res)
        console.log("updateProduct successfully:", res);

        return res


    }catch(error: any){
        if (axios.isAxiosError(error)) {
            console.error("Error updating :", error);
            throw error;
        }
        return []; // ป้องกัน undefined 

    }
    
}


// ลบ product
export const deleteProduct = async (productId:string) => {
    try {
        const res = await axios.delete(`http://localhost:8080/apiProducts/products/${productId}`);
        console.log("deleteProduct successfully:", res);

        return res;
    
    } catch (error) {
        console.error("Error deleting post:", error);
        throw error; 
    }
}



// search product
export const searchProduct = async (search:string) => {
    
        try{
            const { data } = await axios.get<{ data: Product[] }>(
                `http://localhost:8080/apiProducts/products/search`, 
                { params: { name: search } } // params เพื่อส่งค่า name
            );
    
            console.log("searchProduct respone: " , data.data)
            return data.data
    
        }catch(error: any){
            console.log(error)
            return []
    
        }
}

// filter product ตาม category
export const filterProduct = async (category:string) => {
    
    try{
        const { data } = await axios.get<{ data: Product[] }>(
            `http://localhost:8080/apiProducts/products/filter`, 
            { params: { category: category } } // params เพื่อส่งค่า category
        );

        console.log("filterProduct respone: " , data.data)
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