import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';

const AddProduct = ({ showModal, closeModal }) => {
  const {addProduct}= useProduct()
  const [product, setProduct] = useState({
    name: '',
    image:'',
    weight:' ',
    description: '',
    quantity: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(product.name, product.image, product.description, product.weight, product.quantity, product.price);

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

        <h1 className="text-2xl font-bold mb-4">Add Product</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600">
              Image:
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-600">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              rows="3"
              required
            ></textarea>
          </div>

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

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Weight:
            </label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={product.weight}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-600">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
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

export default AddProduct;
