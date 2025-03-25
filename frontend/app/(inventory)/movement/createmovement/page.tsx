'use client'

import { AddInventoryMovement } from '@/app/api/InventoryServices';
import React, { useState } from 'react'

export default function page() {
const [inventory, setInventory] = useState<string>(''); 
const [movement_type, setMovementType] = useState<'IN' | 'OUT'>('IN'); 
const [quantity, setQuantity] = useState<number>(0); 
const [reason, setReason] = useState<string>(''); 
const [notes, setNotes] = useState<string>(''); 
const [performedBy, setPerformedBy] = useState<string>(''); 

// submission
const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // ตรวจสอบค่าก่อนการส่งข้อมูล
    if (!inventory || !movement_type || quantity <= 0 || !reason) {
    alert('Please fill in all required fields correctly');
    return;
    }

    const inventoryMovementData = {
    inventory,       
    movement_type,   
    quantity,        
    reason,          
    notes,           
    performedBy
    };

    try {
    const response = await AddInventoryMovement(inventoryMovementData);

    if (response) {
        setInventory('');
        setMovementType('IN');
        setQuantity(0);
        setReason('');
        setNotes('');
        alert('Inventory movement added successfully!');
    } 

    } catch (error) {
    console.error('Error adding inventory movement:', error);
    alert('Failed to add inventory movement');
    }
};

return (
    <>
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Inventory Movement
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {/* Product (Inventory) */}
                <div className="mb-4">
                    <label htmlFor="inventory" className="block text-sm font-medium text-gray-700 mb-2">
                    Product (Inventory)
                    </label>
                    <input
                    id="inventory"
                    name="inventory"
                    type="text"
                    required
                    value={inventory}
                    onChange={(e) => setInventory(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter product ID" />
                </div>

                {/* Movement Type */}
                <div className="mb-4">
                    <label htmlFor="movement_type" className="block text-sm font-medium text-gray-700 mb-2">
                    Movement Type
                    </label>
                    <select
                    id="movement_type"
                    name="movement_type"
                    required
                    value={movement_type}
                    onChange={(e) => setMovementType(e.target.value as 'IN' | 'OUT')}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                    <option value="IN">IN (Add)</option>
                    <option value="OUT">OUT (Remove)</option>
                    </select>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                    </label>
                    <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    required
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    step="1"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter quantity" />
                </div>

                {/* Reason */}
                <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason
                    </label>
                    <select
                    id="reason"
                    name="reason"
                    required
                    value={reason}
                    onChange={(e) => setReason(e.target.value as 'PURCHASE' | 'SALE' | 'ADJUSTMENT' | 'DAMAGE' | 'RETURN')}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                    <option value="PURCHASE">PURCHASE</option>
                    <option value="SALE">SALE</option>
                    <option value="ADJUSTMENT">ADJUSTMENT</option>
                    <option value="DAMAGE">DAMAGE</option>
                    <option value="RETURN">RETURN</option>
                    </select>
                </div>
                

                {/* Notes */}
                <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Notes
                    </label>
                    <input
                    id="notes"
                    name="notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter notes" />
                </div>

                {/* Performed By */}
                <div className="mb-4">
                    <label htmlFor="performedBy" className="block text-sm font-medium text-gray-700 mb-2">
                    Performed By
                    </label>
                    <input
                    id="performedBy"
                    name="performedBy"
                    type="text"
                    required
                    value={performedBy}
                    onChange={(e) => setPerformedBy(e.target.value)}
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter performed by" />
                </div>

                
            </div>

            {/* Submit Button */}
            <div>
            <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
            >
                Add Inventory Movement
            </button>
            </div>
        </form>
        </div>
    </div>
    </>
)
}