import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPlus, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import AddPurchaseForm from "./AddPurchaseForm";

const CustomerDetails = ({ selectedCustomer, deleteItem, setShowAddNewSaleForm, showAddNewSaleForm, purchaseDetails, setPurchaseDetails, addNewPurchase, deleteCustomer, markAsPaid, generateBill, setSelectedCustomer }) => {
  return (
    <div className="shadow-[0px_4px_10px_rgba(0,0,0,0.7)] bg-[#0d1321] text-white p-6 rounded-lg">
      <h3 className="text-xl font-semibold">Customer Name: {selectedCustomer.name}</h3>
      <p>Flat No: {selectedCustomer.flatNo}</p>
      <p>Society: {selectedCustomer.societyName}</p>
      <p>Email: {selectedCustomer.email}</p>
      <p className="font-semibold">Total Pending: <span className="text-red-400">{selectedCustomer.totalPending}</span></p>

      {selectedCustomer.status === 'Paid' && (
        <p className="text-green-400">Paid on: {selectedCustomer.paidOn}</p>
      )}

      <h4 className="mt-5 mb-2 text-lg">Purchases:</h4>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Name</th>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Quantity</th>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Price Per Item</th>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Total</th>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Date</th>
              <th className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedCustomer.purchases.map((purchase, idx) => (
              <tr key={idx} className="bg-[#0d1321] border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{purchase.name}</td>
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{purchase.quantity}</td>
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{purchase.pricePerItem}</td>
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{purchase.total}</td>
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">{purchase.date}</td>
                <td className="p-2 bg-gray-800 border-gray-900 border-t-0 border-r-0 border-l-0 border-b-2 text-gray-400">
                  <button onClick={() => deleteItem(idx)} className="text-red-400 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrashAlt} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={() => setShowAddNewSaleForm(true)} className="mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add New Purchase
      </button>

      {showAddNewSaleForm && (
        <AddPurchaseForm
          purchaseDetails={purchaseDetails}
          setPurchaseDetails={setPurchaseDetails}
          addNewPurchase={addNewPurchase}
          setShowAddNewSaleForm={setShowAddNewSaleForm}
        />
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button onClick={deleteCustomer} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded flex items-center">
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete Customer
        </button>
        <button onClick={markAsPaid} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded">Mark as Paid</button>
        <button onClick={generateBill} className="p-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded flex items-center">
          <FontAwesomeIcon icon={faFileInvoiceDollar} className="mr-2" /> Generate Bill
        </button>
        <button onClick={() => setSelectedCustomer(null)} className="p-2 bg-gray-600 hover:bg-gray-700 text-white rounded">Back</button>
      </div>
    </div>
  );
};

export default CustomerDetails;
