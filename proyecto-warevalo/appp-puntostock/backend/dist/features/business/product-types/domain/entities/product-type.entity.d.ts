import { Status } from '../../../../../common/enums/status.enum';
export interface ProductTypeProps {
    id?: number;
    name: string;
    description?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare class ProductType {
    id?: number;
    name: string;
    description?: string;
    status: Status;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: Omit<ProductTypeProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>): ProductType;
    static reconstitute(props: ProductTypeProps): ProductType;
    update(props: Partial<Omit<ProductTypeProps, 'id' | 'status' | 'createdAt' | 'updatedAt'>>): void;
    deactivate(): void;
}
