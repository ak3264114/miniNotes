import Link from "next/link";



export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                
                    <div className="mb-8 flex justify-center">
                        <div className="relative">
                            <div className="text-9xl font-bold text-gray-200">404</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    className="h-32 w-32 text-blue-600"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h1>

                    <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <Link href="/" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Go Home
                        </Link>
                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md border border-blue-200 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Additional Help Section */}
                <div className="mt-10 max-w-lg w-full bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        Looking for something?
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/" className="hover:text-blue-600 transition-colors">
                                Return to the home page
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/features" className="hover:text-blue-600 transition-colors">
                                Check out our features
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/contact" className="hover:text-blue-600 transition-colors">
                                Contact support
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <footer className="mt-20 py-6 text-center text-gray-500">
                <p>© 2025 Mini AI Notes. All rights reserved.</p>
            </footer>
        </div>
    );
}