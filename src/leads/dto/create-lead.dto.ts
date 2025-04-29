/* eslint-disable @typescript-eslint/no-unsafe-call */

// eslint-disable-next-line prettier/prettier
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLeadDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsNotEmpty()
  @IsNumber()
  event_type_id: number;

  @IsNotEmpty()
  @IsDate()
  event_date: Date;

  @IsNotEmpty()
  @IsNumber()
  pickup_city_id: number;

  @IsNotEmpty()
  @IsNumber()
  drop_city_id: number;

  @IsNotEmpty()
  @IsDate()
  pickup_date_time: Date;

  @IsNotEmpty()
  @IsNumber()
  duration_hours: number;

  @IsNotEmpty()
  @IsString()
  trolley_type: string;

  @IsNotEmpty()
  @IsBoolean()
  return_trip: boolean;

  @IsNotEmpty()
  @IsNumber()
  passenger_count: number;

  @IsNotEmpty()
  @IsString()
  special_requirements: string;
}
