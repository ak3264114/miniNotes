import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isLoggedIn } = useAuth();

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-gray-800">Mini<span className="text-blue-600">Notes</span></span>
                        </Link>
                    </div>


                    <div className="hidden md:flex items-center space-x-4">

                        {!isLoggedIn ? (
                            <div className="ml-4 flex items-center">
                                <Link href="/auth/login" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                    Login
                                </Link>
                                <Link href="/auth/signup" className="ml-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="ml-4 flex items-center">
                                <Link href="/dashboard" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                                    Dashboard
                                </Link>
                                <Link href="/auth/logout" className="ml-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>


                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 py-2">
                    <div className="container mx-auto px-4 space-y-1">

                        {!isLoggedIn ? (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link href="/auth/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                    Login
                                </Link>
                                <Link href="/auth/signup" className="block mt-2 px-4 py-2 bg-blue-600 text-white text-center text-base font-medium rounded-md hover:bg-blue-700">
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                                    Dashboard
                                </Link>
                                <Link href="/auth/logout" className="block mt-2 px-4 py-2 bg-blue-600 text-white text-center text-base font-medium rounded-md hover:bg-blue-700">
                                    Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;