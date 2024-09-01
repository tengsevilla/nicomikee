import { createStandaloneToast } from "@chakra-ui/react";
import moment from "moment";
import Cookies from 'js-cookie';
import { ECookies } from "../models";
const { toast } = createStandaloneToast()

export const Message = (status: 'success' | 'error' | 'warning' | 'info', text: string, duration: number = 3000) => {
    toast({
        description: text,
        status: status,
        duration: duration,
        isClosable: true,
        position: 'top'
    });
}

export const ParseToDisplayDate = (dateString: string) => {
    const formattedDate = moment(dateString).format('MMM DD, YYYY HH:mm');
    return formattedDate;
}

export function generateGUID(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString().substring(2);
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    const second = currentDate.getSeconds().toString().padStart(2, '0');
    const millisecond = currentDate.getMilliseconds().toString().padStart(3, '0');
    const guidPart = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    const uuidParts = guidPart.match(/.{1,4}/g);

    return `${year}${uuidParts?.[0]}-${month}${day}${uuidParts?.[1]}-${hour}${minute}${second}${uuidParts?.[2]}-${millisecond}${uuidParts?.[3]}`;
}

export function generateGUIDV7(): string {
    // random bytes
    const value = new Uint8Array(16);
    crypto.getRandomValues(value);

    // current timestamp in ms
    const timestamp = BigInt(Date.now());

    // timestamp
    value[0] = Number((timestamp >> 40n) & 0xffn);
    value[1] = Number((timestamp >> 32n) & 0xffn);
    value[2] = Number((timestamp >> 24n) & 0xffn);
    value[3] = Number((timestamp >> 16n) & 0xffn);
    value[4] = Number((timestamp >> 8n) & 0xffn);
    value[5] = Number(timestamp & 0xffn);

    // version and variant
    value[6] = (value[6] & 0x0f) | 0x70;
    value[8] = (value[8] & 0x3f) | 0x80;

    return Array.from(value)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}
export const setCookie = (name: ECookies, value: string, days: number) => {
    Cookies.set(name, value, { expires: days });
}

export const getCookie = (name: ECookies) => {
    return Cookies.get(name);
}