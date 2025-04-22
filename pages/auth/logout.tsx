import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Logout() {
  const router = useRouter();
  const { logout } = useAuth();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const performLogout = async () => {
      await logout();
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    };
    
    performLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
 
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Logged Out Successfully</h1>
          
          <p className="text-lg text-gray-600 mb-6">
            Thank you for using Mini AI Notes! You have been logged out of your account.
          </p>
          
          <div className="mb-8 p-4 bg-blue-50 rounded-lg text-blue-700">
            Redirecting to home page in <span className="font-semibold">{countdown}</span> seconds...
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link href="/auth/login" className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Login Again
            </Link>
            <Link href="/" className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md border border-blue-200 hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Go Home Now
            </Link>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 max-w-md w-full bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Session Information
          </h3>
          <p className="text-gray-600 text-sm">
            Your session has been terminated and all temporary data has been cleared from this browser. 
            For security reasons, we recommend closing this browser window.
          </p>
        </div>
      </div>
      
      <footer className="mt-20 py-6 text-center text-gray-500">
        <p>© 2025 Mini AI Notes. All rights reserved.</p>
      </footer>
    </div>
  );
}