import { Controller, Post, Body } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { MailService } from 'src/mail/mail.service';
import { MailTemplates, MailSubjects } from 'src/utils/mail-templates';
import * as path from 'path';
@Controller('contact')
export class ContactController {
  constructor(private readonly mailService: MailService) {}

  @Post()
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
      'Contact Form Submission',
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
}
