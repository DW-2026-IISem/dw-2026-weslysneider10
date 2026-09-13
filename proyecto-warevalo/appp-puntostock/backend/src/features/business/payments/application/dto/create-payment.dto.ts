import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';
import { PaymentReferenceType } from '../../domain/enums/payment-reference-type.enum';

export class CreatePaymentDto {
  @ApiProperty({ enum: PaymentReferenceType, example: PaymentReferenceType.SALE })
  @IsEnum(PaymentReferenceType)
  referenceType: PaymentReferenceType;

  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  referenceId: number;

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.CASH })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ example: 50000 })
  @IsPositive()
  amount: number;

  @ApiPropertyOptional({ example: '2026-09-13T10:00:00.000Z' })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  paymentDate?: Date;
}
