import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryParamStore, EQueryParams, IQueryParams } from '../models/useQueryParamsStore';

export function useSyncQueryParameters() {
    const location = useLocation();
    const navigate = useNavigate();
    const setParams = useQueryParamStore((state) => state.setParams);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const guest1 = queryParams.get(EQueryParams.guest1);
        const guest2 = queryParams.get(EQueryParams.guest2);
        const isPair = queryParams.get(EQueryParams.pair) === 'true';

        const newParams: IQueryParams = { guest1, guest2, isPair };
        setParams(newParams);
    }, [location.search, setParams, navigate]);
}
