import { useSelector } from "react-redux"
import Book from "./book"
import { empty } from "../assets/icons";
import { emptyCart } from "../features/reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart(props) {
    const { Show, setShow } = props
    const userLogged = JSON.parse(localStorage.getItem("user"))
    const cart = useSelector(state => state.cart.orders)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleCheckout = () => {
        if (cart.length) {
            setShow(!Show)
            navigate(userLogged ? "/checkout" : "/login")
        }
    }

    const shipping = 30
    const subtotal = cart.reduce((total, order) => total + order.totalPrice, 0);
    const total = subtotal ? (subtotal + shipping).toFixed(2) : 0;

    return (
        <div className="in-front">
            <div className="w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0" id="chec-div">
                <div className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">
                    <div className="flex md:flex-row flex-col justify-end" id="cart">
                        <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen relative" id="scroll">
                            <div className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer" aria-label="back" onClick={() => setShow(!Show)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <polyline points="15 6 9 12 15 18" />
                                </svg>
                                <p className="text-sm pl-2 leading-none">Back</p>
                            </div>
                            <div className="flex relative">
                                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Cart</p> <button onClick={() => dispatch(emptyCart())} className="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 absolute px-4 rounded end-0 mt-5">
                                    Empty Cart
                                </button>
                            </div>
                            {cart.length ? cart.map((order, key) => { return <Book key={key} order={order} /> }) : <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 justify-center items-center">
                                {empty}
                                <p className="text-3xl mt-2 text-gray-800">The cart is empty...</p>
                            </div>}
                        </div>
                        <div className="xlW-1/2 md:w-1/3 xlW-1/4 w-full bg-gray-100 h-full">
                            <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                <div>
                                    <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                    <div className="flex items-center justify-between pt-16">
                                        <p className="text-base leading-none text-gray-800">Subtotal</p>
                                        <p className="text-base leading-none text-gray-800">${subtotal.toFixed(2)}</p>
                                    </div>
                                    {cart[0] && (<div className="flex items-center justify-between pt-5">
                                        <p className="text-base leading-none text-gray-800">Shipping</p>
                                        <p className="text-base leading-none text-gray-800">${shipping}</p>
                                    </div>)}
                                </div>
                                <div>
                                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                        <p className="text-2xl leading-normal text-gray-800">Total</p>
                                        <p className="text-2xl font-bold leading-normal text-right text-gray-800">${total}</p>
                                    </div>
                                    <button onClick={() => handleCheckout()} className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white">
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Cart;