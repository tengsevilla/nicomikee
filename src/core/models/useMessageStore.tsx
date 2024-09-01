import { EVENT_ID } from '../../data/eventConfig';
import { generateGUIDV7 } from '../utils/utils';
import { fetchApi, config } from './index';

export interface IMessage {
    messageName: string
    messageContent: string
}

export const createMessage = async (data: IMessage) => {
    return await fetchApi(`${config.url}/message`, 'POST', { eventId: EVENT_ID, messageId: generateGUIDV7(), ...data });
};