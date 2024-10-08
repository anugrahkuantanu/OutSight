'use server';

import createSupabaseServerClient from "@/lib/supabase/server";

export default async function readUserSession(){
    const supabase = await createSupabaseServerClient();

    return supabase.auth.getSession();
    // return supabase.auth.getUser()
}


export async function getCurrentUser() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token || null;
    return { user, token };
} 


