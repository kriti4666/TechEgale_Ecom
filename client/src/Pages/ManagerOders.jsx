import { useEffect } from "react";
import Navbar from "../components/Navbar";

import { formatDateString } from "../utils/helper"
import { useProduct } from "../context/ProductContext";

const ManagerOrders = () => {
    const { allOders, fetchAllOrders, updateOrderStatus } = useProduct();




    useEffect(() => {
        fetchAllOrders()
    }, [])

    // console.log(allOders, "All Orders OR");



    const handleUpdateStatus = async (orderId, status) => {
        try {
          await updateOrderStatus(orderId, status);
          fetchAllOrders();
        } catch (error) {
          console.error('Error updating order status:', error);
        }
      };


    return (
        <div>
            <Navbar />

            <div className="relative overflow-x-auto px-5 py-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 rounded-s-lg">
                                Customer Id
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-s-lg">
                                Order Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-e-lg">
                                Qty
                            </th>
                            <th scope="col" className="px-6 py-3 rounded-e-lg">
                                Price
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOders?.map((order) => (
                            <tr key={order._id} className="bg-white dark:bg-gray-800">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.customerId}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order._id}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDateString(order.createdAt)}
                                </td>
                                <td className="px-6 py-4">
              {/* Select dropdown for status */}
              <select
                value={order.status}
                onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </td>

                                <td className="px-6 py-4">
                                    {order.products.reduce(
                                        (totalQty, product) => totalQty + product.quantity,
                                        0
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {order.total}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManagerOrders;
