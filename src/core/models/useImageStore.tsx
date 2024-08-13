import { EVENT_ID } from '../../data/eventConfig';
import { getCookie } from '../utils/utils';
import { fetchApi, config, ECookies } from './index';

export const uploadImageToS3 = async (formData: FormData) => {
    try {
        const response = await fetch(`${config.url}/s3/aws/post`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getCookie(ECookies.ACCESS_TOKEN) ?? ''}`,
            },
            body: formData,
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

export const fetchAllImageURL = async () => {
    return await fetchApi(`${config.url}/s3/aws/${EVENT_ID}`, 'GET');
};

export const deleteImageByFilename = async (fileName: string) => {
    return await fetchApi(`${config.url}/s3/aws/${fileName}`, 'DELETE');
};

// Add post to db behavior

export interface IS3ImageDB {
    eventId: string;
    fileName: string;
    fileSizeInMegabytes: Float32Array;
}

export const storeImageDataToDB = async (data: IS3ImageDB) => {
    return await fetchApi(`${config.url}/s3/db`, 'POST', { ...data, eventId: EVENT_ID });
};