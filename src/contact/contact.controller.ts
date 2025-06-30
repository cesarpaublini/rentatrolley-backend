import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { SubscribeDto } from './dto/subscribe.dto';
import { MailService } from 'src/mail/mail.service';
import {
  MailTemplates,
  MailSubjects,
  MailTexts,
} from 'src/utils/mail-templates';
import * as path from 'path';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid contact data' })
  create(@Body() createContactDto: CreateContactDto) {
    const imagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentATrolley_Icon_White_Red.png',
    );
    return this.mailService.sendEmail(
      'hello@rentatrolley.com',
      MailSubjects.CONTACT_US,
      MailTexts.CONTACT_US,
      MailTemplates.CONTACT_US,
      {
        full_name: createContactDto.full_name,
        email: createContactDto.email,
        subject: createContactDto.subject,
        message: createContactDto.message,
      },
      [
        {
          filename: 'RentATrolley_Icon_White_Red.png',
          path: imagePath,
          cid: 'logo@cid',
        },
      ],
      undefined,
      createContactDto.email,
    );
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to the newsletter' })
  @ApiResponse({ status: 200, description: 'Email sent successfully' })
  @ApiResponse({ status: 400, description: 'Invalid email' })
  subscribe(@Body() subscribeDto: SubscribeDto) {
    const imagePath = path.resolve(
      process.cwd(),
      'src',
      'static',
      'images',
      'RentATrolley_Icon_White_Red.png',
    );
    return this.mailService.sendEmail(
      'hello@rentatrolley.com',
      MailSubjects.SUBSCRIBE,
      MailTexts.SUBSCRIBE,
      MailTemplates.SUBSCRIBE,
      {
        email: subscribeDto.email,
      },
      [
        {
          filename: 'RentATrolley_Icon_White_Red.png',
          path: imagePath,
          cid: 'logo@cid',
        },
      ],
      undefined,
      subscribeDto.email,
    );
  }
}
