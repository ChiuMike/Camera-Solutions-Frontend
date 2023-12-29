import { Common } from "../Api";

export type IUserDto = {
    uuid: string;
    username: string;
    email: string;
    role: string;
    updated_at: string;
    created_at: string;
}

export type IAddUsersDto = {
    id: number;
    uuid: string;
}

export type UserDetailDto = {
    uuid: string;
    username: string;
    email: string;
    updated_at: string;
    created_at: string;
}

export interface ReadUsersResponse extends Common {
    data: IUserDto[];
}

export interface AddUserResponse extends Common {
    data: IAddUsersDto;
}


export interface ReadUserDetailResponse extends Common {
    data: UserDetailDto;
}