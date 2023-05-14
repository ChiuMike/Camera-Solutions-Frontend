import { Common } from "../Api";

export type ILoginDto = {
    uuid: string;
    token: string;
    token_type: string;
    expires_at: string;
    refresh_token: string;
    refresh_expires_at: string;
}

export interface UserLoginResponse extends Common {
    data: ILoginDto;
}

export interface UserLogoutResponse extends Common {
    data: {};
}