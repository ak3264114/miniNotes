import { supabase } from "@/lib/supabaseClient";


interface SignupData {
    email: string;
    password: string;
    name: string;
    phone: string;
}

interface LoginParams {
    email: string;
    password: string;
}



export async function signupUser({ email, password, name, phone }: SignupData) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
                phone,
            },
        },
    });

    return { data, error };
}



export async function loginUser({ email, password }: LoginParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return { data, error };
}


export async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    console.log(session)
    return session;
}