import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";



const Cart = () => {
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem("user"));
  const taxMoney = 1.99

  const { cart, updateCartItem, clearCart, getCartData, totalPrice,placeOrder } = useCart();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      await getCartData();
      setLoading(false);
    };

    fetchData();
  }, []);


  console.log(cart.length, "CART")

  const handleCheckout=()=>{
    placeOrder()
    navigate('/paymentSuccess')
  }


  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { productId: item.productId._id, quantity: item.quantity - 1, userId };
      updateCartItem(updatedItem);
    }
  };

  const handleIncrease = (item) => {
    const updatedItem = { productId: item.productId._id, quantity: item.quantity + 1, userId };
    updateCartItem(updatedItem);
  };


  return (

    <div>
      <div className="bg-gray-100 h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          {loading ? (
            <p>Loading...</p>
          ) : cart && cart.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-left font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.map((item) => (
                        <tr key={item._id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              <img
                                className="h-16 w-16 mr-4 object-cover	"
                                src={item.productId.image}
                                alt={item.productId.name}
                              />
                              <span className="font-semibold">{item.productId.name}</span>
                            </div>
                          </td>
                          <td className="py-4">${item.productId.price}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <button
                                className="border rounded-md py-2 px-4 mr-2"
                                onClick={() => handleDecrease(item)}
                              >-</button>
                              <span className="text-center w-8">{item.quantity}</span>
                              <button className="border rounded-md py-2 px-4 ml-2"
                                onClick={() => handleIncrease(item)}
                              >+</button>
                            </div>
                          </td>
                          <td className="py-4">${item.productId.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${totalPrice}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Taxes</span>
                    <span>${taxMoney}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">${totalPrice + taxMoney}</span>
                  </div>
                  <button 
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                  onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>) : (<p >No Product Available in Cart </p>)
          }

        </div>
      </div>
    </div>
  );
};

export default Cart;
