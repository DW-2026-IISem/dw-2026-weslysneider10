import { Status } from '../../../../../common/enums/status.enum';
export interface BranchProps {
    id?: number;
    name: string;
    description?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class Branch {
    id?: number;
    name: string;
    description?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<BranchProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Branch;
    static reconstitute(props: BranchProps): Branch;
    update(props: Partial<Omit<BranchProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
}
