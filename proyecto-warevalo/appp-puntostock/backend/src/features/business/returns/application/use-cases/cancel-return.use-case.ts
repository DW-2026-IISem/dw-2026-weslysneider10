import { Inject, Injectable } from '@nestjs/common';
import { PRODUCT_REPOSITORY, type IProductRepository } from '../../../products/domain/interfaces/product-repository.interface';
import { ReturnStatus } from '../../domain/enums/return-status.enum';
import { ReturnNotFoundException } from '../../domain/exceptions/return-not-found.exception';
import { RETURN_REPOSITORY, type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class CancelReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly returnRepository: IReturnRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: number) {
    const returnEntity = await this.returnRepository.findById(id);
    if (!returnEntity) {
      throw new ReturnNotFoundException(id);
    }

    if (returnEntity.status === ReturnStatus.CANCELLED) {
      return ReturnMapper.toResponse(returnEntity);
    }

    for (const line of returnEntity.lines) {
      const product = await this.productRepository.findById(line.productId);
      if (product) {
        product.update({ quantity: product.quantity - line.quantity });
        await this.productRepository.update(product);
      }
    }

    returnEntity.cancel();
    const updated = await this.returnRepository.update(returnEntity);
    return ReturnMapper.toResponse(updated);
  }
}
