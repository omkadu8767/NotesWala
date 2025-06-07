import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Navbar = () => {
    // for avatar
    const [showDropdown, setShowDropdown] = useState(false);
    const [user, setUser] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    let location = useLocation()
    const host = import.meta.env.VITE_HOST;

    useEffect(() => {
        // Fetch user details if logged in
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch(`/api/auth/getuser`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'auth-token': token
                        }
                    });
                    const data = await response.json();
                    setUser(data);
                } catch (err) {
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };
        fetchUser();
    }, [location]);
    const handleAvatarClick = () => {
        setShowDropdown((prev) => !prev);
    };

    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/login');
        toast.success("Logout Successfully", { position: "top-right", autoClose: 2000 });
    }


    useEffect(() => {
    }, [location]);
    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white dark:bg-gray-900">
                            <img src="/NotesWala.png" className="h-6 w-14" alt="NotesWala Logo" />
                        </div>
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">NotesWala</span>
                    </Link>
                    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={() => setIsMenuOpen((prev) => !prev)}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === "/" ? "text-blue-700 font-semibold dark:text-blue-400" : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        }`} aria-current="page"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 ${location.pathname === "/about" ? "text-blue-700 font-semibold dark:text-blue-400"
                                        : "text-gray-900 dark:text-white hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        }`}
                                >
                                    About
                                </Link>
                            </li>

                        </ul>
                    </div>
                    {!localStorage.getItem('token') ? <form className='flex mx-2 gap-1'>
                        <Link type="button" to="/login" role='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
                        <Link type="button" to="/signup" role='button' className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">SignUp</Link>
                    </form> :
                        (
                            <div className="flex items-center gap-2 relative">
                                {/* Avatar */}
                                <button
                                    type="button"
                                    onClick={handleAvatarClick}
                                    className="focus:outline-none"
                                >
                                    <img
                                        src={`https://ui-avatars.com/api/?name=${user && user.name ? encodeURIComponent(user.name.slice(0, 2).toUpperCase()) : "US"}`}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full border-2 border-blue-700"
                                    />
                                </button>
                                {/* Dropdown */}
                                {showDropdown && user && (
                                    <div className="absolute right-16 top-10 z-50 w-64 bg-white rounded-lg shadow-lg p-4 dark:bg-gray-800">
                                        <div className="flex flex-col items-center">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=${user && user.name ? encodeURIComponent(user.name.slice(0, 2).toUpperCase()) : "US"}`}
                                                alt="avatar"
                                                className="w-12 h-12 rounded-full mb-2"
                                            />
                                            <h3 className="text-lg font-semibold dark:text-white">{user.name}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">{user.email}</p>
                                            <p className="text-xs text-gray-400 mt-2">Registered: {user.date ? new Date(user.date).toLocaleDateString() : ''}</p>
                                        </div>
                                    </div>
                                )}
                                {/* Logout Button */}
                                <button
                                    type="button"
                                    onClick={handleClick}
                                    role='button'
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                </div>
            </nav>


        </>
    )
}

export default Navbar



