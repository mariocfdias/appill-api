import { IsNotEmpty, IsNumber } from 'class-validator';

export class DoseDTO {
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  time: Date;
}
