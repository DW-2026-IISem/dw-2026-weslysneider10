import { SupplierModel } from '../models/supplier.model';
import { Status } from '../../../../../../common/enums/status.enum';

export async function seedSuppliers(): Promise<void> {
  const count = await SupplierModel.count();
  if (count > 0) {
    return;
  }

  await SupplierModel.bulkCreate([
    {
      nit: '900123456',
      businessName: 'Distribuidora La Guajira SAS',
      contactName: 'Carlos Ramírez',
      phone: '+57 300 1112233',
      email: 'ventas@distribuidoralaguajira.com',
      status: Status.ACTIVE,
    },
    {
      nit: '900654321',
      businessName: 'Comercializadora del Caribe SAS',
      contactName: 'Ana Mendoza',
      phone: '+57 310 4445566',
      email: 'contacto@comercializadoracaribe.com',
      status: Status.ACTIVE,
    },
  ]);
}
