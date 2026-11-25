export interface ProductProps {
    id?: number;
    sku: string;
    name: string;
    description?: string;
    price: number;
    quantity?: number;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
type CreatableProductProps = Omit<ProductProps, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;
type UpdatableProductProps = Partial<CreatableProductProps>;
export declare class Product {
    id?: number;
    sku: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    private constructor();
    static create(props: CreatableProductProps): Product;
    static reconstitute(props: ProductProps): Product;
    update(props: UpdatableProductProps): void;
    deactivate(): void;
    activate(): void;
}
export {};
