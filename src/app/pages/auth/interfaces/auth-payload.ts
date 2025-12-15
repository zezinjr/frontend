import {User} from "./user";

export interface AuthPayload {
    user_id: number;
    username: string;
    user: User;
    exp: number;
    orig_iat: number;
}