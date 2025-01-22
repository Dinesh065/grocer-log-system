import React from "react";

const AddPurchaseForm = ({
  purchaseDetails,
  setPurchaseDetails,
  addNewPurchase,
  setShowAddNewSaleForm,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-gray-300 mt-3 p-5 shadow-xl border flex flex-col mb-5 rounded-lg w-full max-w-lg">
        <h4 className="font-bold text-[green]">Add New Purchase:</h4>
        <input
          type="text"
          placeholder="Product Name"
          value={purchaseDetails.name}
          onChange={(e) =>
            setPurchaseDetails({ ...purchaseDetails, name: e.target.value })
          }
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300 mt-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={purchaseDetails.quantity}
          onChange={(e) =>
            setPurchaseDetails({ ...purchaseDetails, quantity: e.target.value })
          }
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300"
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
          className="w-full shadow-lg p-2 mb-3 rounded-lg border border-gray-300"
        />

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
          <button
            className="purchase-button"
            onClick={addNewPurchase}
          >
            Add Purchase
          </button>
          <button
            className="close-button"
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
