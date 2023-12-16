import  { useEffect, useState } from 'react';
import { useProduct } from '../context/ProductContext';

const UpdateProduct = ({ productId, closeModal }) => {
    const { fetchSingleProduct, updateProductQuantity } = useProduct();
    const [product, setProduct] = useState({
        
        quantity: '',

    });

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productData = await fetchSingleProduct(productId);
                setProduct({
                    quantity: productData.quantity,
                });
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, [productId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProductQuantity(productId, product.quantity);

        console.log('Product:', product);
        closeModal();
    };
    return (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeModal}></div>

            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
                <div className="flex justify-end">
                    <button
                        onClick={closeModal}
                        className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
                    >
                        X
                    </button>
                </div>

                <h1 className="text-2xl font-bold mb-4">Edit Quantity</h1>

                <form onSubmit={handleSubmit}>




                    <div className="mb-4">
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
                            Quantity:
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                            required
                        />
                    </div>


                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
