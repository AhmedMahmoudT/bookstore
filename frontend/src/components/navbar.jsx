import { cart } from "../assets/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import useLogout from "../hooks/useLogout";
import Cart from "../components/cart";

export default function Navbar() {

    const [show, setShow] = useState(false);
    const { logout } = useLogout()
    const user = JSON.parse(localStorage.getItem('user'))

    const handleLogout = () => {
        logout()
    }

    return (
        <>
            <div className="dark:bg-gray-900">
                <div>
                    <div className="relative">
                        {/* For large screens */}
                        <div className="dark:bg-gray-900 bg-gray-50 px-6 py-6">
                            <div className="container mx-auto flex items-center justify-between">
                                <Link to="/" className="md:w-2/12 cursor-pointer text-gray-800 dark:text-white font-bold text-lg">
                                    Bookstore
                                </Link>
                                <ul className="w-8/12 flex items-center justify-center space-x-8">
                                    <li>
                                        <Link to="/" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/about" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                            About
                                        </Link>
                                    </li>
                                    {!user && <>
                                        <li>
                                            <Link to="/signup" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                Signup
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="login" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                                Login
                                            </Link>
                                        </li>
                                    </>}
                                </ul>
                                <div className="w-2/12 justify-end flex items-center space-x-4 xl:space-x-8">
                                    <div className="flex items-center space-x-4 xl:space-x-8">
                                        {user && <button onClick={handleLogout} aria-label="logout" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">Logout
                                        </button>}
                                        <button className="text-gray-800 dark:hover:text-gray-300 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800" onClick={() => setShow(!show)} >
                                            {cart}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {show&&<Cart Show={show} setShow={setShow}/>}
        </>
    );
}
