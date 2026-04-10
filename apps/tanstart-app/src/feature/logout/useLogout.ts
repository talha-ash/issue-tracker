import { useSupabase } from "@/lib/supabase/context";
import { redirect } from "@tanstack/react-router";



export const useLogout = () => {
    const { auth } = useSupabase();

    const handleLogout = async () => {
        await auth.signOut()
        redirect({ to: "/login" })
    }


    return { handleLogout }
}