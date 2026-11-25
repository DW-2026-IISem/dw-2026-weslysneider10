import { Status } from '../../../../../common/enums/status.enum';
export interface ClientProps {
    id?: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Client {
    id?: number;
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    password?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ClientProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Client;
    static reconstitute(props: ClientProps): Client;
    update(props: Partial<Omit<ClientProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
}
