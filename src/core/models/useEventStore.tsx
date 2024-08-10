import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { fetchApi, config } from './index';

export interface IEvent {
    eventId: string;
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventOwner: string;
    eventOwnerContact: string;
    eventOwnerEmail: string;
}

export interface EventState {
    event: Event | null;
    setEvent: (event: Event) => void;
}

export const useEventStore = create<EventState>()(
    devtools(
        persist((set) => ({
            event: null,
            setEvent: (event) => set({ event })
        }), {
            name: 'event-storage', // unique name for persist storage
        })
    )
);

export const createEvent = async (event: Event) => {
    return await fetchApi(`${config.url}/event`, 'POST', event);
};

export const fetchEvent = async (eventId: string) => {
    return await fetchApi(`${config.url}/event/${eventId}`, 'GET');
};