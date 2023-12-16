import { useCart } from "../context/CartContext";
import { truncateParagraph } from "../utils/helper";


const Card = ({ product }) => {
  const { addToCart } = useCart()
  const { image, name, description, price, weight, _id } = product;

  const userId = JSON.parse(localStorage.getItem("user"));
  const quantity = 1;


  return (

    <div className="w-full relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl ">
      <div
        className="relative w-100 h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={image}
          width="100%"
          alt="card-image" />
      </div>
      <div className="p-6">
        <div className="flex justify-between">
          <h5 className="block mb-2 font-sans text-xl as-bold capitalize antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {name}
          </h5>
          <h5 className="block border p-1 rounded bg-purple-500 text-white mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Price  ${price}
          </h5>

          <h5 className="block border p-1 rounded bg-cyan-500		 text-white mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Weight  ${weight}
          </h5>

        </div>
        <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
          {truncateParagraph(description)}
        </p>
      </div>

      <div className="p-6 pt-0 gap-4 flex justify-center" >
        <button
          className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-orange-600 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={() => addToCart({ productId: _id, quantity, userId })}
        >
          Add To Cart
        </button>


      </div>

    </div>


  )
}

export default Card