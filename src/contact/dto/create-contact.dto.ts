import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({
    description: 'The name of the contact',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @ApiProperty({
    description: 'The email of the contact',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The subject of the contact',
    example: 'Hello',
  })
  @IsNotEmpty()
  @IsString()
  subject: string;

  @ApiProperty({
    description: 'The message of the contact',
    example: 'Hello, how are you?',
  })
  @IsNotEmpty()
  @IsString()
  message: string;
}
