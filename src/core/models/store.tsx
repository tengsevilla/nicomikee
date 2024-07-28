import { create } from 'zustand'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define the keys for query parameters as a type
export enum EQueryParams {
    guest1 = 'guest1',
    guest2 = 'guest2',
    pair = 'pair'
}

// Define the type for the query parameters
export interface IQueryParams {
    guest1: string | null;
    guest2: string | null;
    isPair: boolean;
}

// Store to handle the query params with typed state
export const useQueryParamStore = create<{ params: IQueryParams; setParams: (params: IQueryParams) => void }>((set) => ({
    params: {
        guest1: null,
        guest2: null,
        isPair: false
    },
    setParams: (params: IQueryParams) => set({ params })
}));

// Hook to sync URL changes with the store, typed with navigation function
export function useSyncQueryParams() {
    const location = useLocation();
    const setParams = useQueryParamStore((state) => state.setParams);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const guest1 = queryParams.get(EQueryParams.guest1);
        const guest2 = queryParams.get(EQueryParams.guest2);
        const isPair = queryParams.get(EQueryParams.pair) === 'true';

        setParams({ guest1, guest2, isPair });

        // Function to update URL parameters, demonstrating type-safe updates
        const updateUrlParams = () => {
            const searchParams = new URLSearchParams();
            if (guest1) searchParams.set(EQueryParams.guest1, guest1);
            if (guest2) searchParams.set(EQueryParams.guest2, guest2);
            searchParams.set(EQueryParams.pair, isPair ? 'true' : 'false');
            // navigate(`?${searchParams.toString()}`, { replace: true });
        };

        updateUrlParams();
    }, []);
}