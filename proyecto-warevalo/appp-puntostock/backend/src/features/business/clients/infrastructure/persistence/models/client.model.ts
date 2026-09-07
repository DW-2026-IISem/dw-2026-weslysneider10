import {
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'clientes', timestamps: true })
export class ClientModel extends Model {
  @Column({ type: DataType.STRING(10), allowNull: false, field: 'tipo_documento' })
  tipoDocumento: string;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
    unique: true,
    field: 'numero_documento',
  })
  numeroDocumento: string;

  @Column({ type: DataType.STRING(150), allowNull: false })
  nombre: string;

  @Column({ type: DataType.STRING(20), allowNull: true })
  telefono: string | null;

  @Column({ type: DataType.STRING(150), allowNull: true })
  email: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' })
  isActive: boolean;
}
