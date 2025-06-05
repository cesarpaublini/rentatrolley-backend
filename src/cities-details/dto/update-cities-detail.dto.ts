import { PartialType } from '@nestjs/swagger';
import { CreateCitiesDetailDto } from './create-cities-detail.dto';

export class UpdateCitiesDetailDto extends PartialType(CreateCitiesDetailDto) {}
