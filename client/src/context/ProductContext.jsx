
import { createContext, useContext, useReducer } from 'react';
import { BASE_URL } from '../App';


const initialState = {
  products: [],
  allOders: []
};


const ProductContext = createContext();
const token = localStorage.getItem('token');
const userId = JSON.parse(localStorage.getItem("user"));

// Create the provider component
const ProductProvider = ({ children }) => {
  const productReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS':
        return { ...state, products: action.payload };

      case 'FETCH_ALL_ORDERS':
        return { ...state, allOders: action.payload };

      case 'UPDATE_ORDER_STATUS':
        return {
          ...state,
          allOders: state.allOders.map((order) =>
            order._id === action.payload.orderId
              ? { ...order, status: action.payload.status }
              : order
          ),
        };

      default:
        return state;
    }
  };
  console.log(BASE_URL, "base")

  const [state, dispatch] = useReducer(productReducer, initialState);


  //FETCH ALL
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/manager/getproducts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }
      const products = await response.json();
      //   console.log(products, "PRODUCTS")
      dispatch({ type: 'FETCH_PRODUCTS', payload: products });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };



  //FETCH SINGLE PRODUCT
  const fetchSingleProduct = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/manager/singleProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.status}`);
      }
      const product = await response.json();
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };


  const addProduct = async (name, image, description, weight, quantity, price) => {
    // console.log(name, image, description, weight, quantity, price, "PRODUCTS ADDED");
    try {
      const response = await fetch(`${BASE_URL}/manager/addProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          image,
          description,
          weight,
          quantity,
          price,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add product: ${response.status}`);
      }

      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


  const updateProductQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch(`${BASE_URL}/manager/updateProductQuantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update product quantity: ${response.status}`);
      }

      fetchProducts();
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const deleteProduct = async (productId) => {
    console.log(productId, "PRODUCTID")
    try {
      const response = await fetch(`${BASE_URL}/manager/deleteProduct`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.status}`);
      }

      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  //FETCH ALL ORDERS
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/manager/orders/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user orders: ${response.status}`);
      }

      const allOrders = await response.json(); // Corrected the variable name
      console.log(allOrders, "All ODERSSSS");
      dispatch({ type: 'FETCH_ALL_ORDERS', payload: allOrders }); // Corrected the type
    } catch (error) {
      console.error('Error fetching user orders:', error);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    console.log(orderId, status , "FROM ORDS")
    try {
      const response = await fetch(`${BASE_URL}/manager/orders/updateStatus`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({orderId,status }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update order status: ${response.status}`);
      }

      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: { orderId, status },
      });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  return (
    <ProductContext.Provider value={{
      products: state.products,
      allOders: state.allOders,
      fetchProducts,
      fetchSingleProduct,
      addProduct,
      updateProductQuantity,
      deleteProduct,
      fetchAllOrders ,
      updateOrderStatus
    }}>
      {children}
    </ProductContext.Provider>
  );
};

const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

export { ProductProvider, useProduct };
