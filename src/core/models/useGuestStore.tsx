import { EVENT_ID } from '../../data/eventConfig';
import { generateGUID } from '../utils/utils';
import { fetchApi, config } from './index';

export interface IGuest {
    rsvpGuest: string,
    rsvpContact: string
    rsvpAttending: string,
    rsvpNumOfAttendees: number | '',
}

export const createRSVP = async (data: IGuest) => {
    return await fetchApi(`${config.url}/rsvp`, 'POST', { eventId: EVENT_ID, rsvpId: generateGUID(), ...data });
};