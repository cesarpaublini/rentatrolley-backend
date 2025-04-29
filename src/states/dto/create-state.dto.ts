import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/* eslint-disable @typescript-eslint/no-unsafe-call */
export class CreateStateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  abbreviation: string;

  @IsNotEmpty()
  @IsNumber()
  country_id: number;
}
