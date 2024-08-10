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

// Initial state
const initialState: IQueryParams = {
    guest1: null,
    guest2: null,
    isPair: false
};

// Store to handle the query params with typed state
export const useQueryParamStore = create<{ params: IQueryParams; setParams: (params: IQueryParams) => void }>((set) => ({
    params: initialState,
    setParams: (params: IQueryParams) => set({ params })
}));