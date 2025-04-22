import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Loading from '@/components/Loading';


const queryClient = new QueryClient();



function MyApp({ Component, pageProps }: AppProps) {



  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <Loading />
        <Toaster />
        <Component {...pageProps} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;