import { UserEntity } from "./user-entity.model";

export interface Notification {
    id?: number,
    content?: String,
    timestamp?: Date,
    isread?: Boolean,
    recipient?: UserEntity
}