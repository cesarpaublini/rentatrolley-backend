import { PartialType } from '@nestjs/mapped-types';
import { CreateCityEventTypeDto } from './create-city-event-type.dto';

export class UpdateCityEventTypeDto extends PartialType(CreateCityEventTypeDto) {}
