import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const { user, isLoggedIn } = useAuth();
  console.log(user)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">Mini</span> AI-Powered Notes
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Your personal AI assistant for organizing thoughts, summaries, and ideas. Take notes smarter, not harder.
          </p>

          {isLoggedIn && user ? (
            <div className='grid gap-2 text-center items-center justify-center'>
              <div className="text-2xl font-semibold text-blue-600">
                Welcome, {user.name}!
              </div>
              <Link
                href="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <Link
                href="/auth/login"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </Link>
              <Link
                href="/auth/signup"
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md border border-blue-200 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Features Section */}
        <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center w-full max-w-5xl">
          {/* Feature Card 1 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Insights</h3>
            <p className="text-gray-600">Get intelligent summaries and organization suggestions for your notes.</p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Easy Organization</h3>
            <p className="text-gray-600">Create, edit, and organize your notes with intuitive tools.</p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex-1">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Storage</h3>
            <p className="text-gray-600">Your notes are encrypted and securely stored in the cloud.</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-6 text-center text-gray-500">
        <p>© 2025 Mini AI Notes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
