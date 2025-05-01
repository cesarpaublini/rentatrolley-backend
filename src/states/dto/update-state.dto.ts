import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateStateDto } from './create-state.dto';

export class UpdateStateDto extends PartialType(CreateStateDto) {
  @ApiProperty({
    description: 'The name of the state',
    example: 'California',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The ISO code of the state',
    example: 'CA',
    required: false,
  })
  iso_code?: string;

  @ApiProperty({
    description: 'The country ID to which the state belongs',
    example: 1,
    required: false,
  })
  country_id?: number;
}
