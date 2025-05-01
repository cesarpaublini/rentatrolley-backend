import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    context: ISendMailOptions['context'],
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      template: 'welcome',
      context,
    });
  }
}
