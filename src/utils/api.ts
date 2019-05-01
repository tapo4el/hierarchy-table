import { UserResponse } from '../types';

export interface UserAPI {
    (): Promise<UserResponse[]>;
}

export default async function getUsers(): Promise<UserResponse[]> {
    const response = await fetch('/data', { method: 'GET' });
    return response.json();
}
