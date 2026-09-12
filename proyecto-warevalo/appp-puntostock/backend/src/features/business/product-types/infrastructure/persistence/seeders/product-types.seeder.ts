import { Status } from '../../../../../../common/enums/status.enum';
import { ProductTypeModel } from '../models/product-type.model';

export async function seedProductTypes(): Promise<void> {
  const count = await ProductTypeModel.count();

  if (count > 0) {
    return;
  }

  await ProductTypeModel.bulkCreate([
    {
      name: 'Electrónica',
      description: 'Dispositivos electrónicos y accesorios',
      status: Status.ACTIVE,
    },
    {
      name: 'Ropa',
      description: 'Prendas de vestir y accesorios',
      status: Status.ACTIVE,
    },
    {
      name: 'Hogar',
      description: 'Productos para el hogar',
      status: Status.ACTIVE,
    },
  ]);
}
