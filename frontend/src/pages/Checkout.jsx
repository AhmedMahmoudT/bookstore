import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
    const [checked, setChecked] = useState(true);
    const [order, setOrder] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalButtonText, setModalButtonText] = useState('');
    const cart = useSelector(state => state.cart.orders);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cart.length) {
            navigate("/");
        }
    }, []);

    const shipping = 30;
    const subtotal = cart.reduce((total, order) => total + order.totalPrice, 0);
    const total = (subtotal + shipping).toFixed(2);
    const books = cart.map(order => { return { book_id: order._id, quantity: order.quantity, price: order.book.price } });
    const total_price = parseFloat(total);
    const user = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedOrder = {
            ...order,
            books,
            total_price,
            userEmail: user.email,
            shippingMethod: checked ? 'FedEx Delivery' : 'UPS Ground',
        };

        await axios.post('http://localhost:4000/api/order/', updatedOrder);
        localStorage.removeItem('orders');

        setShowModal(true);
        setModalButtonText('OK');
    };
    return (
        <form className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-20" onSubmit={handleSubmit}>
            <div className="px-4 pt-8">
                <p className="text-xl font-medium">Order Summary</p>
                <p className="text-gray-400">Check your books. And select a suitable shipping method.</p>
                <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                    {cart.map((order, key) => (
                        <div key={key} className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <img className="m-2 h-32 border object-cover object-center" src={order.book.coverImage} alt="" />
                            <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold">{order.book.title}</span>
                                <span className="float-right text-gray-400">{order.book.author}</span>
                                <p className="text-lg font-bold">${order.book.price} x {order.quantity}</p>
                            </div>
                        </div>))}
                </div>

                <p className="mt-8 text-lg font-medium">Shipping Methods</p>
                <div className="mt-5 grid gap-6">
                    <div className="relative">
                        <input onChange={(e) => setChecked(!checked)} className="peer hidden" id="radio_1" type="radio" name="radio" checked={checked} />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                            <div className="ml-5">
                                <span className="mt-2 font-semibold">Fedex Delivery</span>
                                <p className="text-slate-500 text-sm leading-6">Delivery: 2-4 Days</p>
                            </div>
                        </label>
                    </div>
                    <div className="relative">
                        <input onChange={(e) => setChecked(!checked)} className="peer hidden" id="radio_2" type="radio" name="radio" checked={!checked} />
                        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                            <div className="ml-5">
                                <span className="mt-2 font-semibold">UPS Ground</span>
                                <p className="text-slate-500 text-sm leading-6">Delivery: 3-5 Days</p>
                            </div>
                        </label>
                    </div>

                </div>
            </div>
            <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                <p className="text-xl font-medium">Payment Details</p>
                <p className="text-gray-400">Complete your order by providing your payment details.</p>
                <div className="">
                    <label htmlFor="cardNumber" className="mt-4 mb-2 block text-sm font-medium">Card Details</label>
                    <div className="flex">
                        <div className="relative w-7/12 flex-shrink-0">
                            <input type="text" name="cardNumber" className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="xxxx-xxxx-xxxx-xxxx" onChange={handleChange} />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                                </svg>
                            </div>
                        </div>
                        <input type="text" name="creditExpiry" className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="MM/YY" onChange={handleChange} />
                        <input type="text" name="creditCvc" className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="CVC" onChange={handleChange} />
                    </div>
                    <label htmlFor="billingAddress" className="mt-4 mb-2 block text-sm font-medium">Billing Address</label>
                    <div className="flex flex-col sm:flex-row">
                        <div className="relative flex-shrink-0 sm:w-7/12">
                            <input type="text" name="billingAddress" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Address Line 1" onChange={handleChange} />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                <img className="h-4 w-4 object-contain" src="https://flagcdn.com/ma.svg" alt="" />
                            </div>
                        </div>
                        <select type="text" name="billingRegion" className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" onChange={handleChange}>
                            <option>Region</option>
                            <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
                            <option value="L'Oriental">L'Oriental</option>
                            <option value="Fès-Meknès">Fès-Meknès</option>
                            <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
                            <option value="Béni Mellal-Khénifra">Béni Mellal-Khénifra</option>
                            <option value="Casablanca-Settat">Casablanca-Settat</option>
                            <option value="Marrakesh-Safi">Marrakesh-Safi</option>
                            <option value="Drâa-Tafilalet">Drâa-Tafilalet</option>
                            <option value="Souss-Massa">Souss-Massa</option>
                            <option value="Guelmim-Oued Noun">Guelmim-Oued Noun</option>
                            <option value="Laâyoune-Sakia El Hamra">Laâyoune-Sakia El Hamra</option>
                            <option value="Dakhla-Oued Ed-Dahab">Dakhla-Oued Ed-Dahab</option>
                        </select>
                        <input type="number" name="billingZip" className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="ZIP Code" onChange={handleChange} />
                    </div>

                    <div className="mt-6 border-t border-b py-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Subtotal</p>
                            <p className="font-semibold text-gray-900">${subtotal}</p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Shipping</p>
                            <p className="font-semibold text-gray-900">${shipping}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">Total</p>
                        <p className="text-2xl font-semibold text-gray-900">${total}</p>
                    </div>
                </div>
                <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
            </div>
            {showModal && (
                <form className="fixed inset-0 flex items-center justify-center z-10" action="/">
                    <div className="bg-white w-96 p-8 rounded-lg shadow-lg">
                        <p className="text-xl font-medium mb-4">Order Sent</p>
                        <p>Your order has been sent successfully.</p>
                        <button className="mt-4 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                            {modalButtonText}
                        </button>
                    </div>
                </form>
            )}
        </form>
    );
};

export default Checkout;