import { LuShoppingCart } from "react-icons/lu"
import { useCart } from "../context/CartContext"


const CartLogo = () => {
    const {cart}=useCart()


    return (
        <div>
            <li className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-white hover:text-gray-700">
                <a href="#" role="button" className="relative flex">
                    <LuShoppingCart className="flex-1 w-8 h-8 fill-current text-xs "/>
                    <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm leading-tight text-center">
                        {cart.length}
                    </span>
                </a>
            </li>
        </div>
    )
}

export default CartLogo