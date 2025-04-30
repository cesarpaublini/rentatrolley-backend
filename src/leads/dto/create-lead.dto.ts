/* eslint-disable @typescript-eslint/no-unsafe-call */

// eslint-disable-next-line prettier/prettier
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLeadDto {
  @ApiProperty({ description: 'The first name of the lead' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ description: 'The last name of the lead' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ description: 'The email of the lead' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The phone number of the lead' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @IsNotEmpty()
  @IsNumber()
  event_type_id: number;

  @ApiProperty({ description: 'The event date of the lead' })
  @IsNotEmpty()
  @IsDateString()
  event_date: Date;

  @IsNotEmpty()
  @IsNumber()
  pickup_city_id: number;

  @IsNotEmpty()
  @IsNumber()
  drop_city_id: number;

  @ApiProperty({ description: 'The pickup date and time of the lead' })
  @IsNotEmpty()
  @IsDateString()
  pickup_date_time: Date;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The duration of the trip in hours' })
  duration_hours: number;

  @IsNotEmpty()
  @IsString()
  trolley_type: string;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({ description: 'Whether the trip is a return trip' })
  return_trip: boolean;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'The number of passengers' })
  passenger_count: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Any special requirements for the trip' })
  special_requirements: string;
}
