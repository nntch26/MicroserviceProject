"use client"
import { Category, InventoryMovement, Product } from '@/types/types';
import { Search, Truck, Download } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Navbar } from '@/app/components/Navbar';
import { fetchInventoryMovementByID } from '@/app/api/InventoryServices';
import { useParams } from 'next/navigation';
import * as XLSX from 'xlsx';

export default function Page() {
    const [limit, setLimit] = useState();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [product, setProduct] = useState<Product>()

    const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>([]);

    const { id } = useParams() as {id:string};
    console.log("page param:",id)
    
    const fetchInventoryMovements = async () => {
        try {
            const response = await fetchInventoryMovementByID(id);
    
            if(response){
                setInventoryMovements(response); 
                console.log("fetchInventoryMovement", inventoryMovements);
                if (response.length > 0) {
                    setProduct(response[0].inventory.product.product);
                }
            }
            
        } catch (error) {
            console.log(error);
        }
    };
    
    const filteredInventoryMovement = inventoryMovements
        .filter((item) => {
            const searchTermLower = (searchTerm || "").toLowerCase();
    
            return (
                item.reason.toLowerCase().includes(searchTermLower) || 
                item.notes.toLowerCase().includes(searchTermLower) ||
                item.movement_type.toLowerCase().includes(searchTermLower) ||
                item.performedBy.toLowerCase().includes(searchTermLower)
            );
        })
        .slice(0, limit ?? inventoryMovements.length);
    
    useEffect(() => {
        fetchInventoryMovements();
    }, []);

    //  ส่งออกเป็น Excel 
    const exportToExcel = () => {

        const exportData = filteredInventoryMovement.map((movement) => ({
            Date: new Date(movement.updated_at).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" }),
            Product: movement.inventory?.product?.product?.name || "-",
            Code: movement.inventory?.product?.product?.code || "-",
            "Movement Type": movement.movement_type,
            Quantity: movement.quantity,
            Reason: movement.reason,
            Notes: movement.notes,
            "Performed By": movement.performedBy,
            "Balance After": movement.balanceAfter
        }));

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(exportData);

        // Create workbook and add worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory Movements");

        // Generate Excel file
        XLSX.writeFile(workbook, `Inventory_Movements_${product?.name || 'Export'}_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <>
        <div className="flex flex-col h-screen bg-gray-50">
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex flex-1 overflow-hidden">
                <main className="flex-1 overflow-auto p-4">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Inventory Movements - {product?.name}</h1>
                                <p className="text-gray-600 mt-1">Manage your Inventory Movements</p>
                            </div>
                            <button 
                                onClick={exportToExcel}
                                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                <Download size={18} />
                                Export to Excel
                            </button>
                        </div>

                        {/* Search input */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center gap-4">
                                    <div className="relative flex-1 max-w-md">
                                        <Search
                                            size={18}
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Search inventory movements..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Table */}
                        <div className="overflow-auto max-h-[500px] border rounded-lg border-gray-300">
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
                                    {filteredInventoryMovement.length > 0 ? (
                                        filteredInventoryMovement.map((movement) => (
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
                                                <td className="px-6 py-4 whitespace-nowrap">{movement.inventory?.product?.product?.name || "-"}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{movement.inventory?.product?.product?.code || "-"}</td>
                                                <td className={`px-6 py-4 whitespace-nowrap font-medium ${movement.movement_type === "IN" ? "text-green-600" : "text-red-600"}`}>
                                                    {movement.movement_type}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">{movement.quantity}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{movement.reason}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">{movement.notes}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">{movement.performedBy}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">{movement.balanceAfter}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                                Not Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </main>
            </div>
        </div>
        </>
    )
}