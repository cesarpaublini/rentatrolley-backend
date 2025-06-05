import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { MailTemplates } from 'src/utils/mail-templates';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    template: MailTemplates,
    context: ISendMailOptions['context'],
    attachments?: ISendMailOptions['attachments'],
    bcc?: string[],
    replyTo?: string,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      template,
      context,
      attachments,
      bcc,
      replyTo,
    });
  }
}
