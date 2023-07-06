import { Message } from "./message.model";
import { UserEntity } from "./user-entity.model";

export interface Conversation {
    id?: number,
    name?: String,
    participants?: UserEntity[],
    messages?: Message []

}