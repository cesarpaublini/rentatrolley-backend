/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { CitiesModule } from './cities/cities.module';
import { EventTypesModule } from './event-types/event-types.module';
import { LeadsModule } from './leads/leads.module';
import { CityEventTypesModule } from './city-event-types/city-event-types.module';
import { MailModule } from './mail/mail.module';
import { StripeModule } from './stripe/stripe.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    CountriesModule,
    StatesModule,
    CitiesModule,
    EventTypesModule,
    LeadsModule,
    CityEventTypesModule,
    MailModule,
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
