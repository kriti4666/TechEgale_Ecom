
import { createContext, useReducer, useContext } from 'react';
import { BASE_URL } from '../App';


const initialState = {
  cart: [],
  totalPrice: 0,
  userOrders :[]
};


const CartContext = createContext();
const token = localStorage.getItem('token');
const userId = JSON.parse(localStorage.getItem("user"));


const CartProvider = ({ children }) => {


  const calculateTotal = (cart) => {
    return cart.reduce((total, item) => {
      if (item.productId && item.productId.price) {
        return total + item.productId.price * item.quantity;
      }
      return total;
    }, 0);
  };


  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_CART_DATA':
        return { ...state, cart: action.payload };

      case 'ADD_TO_CART': {
        const existingItemIndex = state.cart.findIndex(
          (item) => item.productId._id === action.payload.productId._id
        );

        if (existingItemIndex !== -1) {

          const updatedCart = [...state.cart];
          updatedCart[existingItemIndex].quantity += action.payload.quantity;
          return { ...state, cart: updatedCart, totalPrice: calculateTotal(updatedCart) };
        } else {
          return { ...state, cart: [...state.cart, action.payload], totalPrice: calculateTotal([...state.cart, action.payload]) };
        }
      }
      case 'UPDATE_CART_ITEM':
        return state;
      case 'UPDATE_TOTAL_PRICE':
        console.log('Updating total price:', action.payload);
        return { ...state, totalPrice: action.payload };

        case 'FETCH_USER_ORDERS':
      return { ...state, userOrders: action.payload };
      case 'CLEAR_CART':
        return { ...state, cart: [], totalPrice: 0 };
      default:
        return state;
    }
  };




  const [state, dispatch] = useReducer(cartReducer, initialState);



  // ADD TO CART
  const addToCart = async (item) => {
    try {
      dispatch({ type: 'ADD_TO_CART', payload: item });
      await fetch(`${BASE_URL}/customer/addToCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(item),
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // GET CART DATA
  const getCartData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customer/userCart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user cart: ${response.status}`);
      }

      const cartData = await response.json();
      dispatch({ type: 'FETCH_CART_DATA', payload: cartData });


      const updatedTotalPrice = calculateTotal(cartData);
      dispatch({ type: 'UPDATE_TOTAL_PRICE', payload: updatedTotalPrice });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  // UPDATE CART
  const updateCartItem = async (item) => {
    try {

      const { userId, productId, quantity } = item;

  
      dispatch({ type: 'UPDATE_CART_ITEM', payload: item });


      await fetch(`${BASE_URL}/customer/updateCartItem`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });

      getCartData()

      const updatedTotalPrice = calculateTotal(state.cart);
      dispatch({ type: 'UPDATE_TOTAL_PRICE', payload: updatedTotalPrice });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

   // PLACE ORDER
   const placeOrder = async () => {
    try {
      const response = await fetch(`${BASE_URL}/customer/placeOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to place order: ${response.status}`);
      }

      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'UPDATE_TOTAL_PRICE', payload: 0 });
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

    // FETCH USER ORDERS
    const fetchUserOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch user orders: ${response.status}`);
        }
  
        const userOrders = await response.json();
        // console.log(userOrders, "USERS ODERSSSS")
        dispatch({ type: 'FETCH_USER_ORDERS', payload: userOrders });
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };
  
    //FETCH ALL ORDERS
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/customer/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });
  
        if (!response.ok) {
          throw new Error(`Failed to fetch user orders: ${response.status}`);
        }
  
        const userOrders = await response.json();
        // console.log(userOrders, "USERS ODERSSSS")
        dispatch({ type: 'FETCH_USER_ORDERS', payload: userOrders });
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

  // CLEAR CART
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };


  console.log(state.userOrders, "USER ORDERSS")



  return (
    <CartContext.Provider value={{ cart: state.cart, totalPrice: state.totalPrice, userOrder: state.userOrders, addToCart, updateCartItem, clearCart, getCartData,placeOrder,fetchUserOrders }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
