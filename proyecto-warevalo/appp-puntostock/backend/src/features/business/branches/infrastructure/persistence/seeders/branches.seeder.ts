import { BranchModel } from '../models/branch.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedBranches(): Promise<void> {
  const count = await BranchModel.count();
  if (count > 0) {
    return;
  }

  await BranchModel.bulkCreate([
    {
      name: 'Sucursal Centro',
      description: 'Sede principal',
      status: Status.ACTIVE,
    },
    {
      name: 'Sucursal Norte',
      description: 'Sede secundaria',
      status: Status.ACTIVE,
    },
  ]);
}
