import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import { useNavigate } from "react-router-dom";



const ManagerDashboard = () => {
    const { products, fetchProducts, deleteProduct } = useProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate()



    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchProducts();
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, [navigate]);



    const openEditModal = (productId) => {
        setIsEditModalOpen(true);
        setSelectedProductId(productId);
    };


 const handleLogout=()=>{
    localStorage.clear()
    window.location.reload()
 }


    return (
        <div>
            <div className="p-10 relative overflow-x-auto shadow-md sm:rounded-lg">
                <h1 className="text-xl">Products List</h1>
                <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                    <div>

                        <button
                            className="px-5 py-2 text-white rounded-full bg-blue-600"
                            onClick={openModal}
                        >Add Product</button>

<button
                            className="px-5 py-2 text-white rounded-full bg-blue-600"
                            onClick={()=>navigate("/managerOrders")}
                        >Orders</button>

                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                          
                        </div>
                        <button className="px-5 py-2 text-white rounded-full bg-red-600"
                        onClick={handleLogout}
                        >Logout</button>
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Product
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr
                                key={product._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                    <img className="w-20 h-20 object-cover	" src={product.image} alt="Jese image" />
                                    <div className="ps-3">
                                        <div className="text-base font-semibold">{product.name}</div>

                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    {product.quantity}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <div className="h-2.5 w-2.5 "></div> ${product.price}
                                    </div>
                                </td>
                                <td className="px-6 py-4 space-x-4">
                                    {/* <!-- Modal toggle --> */}
                                    <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => openEditModal(product._id)}>Edit</a>
                                    <a href="#" type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => deleteProduct(product._id)}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {isModalOpen && <AddProduct closeModal={closeModal} />}
                {isEditModalOpen && (
                    <UpdateProduct
                        productId={selectedProductId}
                        closeModal={() => {
                            setIsEditModalOpen(false);
                            setSelectedProductId(null);
                        }}
                    />
                )}
            </div>

        </div>
    )
}

export default ManagerDashboard