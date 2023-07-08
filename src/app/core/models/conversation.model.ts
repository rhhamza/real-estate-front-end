import { Message } from "./message.model";
import { UserEntity } from "./user-entity.model";

export class Conversation {
    id?: number;
    name?: String;
    participants?: UserEntity[];
    messages?: Message [];

}