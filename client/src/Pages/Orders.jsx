import { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import {formatDateString} from "../utils/helper"

const Orders = () => {
  const { userOrder, fetchUserOrders } = useCart();

  console.log("Hiiii")


  useEffect(() => {
    fetchUserOrders()
  }, [])

  console.log(userOrder, "USER OR");


  return (
    <div>
      <Navbar />

      <div className="relative overflow-x-auto px-5 py-10">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
            {userOrder?.map((order) =>
              <tr key={order._id} className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {order._id}
                </th>
                {/* <td className="px-6 py-4">{order.quantity.length}</td> */}
                <td className="px-6 py-4">

                  {formatDateString(order.createdAt)}
                </td>
                <td className="px-6 py-4">

                  {order.status}
                </td>

                {/* <td className="px-6 py-4">{order.quantity.length}</td> */}
                <td className="px-6 py-4">

                  {order.products.length}
                </td>

                <td className="px-6 py-4">

                  {order.total}
                </td>
              </tr>

            )}
          </tbody>

          {/* <tfoot>
            <tr className="font-semibold text-gray-900 dark:text-white">
              <th scope="row" className="px-6 py-3 text-base">
                Total
              </th>
              <td className="px-6 py-3">
                {userOrders?.reduce((total, order) =>
                  order.products.reduce(
                    (orderTotal, product) => orderTotal + product.quantity,
                    0
                  )
                , 0)}
              </td>
              <td className="px-6 py-3">
                {userOrders.reduce((total, order) =>
                  order.products.reduce(
                    (orderTotal, product) => orderTotal + product.price,
                    0
                  )
                , 0)}
              </td>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  );
};

export default Orders;
