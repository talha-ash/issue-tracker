import { useSupabase } from '#/lib/supabase/context';
import { useNavigate } from '@tanstack/react-router';

export const useLogout = () => {
  const { auth } = useSupabase();
  const navigation = useNavigate();
  const handleLogout = async () => {
    void navigation({ to: '/login' });
    await auth.signOut();
  };

  return { handleLogout };
};
