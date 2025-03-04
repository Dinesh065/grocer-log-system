import React from "react";

const AddPurchaseForm = ({
  purchaseDetails,
  setPurchaseDetails,
  addNewPurchase,
  setShowAddNewSaleForm,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center p-4">
      <div className="bg-black text-white mt-3 p-5 shadow-xl border border-gray-700 flex flex-col mb-5 rounded-lg w-full max-w-lg">
        <h4 className="font-bold text-green-400">Add New Purchase:</h4>
        <input
          type="text"
          placeholder="Product Name"
          value={purchaseDetails.name}
          onChange={(e) =>
            setPurchaseDetails({ ...purchaseDetails, name: e.target.value })
          }
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-600 bg-[#0f0f1a] text-white placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={purchaseDetails.quantity}
          onChange={(e) =>
            setPurchaseDetails({ ...purchaseDetails, quantity: e.target.value })
          }
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-600 bg-[#0f0f1a] text-white placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Price Per Item"
          value={purchaseDetails.pricePerItem}
          onChange={(e) =>
            setPurchaseDetails({
              ...purchaseDetails,
              pricePerItem: e.target.value,
            })
          }
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-600 bg-[#0f0f1a] text-white placeholder-gray-400"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            onClick={addNewPurchase}
          >
            Add Purchase
          </button>
          <button
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
            onClick={() => setShowAddNewSaleForm(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>

  );
};

export default AddPurchaseForm;
