import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadsService } from './leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lead' })
  @ApiTags('Leads')
  create(@Body() createLeadDto: CreateLeadDto) {
    const [firstName, lastName] = createLeadDto.full_name.split(' ');
    const lead = {
      ...createLeadDto,
      first_name: firstName,
      last_name: lastName,
    };
    return this.leadsService.create(lead);
  }

  @Get()
  @ApiOperation({ summary: 'Get all leads' })
  @ApiTags('Leads')
  findAll() {
    return this.leadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lead by ID' })
  @ApiTags('Leads')
  findOne(@Param('id') id: string) {
    return this.leadsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lead by ID' })
  @ApiTags('Leads')
  update(@Param('id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(+id, updateLeadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lead by ID' })
  @ApiTags('Leads')
  remove(@Param('id') id: string) {
    return this.leadsService.remove(+id);
  }
}
