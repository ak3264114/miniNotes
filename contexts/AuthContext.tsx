import { supabase } from '@/lib/supabaseClient';
import { checkSession, loginUser, signupUser } from '@/services/auth';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';


interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
}


interface AuthContextType {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (email: string, password: string, name: string, phone: string) => Promise<boolean>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoggedIn: false,
    isLoading: true,
    login: async () => false,
    signup: async () => false,
    logout: async () => { },
    refreshUser: async () => { },
});

interface AuthProviderProps {
    children: ReactNode;
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = async () => {
            setIsLoading(true);
            try {
                const session = await checkSession();
                if (session && session.user) {
                    setUser({
                        name: session.user.user_metadata?.name || '',
                        phone: session.user.user_metadata?.phone || '',
                        email: session.user.user_metadata?.email || '',
                        id: session.user.id || ''
                    });
                    setIsLoggedIn(true);
                    console.log('User is logged in:', session.user);
                }
            } catch (error) {
                console.error('Failed to initialize auth:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            const { data, error } = await loginUser({ email, password });
            if (error) {
                console.error('Login error:', error);
                toast.error(error.message);
                return false;
            }
            if (data && data.user) {
                setUser({
                    name: data.user.user_metadata?.name || '',
                    phone: data.user.user_metadata?.phone || '',
                    email: data.user.user_metadata?.email || '',
                    id: data.user.id || ''
                });
                toast.success('Login successful!');
                setIsLoggedIn(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (email: string, password: string, name: string, phone: string): Promise<boolean> => {
        try {
            setIsLoading(true);
            const { data, error } = await signupUser({ email, password, name, phone });
            if (error) {
                console.error('Signup error:', error);
                toast.error(error.message);
                return false;
            }
            if (data && data.user) {
                setUser(
                    {
                        name: data.user.user_metadata?.name || '',
                        phone: data.user.user_metadata?.phone || '',
                        email: data.user.user_metadata?.email || '',
                        id: data.user.id || ''
                    }
                )

                toast.success('Signup successful!');
                setIsLoggedIn(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Signup error:', error);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signOut();
            if (error) {
                toast.error(error.message);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUser = async (): Promise<void> => {
        try {
            const session = await checkSession();
            if (session && session.user) {
                setUser({
                    name: session.user.user_metadata?.name || '',
                    phone: session.user.user_metadata?.phone || '',
                    email: session.user.user_metadata?.email || '',
                    id: session.user.id || ''
                });
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error('Failed to refresh user:', error);
            setUser(null);
            setIsLoggedIn(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoggedIn,
                isLoading,
                login,
                signup,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
