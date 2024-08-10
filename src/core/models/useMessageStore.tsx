import { EVENT_ID } from '../../data/eventConfig';
import { generateGUID } from '../utils/utils';
import { fetchApi, config } from './index';

export interface IMessage {
    messageName: string
    messageContent: string
}

export const createMessage = async (data: IMessage) => {
    return await fetchApi(`${config.url}/message`, 'POST', { eventId: EVENT_ID, messageId: generateGUID(), ...data });
};