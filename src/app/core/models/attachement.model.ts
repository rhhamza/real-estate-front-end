import { Message } from "./message.model";

export interface Attachement {
    id?: number,
    name?: string,
    type?: string,
    data?: ArrayBuffer,
    message?: Message

}