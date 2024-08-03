import { getCookie } from "../utils/utils";

export enum ECookies {
    ACCESS_TOKEN = 'access_token',
}
/*
    @TOUPDATE
    DEV URL: http://localhost:3030
    PROD URL: https://kdautodb-edfcdbef7a78.herokuapp.com
*/
export const config = {
    url: 'http://localhost:3030',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
};

export const fetchApi = async (url: string, method: string, payload?: any): Promise<any> => {
    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...config.headers,
                'Authorization': `Bearer ${getCookie(ECookies.ACCESS_TOKEN) ?? ''}`,
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch API error:', error);
        throw error;
    }
};
