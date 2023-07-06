import { Conversation } from "./conversation.model";
import { UserEntity } from "./user-entity.model";

export interface Message {
    id?: number,
    content?: String,
    timestamp?: Date,
    sender?: UserEntity,
    conversation?: Conversation
}