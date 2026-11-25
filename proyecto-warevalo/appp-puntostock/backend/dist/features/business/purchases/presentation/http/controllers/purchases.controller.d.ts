import { CreatePurchaseDto } from '../../../application/dto/create-purchase.dto';
import { PurchaseFilterDto } from '../../../application/dto/purchase-filter.dto';
import { PurchaseResponseDto } from '../../../application/dto/purchase-response.dto';
import { ReceivePurchaseDto } from '../../../application/dto/receive-purchase.dto';
import { CreatePurchaseUseCase } from '../../../application/use-cases/create-purchase.use-case';
import { ReceivePurchaseUseCase } from '../../../application/use-cases/receive-purchase.use-case';
import { CancelPurchaseUseCase } from '../../../application/use-cases/cancel-purchase.use-case';
import { GetPurchaseUseCase } from '../../../application/use-cases/get-purchase.use-case';
import { ListPurchasesUseCase } from '../../../application/use-cases/list-purchases.use-case';
export declare class PurchasesController {
    private readonly createPurchaseUseCase;
    private readonly receivePurchaseUseCase;
    private readonly cancelPurchaseUseCase;
    private readonly getPurchaseUseCase;
    private readonly listPurchasesUseCase;
    constructor(createPurchaseUseCase: CreatePurchaseUseCase, receivePurchaseUseCase: ReceivePurchaseUseCase, cancelPurchaseUseCase: CancelPurchaseUseCase, getPurchaseUseCase: GetPurchaseUseCase, listPurchasesUseCase: ListPurchasesUseCase);
    create(dto: CreatePurchaseDto): Promise<PurchaseResponseDto>;
    findAll(filter: PurchaseFilterDto): Promise<{
        items: PurchaseResponseDto[];
        meta: import("../../../../../../common/interfaces/pagination.interface").PaginationMeta;
    }>;
    findOne(id: number): Promise<PurchaseResponseDto>;
    receive(id: number, dto: ReceivePurchaseDto): Promise<PurchaseResponseDto>;
    cancel(id: number): Promise<PurchaseResponseDto>;
}
