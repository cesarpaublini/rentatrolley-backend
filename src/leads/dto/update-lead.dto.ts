import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateLeadDto } from './create-lead.dto';

export class UpdateLeadDto extends PartialType(CreateLeadDto) {
  @ApiProperty({
    description: 'The first name of the lead',
    example: 'John',
    required: false,
  })
  first_name?: string;

  @ApiProperty({
    description: 'The last name of the lead',
    example: 'Doe',
    required: false,
  })
  last_name?: string;

  @ApiProperty({
    description: 'The email of the lead',
    example: 'john.doe@example.com',
    required: false,
  })
  email?: string;

  @ApiProperty({
    description: 'The phone number of the lead',
    example: '123-456-7890',
    required: false,
  })
  phone_number?: string;

  @ApiProperty({
    description: 'The city ID of the lead',
    example: 1,
    required: false,
  })
  city_id?: number;

  @ApiProperty({
    description: 'The event type ID of the lead',
    example: 2,
    required: false,
  })
  event_type_id?: number;

  @ApiProperty({
    description: 'The event date of the lead',
    example: '2023-12-25T00:00:00.000Z',
    required: false,
  })
  event_date?: Date;

  @ApiProperty({
    description: 'The pickup city ID of the lead',
    example: 3,
    required: false,
  })
  pickup_city_id?: number;

  @ApiProperty({
    description: 'The drop city ID of the lead',
    example: 4,
    required: false,
  })
  drop_city_id?: number;

  @ApiProperty({
    description: 'The pickup date and time of the lead',
    example: '2023-12-25T10:00:00.000Z',
    required: false,
  })
  pickup_date_time?: Date;

  @ApiProperty({
    description: 'The duration of the trip in hours',
    example: 5,
    required: false,
  })
  duration_hours?: number;

  @ApiProperty({
    description: 'The type of trolley',
    example: 'Standard',
    required: false,
  })
  trolley_type?: string;

  @ApiProperty({
    description: 'Whether the trip is a return trip',
    example: true,
    required: false,
  })
  return_trip?: boolean;

  @ApiProperty({
    description: 'The number of passengers',
    example: 4,
    required: false,
  })
  passenger_count?: number;

  @ApiProperty({
    description: 'Any special requirements for the trip',
    example: 'None',
    required: false,
  })
  special_requirements?: string;
}
