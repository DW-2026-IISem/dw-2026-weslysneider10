import { Inject, Injectable } from '@nestjs/common';
import { RETURN_REPOSITORY, type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnFilterDto } from '../dto/return-filter.dto';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class ListReturnsUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly returnRepository: IReturnRepository,
  ) {}

  async execute(filter: ReturnFilterDto) {
    const result = await this.returnRepository.findAll(filter);

    return {
      items: result.items.map((r) => ReturnMapper.toResponse(r)),
      meta: result.meta,
    };
  }
}
