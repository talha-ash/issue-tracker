import { useSupabase } from "@/lib/supabase/context";
import { redirect } from "next/navigation";



export const useLogout = () => {
    const { auth } = useSupabase();

    const handleLogout = async () => {
        await auth.signOut()
        redirect('/login')
    }


    return { handleLogout }
}