import { Inject, Injectable } from '@nestjs/common';
import { ReturnNotFoundException } from '../../domain/exceptions/return-not-found.exception';
import { RETURN_REPOSITORY, type IReturnRepository } from '../../domain/interfaces/return-repository.interface';
import { ReturnMapper } from '../mappers/return.mapper';

@Injectable()
export class GetReturnUseCase {
  constructor(
    @Inject(RETURN_REPOSITORY)
    private readonly returnRepository: IReturnRepository,
  ) {}

  async execute(id: number) {
    const returnEntity = await this.returnRepository.findById(id);
    if (!returnEntity) {
      throw new ReturnNotFoundException(id);
    }

    return ReturnMapper.toResponse(returnEntity);
  }
}
