import { Package, Truck  } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchInventoryMovement, fetchInventory } from "../api/InventoryServices";
import { InventoryMovement } from "@/types/types";


interface ProductTableProps {
  limit?: number;
  showActions?: boolean;
  searchTerm?: string;
  selectedCategory?:string
}

export function MovementTable({ limit, showActions = false, searchTerm, selectedCategory }: ProductTableProps) {
  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>([]);

  const fetchInventoryMovements = async () => {
    try {
      const response = await fetchInventoryMovement();

      if(response){
        setInventoryMovements(response); 
        console.log("fetchInventoryMovement", inventoryMovements);
      }
    

    } catch (error) {
      console.log(error);
    }
  };


  const filteredInventoryMovement = inventoryMovements
  .filter((item) => {
    const product = item.inventory.product.product;
    const searchTermLower = (searchTerm || "").toLowerCase();

    return (
      (product?.name?.toLowerCase().includes(searchTermLower) || 
       product?.code?.toLowerCase().includes(searchTermLower)) && // เพิ่มเงื่อนไขการค้นหาด้วย code
      (selectedCategory ? product?.category?.name === selectedCategory : true)
    );
  })
  .slice(0, limit ?? inventoryMovements.length); // ถ้า limit ไม่มีค่า ให้ใช้จำนวนสินค้าทั้งหมด



  useEffect(() => {
    fetchInventoryMovements();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Movement Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance After</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInventoryMovement.map((movement) => (
            <tr key={movement._id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Truck className="h-5 w-5 text-gray-500" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                    {new Date(movement.updated_at).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}

                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{movement.inventory.product.product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{movement.inventory.product.product.code}</td>
              <td className={`px-6 py-4 whitespace-nowrap font-medium ${movement.movement_type === "IN" ? "text-green-600" : "text-red-600"}`}>                
                  {movement.movement_type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{movement.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{movement.reason}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{movement.notes}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center">{movement.performedBy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-right">{movement.balanceAfter}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
