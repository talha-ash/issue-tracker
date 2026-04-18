'use client';

import { createContext, useContext, useState } from 'react';
import { createClientSupabaseClient } from './client';

type SupabaseClient = ReturnType<typeof createClientSupabaseClient>;

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({ children }: { children: React.ReactNode }) {
  const [supabase] = useState(() => createClientSupabaseClient());
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export function useSupabase() {
  const client = useContext(SupabaseContext);
  if (!client)
    throw new Error('useSupabase must be used within SupabaseProvider');
  return client;
}
