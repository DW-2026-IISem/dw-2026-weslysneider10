import { Inject, Injectable } from '@nestjs/common';
import { RETURN_REPOSITORY, type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class ListReturnsBySaleUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly returnRepository: IReturnRepository,
  ) {}

  async execute(saleId: number) {
    const returns = await this.returnRepository.findBySaleId(saleId);
    return returns.map((r) => ReturnMapper.toResponse(r));
  }
}
