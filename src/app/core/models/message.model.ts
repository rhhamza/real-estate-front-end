import { Conversation } from "./conversation.model";
import { UserEntity } from "./user-entity.model";

export class Message {
    id?: number;
    content?: String;
    timestamp?: Date;
    sender: UserEntity | undefined;
    conversation?: Conversation;
}