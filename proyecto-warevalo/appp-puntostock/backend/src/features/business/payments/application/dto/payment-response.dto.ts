import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';
import { PaymentStatus } from '../../domain/enums/payment-status.enum';

export class PaymentResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ enum: PaymentReferenceType })
  referenceType: PaymentReferenceType;

  @ApiProperty({ example: 1 })
  referenceId: number;

  @ApiProperty({ enum: PaymentMethod })
  method: PaymentMethod;

  @ApiProperty({ example: 50000 })
  amount: number;

  @ApiProperty()
  paymentDate: Date;

  @ApiProperty({ enum: PaymentStatus })
  status: PaymentStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
