import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { MailModule } from 'src/mail/mail.module';
import { ContactService } from './contact.service';
@Module({
  imports: [MailModule],
  exports: [ContactService],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
