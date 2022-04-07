export interface IUser {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    external?: {
        id?: string;
    };
    friend: string;
    child: number;
}
